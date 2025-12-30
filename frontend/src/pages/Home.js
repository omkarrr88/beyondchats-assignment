// src/pages/Home.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import Hero from '../components/Hero';
import Filters from '../components/Filters';
import ArticleCard from '../components/ArticleCard';

const Home = () => {
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sort, setSort] = useState('date-desc');
  const [view, setView] = useState('original'); // Changed to direct view state
  const [perPage, setPerPage] = useState('5');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/articles`)
      .then(res => {
        setArticles(res.data.sort((a, b) => new Date(b.published_at) - new Date(a.published_at)));
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError('Failed to load articles. Please try again.');
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    let temp = [...articles];

    if (searchTerm) {
      temp = temp.filter(art => art.title.toLowerCase().includes(searchTerm.toLowerCase()));
    }

    if (sort === 'date-desc') {
      temp = temp.sort((a, b) => new Date(b.published_at) - new Date(a.published_at));
    } else if (sort === 'date-asc') {
      temp = temp.sort((a, b) => new Date(a.published_at) - new Date(b.published_at));
    }

    if (perPage !== 'all') {
      temp = temp.slice(0, parseInt(perPage));
    }

    setFilteredArticles(temp);
  }, [articles, sort, perPage, searchTerm]);

  if (error) return <p className="text-center py-20 text-red-500 dark:text-red-400">{error}</p>;

  if (loading) return (
    <div className="container mx-auto px-6 py-12">
      <Hero />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} height={400} />
        ))}
      </div>
    </div>
  );

  if (filteredArticles.length === 0) return <p className="text-center py-20 text-gray-600 dark:text-gray-400">No articles found. Try adjusting filters.</p>;

  return (
    <div>
      <Hero />
      <div className="container mx-auto px-6 py-12">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by title..."
          className="w-full md:w-1/3 px-4 py-2 rounded-lg border mb-8 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white dark:border-gray-600"
        />
        <Filters setSort={setSort} view={view} setView={setView} setPerPage={setPerPage} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredArticles.map(article => (
            <ArticleCard key={article._id} article={article} view={view} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;