// src/components/Navbar.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('darkMode') === 'true');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', darkMode.toString());
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(prev => !prev);

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <img src="/logo.png" alt="Logo" className="h-8 mr-2" />
          <span className="text-xl font-bold text-gray-800 dark:text-white">BeyondChats Blogs</span>
        </Link>
        <div className="flex items-center space-x-4 md:space-x-6">
          <Link to="/" className="text-gray-600 dark:text-gray-300 hover:text-blue-600">Home</Link>
          <Link to="/about" className="text-gray-600 dark:text-gray-300 hover:text-blue-600">About</Link>
          <a href="https://beyondchats.com/blogs/" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-300 hover:text-blue-600">Original Blog</a>
          <a href="https://github.com/omkarrr88/beyondchats-assignment.git" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-300 hover:text-blue-600">Documentation</a>
          <button onClick={toggleDarkMode} className="text-gray-600 dark:text-gray-300 hover:text-blue-600">
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;