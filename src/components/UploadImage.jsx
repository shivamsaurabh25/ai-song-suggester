import React, { useState } from 'react';
import axios from 'axios';
import AnimatedAvatar from './AnimatedAvatar';
import base64 from 'base-64';

const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const clientSecret = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;

export default function UploadImage() {
  const [image, setImage] = useState(null);
  const [imageBlob, setImageBlob] = useState(null);
  const [language, setLanguage] = useState('');
  const [loading, setLoading] = useState(false);
  const [songs, setSongs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [token, setToken] = useState('');

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
    return `You are a vibe-based song recommender. Given a user's photo, describe the mood or vibe of the photo in a short phrase that could be used as a Spotify search query for a matching song. Include the language preference "${language}". Respond with just the search query.`;
  };

  const fetchSpotifyToken = async () => {
    const creds = base64.encode(`${clientId}:${clientSecret}`);
    const res = await axios.post('https://accounts.spotify.com/api/token', 
      'grant_type=client_credentials', 
      {
        headers: {
          'Authorization': `Basic ${creds}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );
    return res.data.access_token;
  };

  const handleGenerateSongs = async () => {
    if (!imageBlob) {
      alert('Please upload an image');
      return;
    }

    setLoading(true);
    try {
      const base64Img = await fileToBase64(imageBlob);
      const prompt = generateSongQueryPrompt();

      const geminiRes = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${import.meta.env.VITE_GEMINI_API_KEY}`,
        {
          contents: [
            {
              parts: [
                { text: prompt },
                {
                  inline_data: {
                    mime_type: imageBlob.type,
                    data: base64Img.split(',')[1],
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

      const accessToken = await fetchSpotifyToken();
      setToken(accessToken);

      await fetchSpotifySongs(query, accessToken);
    } catch (err) {
      console.error(err);
      alert('Something went wrong while generating songs.');
    } finally {
      setLoading(false);
    }
  };

  const fetchSpotifySongs = async (query, accessToken) => {
    try {
      const res = await axios.get('https://api.spotify.com/v1/search', {
        headers: { Authorization: `Bearer ${accessToken}` },
        params: {
          q: query,
          type: 'track',
          limit: 5,
        },
      });

      setSongs(res.data.tracks.items);
    } catch (err) {
      console.error(err);
      alert('Failed to fetch songs from Spotify.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 rounded-2xl backdrop-blur-md bg-white/30 dark:bg-white/10 border border-white/20 shadow-md text-black dark:text-white">
      <div className="flex flex-col items-center">
        <AnimatedAvatar />
        <p className="font-body text-base text-muted">I'm your vibe-detecting AI DJ 🎧</p>
      </div>

      <div className="space-y-4">
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
            🔍 Spotify search: <strong>{searchQuery}</strong>
          </p>
        </div>
      )}

      <div className="mt-6 grid gap-4">
        {songs.map((song) => (
          <div
            key={song.id}
            className="p-3 rounded-lg flex gap-4 items-start border border-white/30 bg-white/20 dark:bg-white/10 backdrop-blur-md"
          >
            <img
              src={song.album.images[1]?.url}
              alt={song.name}
              className="w-32 h-20 object-cover rounded"
            />
            <div>
              <p className="font-semibold">{song.name}</p>
              <p className="text-sm text-muted">{song.artists.map((a) => a.name).join(', ')}</p>
              <a
                href={song.external_urls.spotify}
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-600 dark:text-green-400 underline text-sm"
              >
                ▶️ Listen on Spotify
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}