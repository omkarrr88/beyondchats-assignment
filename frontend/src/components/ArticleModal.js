"use client"

import { useEffect } from "react"
import ReactMarkdown from "react-markdown"

const ArticleModal = ({ isOpen, onClose, content, title, type = "original" }) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") onClose()
    }
    if (isOpen) {
      window.addEventListener("keydown", handleEscape)
      document.body.style.overflow = "hidden"
    }
    return () => {
      window.removeEventListener("keydown", handleEscape)
      document.body.style.overflow = "unset"
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const getBadge = () => {
    if (type === "original") {
      return (
        <span className="bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 px-3 py-1 rounded-full text-sm font-semibold">
          📄 Original Article
        </span>
      )
    } else if (type === "ai") {
      return (
        <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm font-semibold">
          ✨ AI-Enhanced Article
        </span>
      )
    }
    return null
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto modal-enter">
        <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-900 dark:to-indigo-900 px-6 md:px-8 py-6 flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            {getBadge()}
            <h2 className="text-xl font-bold text-white">
              {title}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-200 transition-colors p-2 rounded-full hover:bg-white hover:bg-opacity-20"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="px-6 md:px-8 py-8">
          <div className="prose prose-base dark:prose-invert max-w-none leading-relaxed">
            <ReactMarkdown>{content}</ReactMarkdown>
          </div>
        </div>

        <div className="sticky bottom-0 bg-gray-50 dark:bg-gray-700 px-6 md:px-8 py-4 border-t border-gray-200 dark:border-gray-600 flex gap-4">
          <button
            onClick={onClose}
            className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

export default ArticleModal