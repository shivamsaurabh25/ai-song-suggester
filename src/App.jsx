import React, { useState } from 'react';
import { MoonIcon, SunIcon } from '@heroicons/react/24/outline';
import UploadImage from './components/UploadImage';

export default function App() {
  const [darkMode, setDarkMode] = useState(true);

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="dark:bg-gradient-to-br dark:from-gray-900 dark:to-black text-white min-h-screen transition-colors duration-500">
        <header className="p-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold">AI Song Vibe Suggester For IG 🎵</h1>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full bg-white text-black hover:bg-gray-200 transition dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
            title="Toggle Theme"
          >
            {darkMode ? (
              <SunIcon className="h-5 w-5" />
            ) : (
              <MoonIcon className="h-5 w-5" />
            )}
          </button>
        </header>
        <main className="px-6">
          <UploadImage />
        </main>
        <footer className="text-center mt-12 p-6 text-sm text-gray-400">
          Created with ❤️ by{' '}
          <a
            href="https://instagram.com/shivamsaurabh25"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-white bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-yellow-500 hover:from-yellow-500 hover:to-purple-500 transition duration-300"
          >
            Shivam Saurabh
          </a>
        </footer>
      </div>
    </div>
  );
}