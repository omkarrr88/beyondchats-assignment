// src/components/Footer.js
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 dark:bg-gray-900 text-white py-8">
      <div className="container mx-auto px-6 text-center">
        <p className="mb-4">This is a BeyondChats internship assignment showcasing AI-powered content enhancement</p>
        <div className="flex justify-center space-x-4 mb-4 flex-wrap">
          <a href="https://beyondchats.com" target="_blank" rel="noopener noreferrer" className="hover:underline">BeyondChats Website</a>
          <a href="https://beyondchats.com/blogs/" target="_blank" rel="noopener noreferrer" className="hover:underline">Original Blog</a>
          <a href="https://github.com/omkarrr88/beyondchats-assignment.git" target="_blank" rel="noopener noreferrer" className="hover:underline">GitHub Repo</a>
          <a href="https://www.linkedin.com/in/omkarrrr/" target="_blank" rel="noopener noreferrer" className="hover:underline">LinkedIn</a>
        </div>
        <p className="mb-4">Built with: React, Node.js, Gemini API, MongoDB</p>
        <p className="mb-4">Last updated: Dec 29, 2025</p>
        <p>Contact: omkarkadam181188@gmail.com or GitHub</p>
      </div>
    </footer>
  );
};

export default Footer;