"use client"

import { useState } from "react"
import ArticleModal from "./ArticleModal"

const ArticleCard = ({ article, type = "original" }) => {
  const [isOpen, setIsOpen] = useState(false)

  const getCategory = (title) => {
    if (title.includes("Chatbots")) return "Chatbots"
    if (title.includes("Sales")) return "Sales"
    if (title.includes("E-commerce")) return "E-commerce"
    if (title.includes("Customer Service")) return "Customer Service"
    return "Other"
  }

  const getContent = () => {
    return type === "ai" && article.updated_content ? article.updated_content : article.content
  }

  const getReadTime = () => {
    const content = getContent()
    return Math.ceil(content.split(" ").length / 200) + " min read"
  }

  const getBadge = () => {
    if (type === "original") {
      return (
        <span className="text-xs font-semibold px-4 py-2 rounded-full inline-block mb-4 transition-all duration-300 bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200">
          📄 Original Article
        </span>
      )
    } else if (type === "ai") {
      return (
        <span className="text-xs font-semibold px-4 py-2 rounded-full inline-block mb-4 transition-all duration-300 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
          ✨ AI-Enhanced Article
        </span>
      )
    }
    return null
  }

  return (
    <div className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700">
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2"></div>
      <div className="p-6 md:p-8">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-lg md:text-xl font-bold text-gray-800 dark:text-white mb-2 line-clamp-2 group-hover:line-clamp-none transition-all duration-300">
              {article.title}
            </h3>
            <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 flex flex-wrap gap-2">
              <span>
                {new Date(article.published_at).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
              <span>•</span>
              <span>{getReadTime()}</span>
              <span>•</span>
              <span>{getCategory(article.title)}</span>
            </p>
          </div>
        </div>

        {getBadge()}

        <div
          className="text-gray-700 dark:text-gray-300 prose prose-sm dark:prose-invert max-w-none mb-6 text-left leading-relaxed line-clamp-3 group-hover:line-clamp-none transition-all duration-300"
          dangerouslySetInnerHTML={{ __html: getContent().substring(0, 200) + "..." }}
        />

        <button
          onClick={() => setIsOpen(true)}
          className="text-blue-600 dark:text-blue-400 font-semibold hover:text-blue-800 dark:hover:text-blue-300 mb-4 transition-all duration-300 flex items-center gap-2 group/btn w-full justify-start"
        >
          <span>View Full Article</span>
          <span className="group-hover/btn:translate-x-1 transition-transform duration-300">→</span>
        </button>

        {type === "ai" && article.references && article.references.length > 0 && (
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
            <h4 className="font-semibold text-sm text-gray-800 dark:text-white mb-2">References:</h4>
            <ul className="text-xs space-y-1">
              {article.references.slice(0, 3).map((ref, i) => (
                <li key={i}>
                  <a 
                    href={ref} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-blue-500 dark:text-blue-400 hover:underline break-words"
                  >
                    [{i+1}] {ref}
                  </a>
                </li>
              ))}
              {article.references.length > 3 && (
                <li className="text-gray-500 dark:text-gray-400">... and {article.references.length - 3} more</li>
              )}
            </ul>
          </div>
        )}
      </div>

      <ArticleModal 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)} 
        content={getContent()} 
        title={article.title} 
        type={type}
      />
    </div>
  )
}

export default ArticleCard