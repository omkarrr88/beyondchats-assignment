// src/components/ArticleCard.js
import React, { useState } from 'react';
import ArticleModal from './ArticleModal';

const ArticleCard = ({ article, view }) => {
  const [isOpen, setIsOpen] = useState(false);

  const readTime = (text) => {
    const words = text.split(' ').length;
    return Math.ceil(words / 200) + ' min read';
  };

  const getCategory = (title) => {
    if (title.includes('Chatbots')) return 'Chatbots';
    if (title.includes('Sales')) return 'Sales';
    if (title.includes('E-commerce')) return 'E-commerce';
    if (title.includes('Customer Service')) return 'Customer Service';
    return 'Other';
  };

  const getContent = (article, view) => {
    return view === 'updated' && article.updated_content ? article.updated_content : article.content;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow overflow-hidden">
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2"></div>
      <div className="p-8">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-3 line-clamp-2">
          {article.title}
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          {new Date(article.published_at).toLocaleDateString('en-US', {
            year: 'numeric', month: 'long', day: 'numeric'
          })}
          | {readTime(getContent(article, view))} | {getCategory(article.title)}
        </p>
        <span className="text-sm font-semibold px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 mb-4 inline-block">
          {view === 'updated' ? 'AI-Enhanced' : 'Original'}
        </span>
        <div 
          className="text-gray-700 dark:text-gray-300 prose prose-sm dark:prose-invert max-w-none mb-6"
          dangerouslySetInnerHTML={{ __html: getContent(article, view).substring(0, 150) + '...' }}
        />
        <button onClick={() => setIsOpen(true)} className="text-indigo-600 dark:text-indigo-400 font-medium hover:text-indigo-800 dark:hover:text-indigo-300">
          View Full {view === 'updated' ? 'AI-Enhanced' : 'Original'} →
        </button>
        {view === 'updated' && article.references && (
          <div className="mt-6 pt-4 border-t dark:border-gray-600">
            <h4 className="font-semibold text-sm text-gray-800 dark:text-white mb-2">References:</h4>
            <ul className="text-sm space-y-1">
              {article.references.map((ref, i) => (
                <li key={i}>
                  <a href={ref} target="_blank" rel="noopener noreferrer" className="text-blue-500 dark:text-blue-400 hover:underline">
                    [{i+1}] {ref}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <ArticleModal isOpen={isOpen} onClose={() => setIsOpen(false)} content={getContent(article, view)} title={article.title} view={view} />
    </div>
  );
};

export default ArticleCard;