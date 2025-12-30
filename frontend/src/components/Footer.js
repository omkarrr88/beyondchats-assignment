const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-gray-800 to-gray-900 dark:from-gray-900 dark:to-black text-white py-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-bold mb-4 text-blue-400">About</h3>
            <p className="text-gray-300 dark:text-gray-400 text-sm leading-relaxed">
              This is a BeyondChats internship assignment showcasing AI-powered content enhancement using Gemini API.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4 text-blue-400">Links</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://beyondchats.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 dark:text-gray-400 hover:text-blue-400 transition-colors duration-200 text-sm"
                >
                  BeyondChats Website
                </a>
              </li>
              <li>
                <a
                  href="https://beyondchats.com/blogs/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 dark:text-gray-400 hover:text-blue-400 transition-colors duration-200 text-sm"
                >
                  Original Blog
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/omkarrr88/beyondchats-assignment.git"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 dark:text-gray-400 hover:text-blue-400 transition-colors duration-200 text-sm"
                >
                  GitHub Repo
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4 text-blue-400">Developer</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://www.linkedin.com/in/omkarrrr/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 dark:text-gray-400 hover:text-blue-400 transition-colors duration-200 text-sm"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <p className="text-gray-300 dark:text-gray-400 text-sm">omkarkadam181188@gmail.com</p>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 dark:border-gray-800 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <h4 className="font-semibold text-sm text-gray-300 mb-2">Built with:</h4>
              <p className="text-gray-400 dark:text-gray-500 text-sm">
                React, Node.js, Gemini API, MongoDB, Tailwind CSS
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-sm text-gray-300 mb-2">Last updated:</h4>
              <p className="text-gray-400 dark:text-gray-500 text-sm">Dec 31, 2025</p>
            </div>
          </div>

          <div className="text-center pt-6 border-t border-gray-700 dark:border-gray-800">
            <p className="text-gray-400 dark:text-gray-500 text-sm">
              © 2025 BeyondChats Internship Project. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
