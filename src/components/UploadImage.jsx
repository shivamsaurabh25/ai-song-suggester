import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AnimatedAvatar from './AnimatedAvatar';

export default function UploadImage() {
  const [image, setImage] = useState(null);
  const [imageBlob, setImageBlob] = useState(null);
  const [geminiKey, setGeminiKey] = useState('');
  const [youtubeKey, setYoutubeKey] = useState('');
  const [language, setLanguage] = useState('');
  const [loading, setLoading] = useState(false);
  const [songs, setSongs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

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
    return `You are a vibe-based song recommender. Given a user's photo, describe the mood or vibe of the photo in a short phrase that could be used as a YouTube search query for a matching song. Include the language preference "${language}". Respond with just the search query.`;
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

      const query = geminiRes.data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || '';

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
    <div className="max-w-2xl mx-auto mt-10 p-6 rounded-2xl backdrop-blur-md bg-white/30 dark:bg-white/10 border border-white/20 shadow-md text-black dark:text-white">
      <div className="flex flex-col items-center">
        <AnimatedAvatar />
        <p className="text-lg font-semibold">I'm your vibe-detecting AI DJ 🎧</p>
      </div>

      {/* Inputs */}
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Enter Gemini API Key"
          value={geminiKey}
          onChange={(e) => setGeminiKey(e.target.value)}
          className="w-full p-2 rounded-md bg-white/40 dark:bg-white/10 text-black dark:text-white placeholder-gray-700 dark:placeholder-white/70 border border-white/30"
        />
        <a
          href="https://aistudio.google.com/app/apikey"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-blue-600 dark:text-blue-400 underline"
        >
          Get Gemini API Key
        </a>

        <input
          type="text"
          placeholder="Enter YouTube API Key"
          value={youtubeKey}
          onChange={(e) => setYoutubeKey(e.target.value)}
          className="w-full p-2 rounded-md bg-white/40 dark:bg-white/10 text-black dark:text-white placeholder-gray-700 dark:placeholder-white/70 border border-white/30"
        />
        <a
          href="https://console.cloud.google.com/apis/credentials"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-blue-600 dark:text-blue-400 underline"
        >
          Get YouTube API Key
        </a>

        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full p-2 rounded-md bg-white/40 dark:bg-white/10 text-black dark:text-white border border-white/30"
        />

        <input
          type="text"
          placeholder="Preferred language (e.g. English, Hindi)"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="w-full p-2 rounded-md bg-white/40 dark:bg-white/10 text-black dark:text-white placeholder-gray-700 dark:placeholder-white/70 border border-white/30"
        />

        {image && (
          <img
            src={image}
            alt="Preview"
            className="mt-4 rounded-xl max-h-64 object-cover mx-auto shadow-lg"
          />
        )}

        <button
          onClick={handleGenerateSongs}
          className="w-full p-3 mt-2 rounded-md bg-white/50 dark:bg-white/20 text-black dark:text-white hover:bg-white/70 dark:hover:bg-white/30 transition font-semibold"
        >
          🎧 Suggest Songs
        </button>
      </div>

      {loading && <p className="mt-4 text-center text-lg font-medium">Analyzing photo and fetching songs...</p>}

      {searchQuery && (
        <div className="mt-6 text-center">
          <p className="text-sm">
            🔍 YouTube search: <strong>{searchQuery}</strong>
          </p>
          <button
            onClick={() => fetchSongs(searchQuery)}
            className="mt-2 w-full p-2 rounded-md bg-white/30 dark:bg-white/20 text-black dark:text-white hover:bg-white/50 dark:hover:bg-white/30 transition"
          >
            🔃 More Suggestions
          </button>
        </div>
      )}

      <div className="mt-6 grid gap-4">
        {songs.map((song) => (
          <div
            key={song.id.videoId}
            className="p-3 rounded-lg flex gap-4 items-start border border-white/30 bg-white/20 dark:bg-white/10 backdrop-blur-md"
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
                className="text-blue-600 dark:text-blue-400 underline text-sm"
              >
                ▶️ Play on YouTube
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}