"use client"

const Filters = ({ setSort, view, setView }) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 md:gap-6 mb-8">
      {/* View Filter */}
      <select
        value={view}
        onChange={(e) => setView(e.target.value)}
        className="input-base bg-white dark:bg-gray-800 px-4 py-3 rounded-lg font-medium cursor-pointer hover:border-blue-400 dark:hover:border-blue-500 transition-all duration-200"
      >
        <option value="both">Both (Original & AI-Enhanced)</option>
        <option value="original">Original Only</option>
        <option value="ai">AI-Enhanced Only</option>
      </select>

      {/* Sort Filter */}
      <select
        onChange={(e) => setSort(e.target.value)}
        defaultValue="date-desc"
        className="input-base bg-white dark:bg-gray-800 px-4 py-3 rounded-lg font-medium cursor-pointer hover:border-blue-400 dark:hover:border-blue-500 transition-all duration-200"
      >
        <option value="date-desc">Newest First</option>
        <option value="date-asc">Oldest First</option>
      </select>
    </div>
  )
}

export default Filters
