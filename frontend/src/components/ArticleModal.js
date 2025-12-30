// src/components/ArticleModal.js
import React from 'react';
import ReactMarkdown from 'react-markdown';

const ArticleModal = ({ isOpen, onClose, content, title, view }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">{title} ({view === 'updated' ? 'AI-Enhanced' : 'Original'})</h2>
        <div className="prose prose-lg max-w-none dark:prose-invert">
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
        <button onClick={onClose} className="mt-6 bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors">
          Close
        </button>
      </div>
    </div>
  );
};

export default ArticleModal;