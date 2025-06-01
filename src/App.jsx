import React, { useState } from 'react';
import UploadImage from './components/UploadImage';
import FloatingIcons from './components/FloatingIcons';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';

export default function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={`${darkMode ? 'dark' : ''}`}>
      <div className={`relative min-h-screen transition-all duration-500 
        ${darkMode
          ? 'bg-gradient-to-br from-gray-900 to-black text-white'
          : 'bg-gradient-to-tr from-pink-100 via-yellow-100 to-blue-100 text-black'
        }`}>

        {/* Floating Icons */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <FloatingIcons />
        </div>

        {/* Header */}
        <header className="relative z-10 p-4 sm:p-6 flex justify-between items-center">
          <h1 className="text-3xl sm:text-2xl font-heading font-bold">AI Song Vibe Suggester For IG 🎵</h1>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full bg-white text-black hover:bg-gray-200 transition dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
            title="Toggle Theme"
          >
            {darkMode ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
          </button>
        </header>

        {/* Main Content */}
        <main className="relative z-10 px-4 sm:px-6">
          <UploadImage />
        </main>

        {/* Footer */}
        <footer className="relative z-10 text-center mt-12 p-6 text-sm text-gray-500 dark:text-gray-400">
          Created with ❤️ by{' '}
          <a
            href="https://instagram.com/shivamsaurabh25"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-transparent bg-gradient-to-r from-pink-500 to-yellow-500 bg-clip-text hover:from-yellow-500 hover:to-purple-500 transition duration-300"
          >
            Shivam Saurabh
          </a>
        </footer>
      </div>
    </div>
  );
}