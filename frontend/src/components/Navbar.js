"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("darkMode") === "true")

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
    localStorage.setItem("darkMode", darkMode.toString())
  }, [darkMode])

  const toggleDarkMode = () => setDarkMode((prev) => !prev)

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-lg transition-colors duration-300 sticky top-0 z-50 border-b border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4 md:px-6 py-3 md:py-4 flex items-center justify-between">
        {/* Logo Section */}
        <Link to="/" className="flex items-center gap-2 md:gap-3 group flex-shrink-0">
          <img
            src={darkMode ? "/logo.png" : "/logo 2.jpg"}
            alt="BeyondChats Logo"
            className="h-8 md:h-10 w-8 md:w-10 transition-transform duration-300 group-hover:scale-110"
          />
          <span className="text-lg md:text-xl font-bold text-gray-800 dark:text-white transition-colors duration-300">
            BeyondChats
          </span>
        </Link>

        {/* Navigation Links & Toggle */}
        <div className="flex items-center space-x-3 md:space-x-6">
          <Link
            to="/"
            className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 text-sm md:text-base font-medium"
          >
            Home
          </Link>
          <Link
            to="/about"
            className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 text-sm md:text-base font-medium"
          >
            About
          </Link>
          <a
            href="https://beyondchats.com/blogs/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 text-sm md:text-base font-medium hidden sm:inline"
          >
            Blog
          </a>

          <button
            onClick={toggleDarkMode}
            className="relative inline-flex h-9 w-16 items-center rounded-full bg-gray-300 dark:bg-gray-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 flex-shrink-0 hover:bg-gray-400 dark:hover:bg-gray-500"
            aria-label={`Switch to ${darkMode ? "light" : "dark"} mode`}
            title={`Switch to ${darkMode ? "light" : "dark"} mode`}
          >
            <span
              className={`inline-block h-7 w-7 transform rounded-full bg-white shadow-md transition-transform duration-300 flex items-center justify-center text-lg ${
                darkMode ? "translate-x-8" : "translate-x-1"
              }`}
            >
              {darkMode ? "🌙" : "☀️"}
            </span>
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
