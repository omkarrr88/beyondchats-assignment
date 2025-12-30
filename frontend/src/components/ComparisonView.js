"use client"

import { useState } from "react"
import ReactMarkdown from "react-markdown"

const ComparisonView = ({ article, onClose }) => {
  const [activeTab, setActiveTab] = useState("both")

  if (!article) return null

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 py-8 px-4 md:px-6">
      <div className="max-w-full">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={onClose}
            className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold mb-4 flex items-center gap-2"
          >
            <span>←</span>
            <span>Back to Articles</span>
          </button>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-2 break-words">
            {article.title}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base">
            Published on{" "}
            {new Date(article.published_at).toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>

        {/* View Toggle */}
        <div className="flex gap-2 mb-8 flex-wrap">
          <button
            onClick={() => setActiveTab("both")}
            className={`px-4 md:px-6 py-2 md:py-3 rounded-lg font-semibold transition-all duration-200 ${
              activeTab === "both"
                ? "bg-blue-600 text-white shadow-lg"
                : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"
            }`}
          >
            Side by Side
          </button>
          <button
            onClick={() => setActiveTab("original")}
            className={`px-4 md:px-6 py-2 md:py-3 rounded-lg font-semibold transition-all duration-200 ${
              activeTab === "original"
                ? "bg-blue-600 text-white shadow-lg"
                : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"
            }`}
          >
            Original
          </button>
          <button
            onClick={() => setActiveTab("enhanced")}
            className={`px-4 md:px-6 py-2 md:py-3 rounded-lg font-semibold transition-all duration-200 ${
              activeTab === "enhanced"
                ? "bg-blue-600 text-white shadow-lg"
                : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"
            }`}
          >
            AI-Enhanced
          </button>
        </div>

        {/* Content View */}
        {activeTab === "both" ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Original */}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 shadow-md">
              <div className="flex items-center gap-2 mb-4 pb-4 border-b-2 border-gray-200 dark:border-gray-700">
                <span className="bg-gray-400 text-white px-3 py-1 rounded-full text-sm font-semibold">Original</span>
              </div>
              <div className="prose prose-sm dark:prose-invert max-w-none text-justify leading-relaxed">
                <ReactMarkdown>{article.content}</ReactMarkdown>
              </div>
            </div>

            {/* AI-Enhanced */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900 dark:to-indigo-900 rounded-2xl p-6 shadow-md">
              <div className="flex items-center gap-2 mb-4 pb-4 border-b-2 border-blue-200 dark:border-blue-700">
                <span className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  ✨ AI-Enhanced
                </span>
              </div>
              <div className="prose prose-sm dark:prose-invert max-w-none text-justify leading-relaxed">
                <ReactMarkdown>{article.updated_content}</ReactMarkdown>
              </div>
            </div>
          </div>
        ) : activeTab === "original" ? (
          <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 md:p-8 shadow-md mb-8">
            <div className="flex items-center gap-2 mb-6 pb-4 border-b-2 border-gray-200 dark:border-gray-700">
              <span className="bg-gray-400 text-white px-4 py-2 rounded-full text-sm font-semibold">
                Original Article
              </span>
            </div>
            <div className="prose prose-base dark:prose-invert max-w-none text-justify leading-relaxed">
              <ReactMarkdown>{article.content}</ReactMarkdown>
            </div>
          </div>
        ) : (
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900 dark:to-indigo-900 rounded-2xl p-6 md:p-8 shadow-md mb-8">
            <div className="flex items-center gap-2 mb-6 pb-4 border-b-2 border-blue-200 dark:border-blue-700">
              <span className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                ✨ AI-Enhanced Article
              </span>
            </div>
            <div className="prose prose-base dark:prose-invert max-w-none text-justify leading-relaxed">
              <ReactMarkdown>{article.updated_content}</ReactMarkdown>
            </div>
          </div>
        )}

        
      </div>
    </div>
  )
}

export default ComparisonView
