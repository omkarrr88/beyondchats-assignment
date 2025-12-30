// src/components/Filters.js
import React from 'react';

const Filters = ({ setSort, view, setView, setPerPage }) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between mb-8 gap-4">
      <select onChange={(e) => setSort(e.target.value)} className="px-4 py-2 rounded-lg border dark:bg-gray-800 dark:text-white dark:border-gray-600">
        <option value="date-desc">Newest First</option>
        <option value="date-asc">Oldest First</option>
      </select>
      <select onChange={(e) => setView(e.target.value)} className="px-4 py-2 rounded-lg border dark:bg-gray-800 dark:text-white dark:border-gray-600">
        <option value="original">Original</option>
        <option value="updated">AI-Enhanced</option>
      </select>
      <select onChange={(e) => setPerPage(e.target.value)} className="px-4 py-2 rounded-lg border dark:bg-gray-800 dark:text-white dark:border-gray-600">
        <option value="3">3 per page</option>
        <option value="5">5 per page</option>
        <option value="all">All</option>
      </select>
    </div>
  );
};

export default Filters;