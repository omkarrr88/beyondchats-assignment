"use client"

import { useEffect } from "react"

const ArticleSelector = ({ isOpen, onClose, articles, onSelectArticle }) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") onClose()
    }
    if (isOpen) window.addEventListener("keydown", handleEscape)
    return () => window.removeEventListener("keydown", handleEscape)
  }, [isOpen, onClose])

  if (!isOpen) return null

  const displayArticles = articles.slice(0, 5)

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto shadow-2xl">
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Select Article to Compare</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Choose an article to view the original and AI-enhanced versions side by side
          </p>
        </div>

        <div className="space-y-3">
          {displayArticles.map((article, index) => (
            <button
              key={article._id}
              onClick={() => {
                onSelectArticle(article)
                onClose()
              }}
              className="w-full text-left p-4 rounded-xl border-2 border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400 bg-gray-50 dark:bg-gray-700 hover:bg-blue-50 dark:hover:bg-gray-600 transition-all duration-200 group"
            >
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-1">
                  <div className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-600 text-white font-semibold text-sm">
                    {index + 1}
                  </div>
                </div>
                <div className="flex-grow">
                  <h3 className="font-semibold text-gray-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-1 line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 flex gap-2">
                    <span>
                      {new Date(article.published_at).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                    <span>•</span>
                    <span>{Math.ceil(article.content.split(" ").length / 200)} min read</span>
                  </p>
                </div>
                <span className="text-blue-600 dark:text-blue-400 group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </div>
            </button>
          ))}
        </div>

        <button
          onClick={onClose}
          className="w-full mt-6 px-6 py-3 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  )
}

export default ArticleSelector
