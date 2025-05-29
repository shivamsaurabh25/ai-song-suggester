import React, { useState } from 'react';
import axios from 'axios';

const moods = [
  'Happy',
  'Sad',
  'Romantic',
  'Chill',
  'Energetic',
  'Melancholy',
  'Motivational',
];

export default function UploadImage() {
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState('');
  const [mood, setMood] = useState('');
  const [language, setLanguage] = useState('');
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [apiKey, setApiKey] = useState('');

  const handleSearch = async () => {
    if (!apiKey || !mood || !language) return;
    setLoading(true);

    try {
      const query = `${description || mood} ${language} song`;
      const response = await axios.get(
        `https://www.googleapis.com/youtube/v3/search`,
        {
          params: {
            key: apiKey,
            q: query,
            part: 'snippet',
            maxResults: 10,
            type: 'video',
          },
        }
      );
      setSongs(response.data.items);
    } catch (err) {
      alert('Failed to fetch songs. Please check your API key.');
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    setImage(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <div className="glassmorphism p-6 rounded-xl max-w-3xl mx-auto bg-white/10 backdrop-blur-md shadow-xl">
      <h2 className="text-xl font-semibold mb-4 text-center">Upload Photo & Get Song Suggestions</h2>

      <div className="flex flex-col items-center gap-4">

        <input
          type="text"
          placeholder="Enter your YouTube API Key"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          className="w-full mt-2 p-2 bg-white/10 border border-white/20 rounded text-white placeholder:text-gray-300"
        />

        <a
          href="https://console.cloud.google.com/apis/credentials"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-blue-400 underline"
        >
          Get your API key from Google Cloud Console
        </a>

        <input type="file" accept="image/*" onChange={handleFileChange} />
        {image && <img src={image} alt="preview" className="h-48 rounded-lg object-cover" />}

        <input
          type="text"
          placeholder="Describe the image/vibe (e.g., calm ocean sunset)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full mt-4 p-2 bg-white/10 border border-white/20 rounded text-white placeholder:text-gray-300"
        />

        {!description && (
          <div className="mt-4 w-full">
            <label className="block mb-2">Choose Mood:</label>
            <div className="flex flex-wrap gap-2">
              {moods.map((m) => (
                <button
                  key={m}
                  onClick={() => setMood(m)}
                  className={`px-4 py-2 rounded-full text-sm ${mood === m ? 'bg-blue-500 text-white' : 'bg-white/20 text-white'
                    }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>
        )}

        <input
          type="text"
          placeholder="Preferred Language (e.g., Hindi, English)"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="w-full mt-4 p-2 bg-white/10 border border-white/20 rounded text-white placeholder:text-gray-300"
        />

        <button
          onClick={handleSearch}
          className="mt-4 px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded shadow"
        >
          Suggest Songs
        </button>
      </div>

      {loading && <p className="mt-4 text-center">Fetching songs...</p>}

      <div className="mt-6">
        {songs.map((song) => (
          <div key={song.id.videoId} className="my-2 p-2 bg-white/10 rounded">
            <a
              href={`https://www.youtube.com/watch?v=${song.id.videoId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-300 hover:underline"
            >
              {song.snippet.title}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}