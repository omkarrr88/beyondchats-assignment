// src/components/Hero.js
import React from 'react';

const Hero = () => {
  return (
    <section className="bg-blue-600 dark:bg-blue-800 text-white py-16 text-center">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl font-bold mb-4">BeyondChats Blog: Original vs AI-Enhanced</h1>
        <p className="text-xl mb-6">Explore how AI improves article quality while maintaining original meaning</p>
        <div className="flex justify-center space-x-6 mb-8 flex-wrap">
          <span className="bg-white text-blue-600 dark:bg-gray-700 dark:text-blue-400 px-4 py-2 rounded-full">5 Articles Compared</span>
          <span className="bg-white text-blue-600 dark:bg-gray-700 dark:text-blue-400 px-4 py-2 rounded-full">AI Model: Gemini</span>
          <span className="bg-white text-blue-600 dark:bg-gray-700 dark:text-blue-400 px-4 py-2 rounded-full">Updated: Dec 29, 2025</span>
        </div>
        <a href="/about" className="bg-white text-blue-600 dark:bg-gray-700 dark:text-blue-400 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">How This Works?</a>
      </div>
    </section>
  );
};

export default Hero;