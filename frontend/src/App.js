import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';  // Optional custom styles

function App() {
  const [articles, setArticles] = useState([]);
  const [view, setView] = useState('original');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/articles`)
      .then(res => {
        setArticles(res.data.sort((a, b) => new Date(a.published_at) - new Date(b.published_at)));
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const getContent = (article) => {
    return view === 'updated' && article.updated_content 
      ? article.updated_content 
      : article.content;
  };

  if (loading) return <p className="text-center py-20 text-xl">Loading articles...</p>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <header className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-12 shadow-lg">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-bold mb-4">BeyondChats Blog Articles</h1>
          <p className="text-xl opacity-90">Original vs Gemini AI-Enhanced Versions</p>
        </div>
      </header>

      <div className="container mx-auto px-6 py-12">
        <div className="flex justify-center gap-6 mb-12">
          <button
            onClick={() => setView('original')}
            className={`px-8 py-4 rounded-full text-lg font-semibold transition-all ${
              view === 'original' 
                ? 'bg-blue-600 text-white shadow-lg' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Original Articles
          </button>
          <button
            onClick={() => setView('updated')}
            className={`px-8 py-4 rounded-full text-lg font-semibold transition-all ${
              view === 'updated' 
                ? 'bg-indigo-600 text-white shadow-lg' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            AI-Enhanced (Gemini)
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {articles.map(article => (
            <div key={article._id} className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-shadow overflow-hidden">
              <div className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2"></div>
              <div className="p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-3 line-clamp-2">
                  {article.title}
                </h2>
                <p className="text-sm text-gray-500 mb-6">
                  {new Date(article.published_at).toLocaleDateString('en-US', {
                    year: 'numeric', month: 'long', day: 'numeric'
                  })}
                </p>
                <div 
                  className="text-gray-700 prose prose-sm max-w-none"
                  dangerouslySetInnerHTML={{ __html: getContent(article).substring(0, 600) + '...' }}
                />
                {view === 'updated' && article.references && article.references.length > 0 && (
                  <div className="mt-8 pt-6 border-t border-gray-200">
                    <h4 className="font-semibold text-sm text-gray-600 mb-3">References:</h4>
                    <ul className="space-y-2">
                      {article.references.map((ref, i) => (
                        <li key={i} className="text-sm">
                          <a href={ref} target="_blank" rel="noopener noreferrer" 
                             className="text-blue-600 hover:underline break-all">
                            [{i+1}] {ref}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-8 text-indigo-600 font-medium hover:text-indigo-800 transition"
                >
                  Read Full Original →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;