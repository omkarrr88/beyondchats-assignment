"use client"

const Hero = () => {
  return (
    <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 dark:from-blue-900 dark:via-indigo-900 dark:to-gray-900 text-white py-16 md:py-24 text-center relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute -bottom-8 right-4 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 leading-tight">
          BeyondChats Blog:
          <br className="md:hidden" /> Original vs AI-Enhanced
        </h1>
        <p className="text-base md:text-lg lg:text-xl mb-8 text-blue-100 dark:text-blue-200 max-w-3xl mx-auto leading-relaxed px-2">
          Explore how AI improves article quality while maintaining original meaning and integrity
        </p>

        <div className="flex justify-center gap-3 md:gap-4 mb-8 flex-wrap px-4">
          <div className="bg-white bg-opacity-20 dark:bg-gray-800 dark:bg-opacity-40 backdrop-blur-md px-4 md:px-6 py-2 md:py-3 rounded-full border border-white border-opacity-30 hover:bg-opacity-30 transition-all duration-300 text-xs md:text-sm font-semibold">
            <span>5 Articles Compared</span>
          </div>
          <div className="bg-white bg-opacity-20 dark:bg-gray-800 dark:bg-opacity-40 backdrop-blur-md px-4 md:px-6 py-2 md:py-3 rounded-full border border-white border-opacity-30 hover:bg-opacity-30 transition-all duration-300 text-xs md:text-sm font-semibold">
            <span>AI Model: Gemini</span>
          </div>
          <div className="bg-white bg-opacity-20 dark:bg-gray-800 dark:bg-opacity-40 backdrop-blur-md px-4 md:px-6 py-2 md:py-3 rounded-full border border-white border-opacity-30 hover:bg-opacity-30 transition-all duration-300 text-xs md:text-sm font-semibold">
            <span>Live Updates</span>
          </div>
        </div>

        <a
          href="/about"
          className="inline-block bg-white text-blue-600 dark:bg-indigo-500 dark:text-white px-6 md:px-8 py-2 md:py-3 rounded-lg font-semibold hover:bg-blue-50 dark:hover:bg-indigo-600 transition-all duration-300 transform hover:scale-105 shadow-lg text-sm md:text-base"
        >
          How This Works?
        </a>
      </div>
    </section>
  )
}

export default Hero
