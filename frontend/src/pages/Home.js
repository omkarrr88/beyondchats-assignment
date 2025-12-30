"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import Skeleton from "react-loading-skeleton"
import "react-loading-skeleton/dist/skeleton.css"
import Hero from "../components/Hero"
import ArticleCard from "../components/ArticleCard"
import ArticleSelector from "../components/ArticleSelector"
import ComparisonView from "../components/ComparisonView"
import Filters from "../components/Filters"

const Home = () => {
  const [articles, setArticles] = useState([])
  const [filteredArticles, setFilteredArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [sort, setSort] = useState("date-desc")
  const [view, setView] = useState("both") // 'both', 'original', 'ai'
  const [searchTerm, setSearchTerm] = useState("")
  const [showSelector, setShowSelector] = useState(false)
  const [comparisonArticle, setComparisonArticle] = useState(null)

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/articles`)
      .then((res) => {
        setArticles(res.data.sort((a, b) => new Date(b.published_at) - new Date(a.published_at)))
        setLoading(false)
      })
      .catch((err) => {
        console.error(err)
        setError("Failed to load articles. Please try again.")
        setLoading(false)
      })
  }, [])

  useEffect(() => {
    let temp = [...articles]

    if (searchTerm) {
      temp = temp.filter((art) => art.title.toLowerCase().includes(searchTerm.toLowerCase()))
    }

    let displayArticles = []

    if (view === "original") {
      // Show only original articles (first 5)
      displayArticles = temp.slice(0, 5).map((art) => ({ ...art, type: "original" }))
    } else if (view === "ai") {
      // Show only AI-enhanced articles (5 articles marked as AI)
      displayArticles = temp.slice(0, 5).map((art) => ({ ...art, type: "ai" }))
    } else {
      // Show both - create 10 articles (5 original + 5 AI-enhanced)
      temp.slice(0, 5).forEach((art) => {
        displayArticles.push({ ...art, type: "original" })
        displayArticles.push({ ...art, type: "ai" })
      })
    }

    if (sort === "date-desc") {
      displayArticles = displayArticles.sort((a, b) => new Date(b.published_at) - new Date(a.published_at))
    } else if (sort === "date-asc") {
      displayArticles = displayArticles.sort((a, b) => new Date(a.published_at) - new Date(b.published_at))
    }

    setFilteredArticles(displayArticles)
  }, [articles, sort, searchTerm, view])

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
        <div className="text-center">
          <p className="text-2xl text-red-500 dark:text-red-400 mb-4">Error Loading Articles</p>
          <p className="text-gray-600 dark:text-gray-400">{error}</p>
        </div>
      </div>
    )

  if (comparisonArticle) {
    return <ComparisonView article={comparisonArticle} onClose={() => setComparisonArticle(null)} />
  }

  if (loading)
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <Hero />
        <div className="container mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} height={400} className="dark:bg-gray-800" />
            ))}
          </div>
        </div>
      </div>
    )

  if (filteredArticles.length === 0)
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
        <div className="text-center">
          <p className="text-2xl text-gray-600 dark:text-gray-400 mb-4">No Articles Found</p>
          <p className="text-gray-500 dark:text-gray-500">Try adjusting your search filters.</p>
        </div>
      </div>
    )

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <Hero />
      <div className="container mx-auto px-4 md:px-6 py-12">
        {/* Search and Compare Section */}
        <div className="mb-10">
          <div className="flex flex-col md:flex-row gap-4 mb-6 items-start md:items-center">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by title..."
              className="input-base flex-1 w-full px-4 py-3 rounded-lg border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800"
            />
            <button onClick={() => setShowSelector(true)} className="btn-primary w-full md:w-auto whitespace-nowrap">
              Compare Original vs AI Enhanced
            </button>
          </div>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Found <span className="font-semibold text-gray-800 dark:text-gray-200">{filteredArticles.length}</span>{" "}
              article{filteredArticles.length !== 1 ? "s" : ""}
            </p>

            <Filters view={view} setView={setView} setSort={setSort} />
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.map((article, idx) => (
            <ArticleCard key={`${article._id}-${article.type}-${idx}`} article={article} type={article.type} />
          ))}
        </div>
      </div>

      {/* Article Selector Modal */}
      <ArticleSelector
        isOpen={showSelector}
        onClose={() => setShowSelector(false)}
        articles={articles}
        onSelectArticle={setComparisonArticle}
      />
    </div>
  )
}

export default Home
