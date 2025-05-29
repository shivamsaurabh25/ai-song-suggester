import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MoonIcon, SunIcon } from '@heroicons/react/24/outline';

export default function SongSuggester() {
  const [image, setImage] = useState(null);
  const [imageBlob, setImageBlob] = useState(null);
  const [geminiKey, setGeminiKey] = useState('');
  const [youtubeKey, setYoutubeKey] = useState('');
  const [language, setLanguage] = useState('');
  const [loading, setLoading] = useState(false);
  const [songs, setSongs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    const gemini = localStorage.getItem('gemini_api_key');
    const youtube = localStorage.getItem('youtube_api_key');
    if (gemini) setGeminiKey(gemini);
    if (youtube) setYoutubeKey(youtube);
  }, []);

  useEffect(() => {
    if (geminiKey) localStorage.setItem('gemini_api_key', geminiKey);
    if (youtubeKey) localStorage.setItem('youtube_api_key', youtubeKey);
  }, [geminiKey, youtubeKey]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setImage(url);
    setImageBlob(file);
  };

  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });
  };

  const generateSongQueryPrompt = () => {
    return `You are a vibe-based song recommender. Given a user's photo, describe the mood or vibe of the photo in a short phrase that could be used as a YouTube search query for a matching song. Include the language preference "${language}". 
Respond with just the search query.`;
  };

  const handleGenerateSongs = async () => {
    if (!imageBlob || !geminiKey || !youtubeKey) {
      alert('Please upload an image and enter both API keys');
      return;
    }

    setLoading(true);
    try {
      const base64 = await fileToBase64(imageBlob);
      const prompt = generateSongQueryPrompt();

      const geminiRes = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiKey}`,
        {
          contents: [
            {
              parts: [
                { text: prompt },
                {
                  inline_data: {
                    mime_type: imageBlob.type,
                    data: base64.split(',')[1],
                  },
                },
              ],
            },
          ],
        }
      );

      const query =
        geminiRes.data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || '';

      if (!query) {
        alert('Gemini did not return a valid query.');
        setLoading(false);
        return;
      }

      setSearchQuery(query);
      await fetchSongs(query);
    } catch (err) {
      console.error(err);
      alert('Something went wrong while generating song query.');
    } finally {
      setLoading(false);
    }
  };

  const fetchSongs = async (query) => {
    try {
      const res = await axios.get(`https://www.googleapis.com/youtube/v3/search`, {
        params: {
          part: 'snippet',
          maxResults: 5,
          q: query,
          key: youtubeKey,
          type: 'video',
          videoCategoryId: 10,
        },
      });
      setSongs(res.data.items);
    } catch (err) {
      console.error(err);
      alert('Failed to fetch songs from YouTube');
    }
  };

  return (
    <div
      className={`max-w-3xl mx-auto p-6 rounded-xl shadow-lg min-h-screen transition-colors ${
        darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'
      }`}
    >
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold text-center w-full">
          AI-Powered Instagram Song Suggester 🎶
        </h1>
        <button onClick={() => setDarkMode(!darkMode)} className="ml-4 text-xl">
          {darkMode ? <SunIcon /> : <MoonIcon />}
        </button>
      </div>

      <input
        type="text"
        placeholder="Enter Gemini API Key"
        value={geminiKey}
        onChange={(e) => setGeminiKey(e.target.value)}
        className="w-full p-2 mb-2 rounded border bg-transparent"
      />
      <a
        href="https://aistudio.google.com/app/apikey"
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm text-blue-400 underline"
      >
        Get your API key from Google AI Studio
      </a>

      <input
        type="text"
        placeholder="Enter YouTube API Key"
        value={youtubeKey}
        onChange={(e) => setYoutubeKey(e.target.value)}
        className="w-full p-2 mb-2 rounded border bg-transparent"
      />
      <a
        href="https://console.cloud.google.com/apis/credentials"
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm text-blue-400 underline block mb-2"
      >
        Get your API key from Google Cloud Console
      </a>

      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="w-full mb-4"
      />

      <input
        type="text"
        placeholder="Preferred language (e.g. English, Hindi)"
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        className="w-full p-2 mb-4 rounded border bg-transparent"
      />

      {image && (
        <img
          src={image}
          alt="preview"
          className="mt-2 mb-4 rounded-lg max-h-60 object-cover mx-auto"
        />
      )}

      <button
        onClick={handleGenerateSongs}
        className="w-full px-6 py-2 bg-blue-500 hover:bg-blue-600 rounded text-white font-medium"
      >
        Suggest Songs
      </button>

      {loading && <p className="mt-4 text-center">Analyzing your photo and finding songs...</p>}

      {searchQuery && (
        <div className="mt-4">
          <p className="text-sm text-gray-300">
            🔍 YouTube search: <strong>{searchQuery}</strong>
          </p>
          <button
            onClick={() => fetchSongs(searchQuery)}
            className="mt-2 text-sm text-blue-400 underline"
          >
            More suggestions
          </button>
        </div>
      )}

      <div className="mt-4 grid gap-4">
        {songs.map((song) => (
          <div
            key={song.id.videoId}
            className={`p-3 rounded-lg flex gap-4 items-start border ${
              darkMode ? 'border-white/20 bg-white/10' : 'border-black/10 bg-black/5'
            }`}
          >
            <img
              src={song.snippet.thumbnails.medium.url}
              alt={song.snippet.title}
              className="w-32 h-20 object-cover rounded"
            />
            <div>
              <p className="font-semibold">{song.snippet.title}</p>
              <a
                href={`https://www.youtube.com/watch?v=${song.id.videoId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 underline text-sm"
              >
                Play on YouTube
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}