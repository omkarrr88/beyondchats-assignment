import React from 'react';

const About = () => {
  return (
    <div className="container mx-auto px-6 py-12 min-h-screen">
      <h1 className="text-4xl font-bold mb-6 text-gray-800 dark:text-white">About This Project</h1>
      <p className="mb-4 text-gray-700 dark:text-gray-300">This is an internship assignment for BeyondChats Full Stack Developer role.</p>
      <p className="mb-4 text-gray-700 dark:text-gray-300">How it works:</p>
      <div className="mb-8 flex justify-center">
        <div className="relative">
          <img 
            src="architecture.png" 
            alt="Project Architecture: Scraper → MongoDB → API → React UI (with Gemini AI enhancement and SerpAPI)"
            width="521"
            height="211"
            className="rounded-lg shadow-lg dark:shadow-gray-600 border border-gray-300 dark:border-gray-600"
            
          />
          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4 hidden" id="fallback-text">
            (Diagram not available — showing standard MERN stack architecture)
          </p>
        </div>
      </div>
      {/* Rest of your content */}
      <ol className="list-decimal pl-6 mb-4 space-y-2 text-gray-700 dark:text-gray-300">
        <li>Scrape 5 oldest articles from BeyondChats blog last page.</li>
        <li>For each, search Google for similar blogs.</li>
        <li>Scrape 2 top refs.</li>
        <li>Gemini AI rewrites to match style.</li>
        <li>Save enhanced version with citations.</li>
      </ol>
      <p className="mb-4 text-gray-700 dark:text-gray-300">Tech Stack: React, Node.js, Express, MongoDB, Gemini AI, SerpAPI</p>
      <p className="mb-4 text-gray-700 dark:text-gray-300">Source Code: <a href="https://github.com/omkarrr88/beyondchats-assignment.git" className="text-blue-600 hover:underline dark:text-blue-400">GitHub</a></p>
      <p className="mb-4 text-gray-700 dark:text-gray-300">Developer:  <a href="https://omkar-kadam.vercel.app/" className="text-blue-600 hover:underline dark:text-blue-400">Omkar Kadam</a> , GitHub: <a href="https://github.com/omkarrr88" className="text-blue-600 hover:underline dark:text-blue-400">omkarrr88</a> , LinkedIn: <a href="https://www.linkedin.com/in/omkarrrr/" className="text-blue-600 hover:underline dark:text-blue-400">Omkar Kadam</a></p>
    </div>
  );
};

export default About;