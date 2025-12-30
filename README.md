# BeyondChats Blog Enhancer: AI-Powered Article Comparison Tool

[License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)  
[React](https://img.shields.io/badge/React-18.2-blue)  
[Node.js](https://img.shields.io/badge/Node.js-20-green)  
[MongoDB](https://img.shields.io/badge/MongoDB-7.0-green)  
[Gemini AI](https://img.shields.io/badge/Gemini-AI-orange)  
[Vercel Deployed](https://img.shields.io/badge/Deployed-Vercel-black)

---

## 🚀 Project Overview

This repository showcases my submission for the Full Stack Web Developer Intern position at BeyondChats – a paid internship opportunity where I was shortlisted based on my profile (as per the assignment PDF dated around late 2025). The project is an end-to-end full-stack application that scrapes the 5 oldest articles from the BeyondChats blog (`beyondchats.com/blogs/`), enhances them using Google Gemini AI (incorporating insights from top Google search results via SerpAPI), stores everything in MongoDB, and provides a responsive React frontend for side-by-side comparisons of original vs. AI-enhanced versions.

### Key Features

- **Ethical Scraping:** Fetches articles with delays and user-agents to respect robots.txt and avoid overload.  
- **AI Enhancement:** For each article, performs relaxed Google searches, scrapes top 2 references, and uses Gemini (`gemini-2.5-flash-lite`) to rewrite while preserving original meaning, improving structure/readability, and adding citations.  
- **Interactive UI:** Filter by view (Original/AI-Enhanced/Both), sort by date, search by title, and compare in modals with badges, read-time estimates, and reference links.  
- **Dashboard Stats:** Displays total articles, average improvement (word count), category pie chart, and AI model used.  
- **Dark Mode & Responsiveness:** Tailwind-powered theme toggle (persists in `localStorage`), mobile-first design (stacks on small screens).  
- **Professional Touches:** Skeleton loading, error handling, accessibility (`focus-visible`, ARIA), and hover animations for smooth UX.  

This project demonstrates full-stack expertise: backend scraping/AI integration, API design, database modeling, and modern React UI/UX. It's deployable, scalable, and ethically built (cites sources, no hard-coded keys).

**Live Demo:** [beyondchats-enhancer.vercel.app](https://beyondchats-enhancer.vercel.app/?referrer=grok.com)   

**Backend API:** [api-beyondchats-enhancer.vercel.app](https://api-beyondchats-enhancer.vercel.app/?referrer=grok.com) 

---

## Why This Project?

Inspired by BeyondChats' focus on conversational AI for businesses, this tool highlights how Gemini can "enhance" blog content – e.g., adding sections on chatbots/sales use cases while maintaining voice. Total articles processed: 5 (as per assignment). Built with ❤️ in December 2025.

[Architecture Diagram](diagrams/architecture.png)  
(Uploaded diagram [Image ID: 5 or 7]: Scraper → MongoDB → API (SerpAPI + Gemini) → React UI. Alternative flow [Image ID: 6] shows blog scrape → Google search → rewrite → store.)

---

## 🛠 Tech Stack

| Category      | Technologies |
|--------------|-------------|
| **Frontend** | React 18.2, React Router, Tailwind CSS 3.4, React Markdown, React Loading Skeleton, Axios |
| **Backend**  | Node.js 20, Express 5.2, Mongoose 9.0, Cheerio (scraping), Google Generative AI SDK |
| **Database** | MongoDB 7.0 (Atlas cloud-hosted) |
| **AI/Search**| Google Gemini (`gemini-2.5-flash-lite`), SerpAPI (Google search scraping) |
| **Dev Tools**| Nodemon (dev server), dotenv (env vars), PostCSS/Autoprefixer (CSS) |
| **Deployment** | Vercel (frontend), Render (backend – free tier for Express), MongoDB Atlas (DB) |
| **Testing/Other** | Jest (unused boilerplate), ESLint (implied via CRA) |

**APIs Used:**

- **SerpAPI:** For Google search results (key in `.env` – rate-limited to 100/month free).  
- **Gemini AI:** For content rewriting (free tier with prompt engineering for style-matching).  
- **MongoDB Atlas:** Free M0 cluster for persistence.  

No external paid services beyond free tiers; fallbacks in code handle API failures.

---

## 📁 Project Structure

The repo is organized into four main folders for clarity (monorepo-style, but separable for deployment):

```
beyondchats-assignment/
├── README.md # This file
├── .gitignore # Standard ignores (node_modules, env, builds)
│
├──  diagrams/ # Architecture PNGs (e.g., architecture.png [Image ID: 5/7])
│
├── frontend/ # React app (Vercel-ready)
│ ├── public/ # Static assets
│ │ ├── index.html # Entry HTML
│ │ ├── favicon.ico # Icons (use uploaded React logo )
│ ├── src/
│ │ ├── components/ # Reusable UI (ArticleCard.js, Hero.js, Navbar.js, etc.)
│ │ ├── pages/ # Routes (Home.js, About.js)
│ │ ├── App.js # Router wrapper
│ │ ├── index.js # Entry point
│ │ └── index.css # Global styles (Tailwind directives)
│ ├── .env # REACT_APP_API_URL (points to backend)
│ ├── tailwind.config.js # Dark mode + typography plugin
│ ├── postcss.config.js # Tailwind processing
│ └── package.json # Frontend deps (react, tailwind, etc.)
│
├── backend/ # Node/Express API (Render-ready)
│ ├── models/ # Mongoose schemas
│ │ └── Article.js # Article model (title, content, updated_content, references)
│ ├── routes/ # Express routes
│ │ └── articles.js # CRUD endpoints (/api/articles)
│ ├── server.js # Main app (CORS, JSON parsing, Mongo connect)
│ ├── scraper.js # Phase 1: Blog scraping (5 oldest articles)
│ ├── .env # MONGO_URI, PORT=5000
│ └── package.json # Backend deps (express, mongoose, axios, cheerio)
│
├── node-script/ 
│ ├── index.js # Phase 2: SerpAPI search + Gemini rewrite
│ ├── .env # GEMINI_API_KEY, SERPAPI_KEY
│ ├── package.json # Script deps (generative-ai, serpapi)
```

- **Frontend:** Single-page app with routing (Home/About). Components are modular (e.g., `ArticleModal` for full views).  
- **Backend:** RESTful API serving articles. Connects to MongoDB Atlas.  
- **Scripts:** Run locally to populate DB (scrape → enhance → insert). Not part of runtime.

---

## 🔧 Installation & Setup Guide

### Prerequisites

- Node.js ≥20 (download from [nodejs.org](https://nodejs.org/))  
- MongoDB Atlas account (free tier: [mongodb.com/atlas](https://www.mongodb.com/atlas))  
- API Keys:
  - Gemini: [ai.google.dev](https://ai.google.dev/) (free, generate key)
  - SerpAPI: [serpapi.com](https://serpapi.com/) (free 100 searches/month)  
- Git (for cloning)  
- Code editor (VS Code recommended)

### Step 1: Clone & Install Dependencies

git clone https://github.com/omkarrr88/beyondchats-assignment.git

```
cd beyondchats-assignment

```


**Frontend:**

```
cd frontend

```
```
npm install # Installs React, Tailwind, Axios, etc.

```

```
cd ..

```

**Backend:**

```
cd backend

```

```
npm install # Installs Express, Mongoose, Cheerio, etc.

```

```
cd ..

```

**Node-script :**

```
cd scripts

```

```
npm install # Installs Gemini SDK, SerpAPI

```

```
cd ..

```

### Step 2: Environment Setup

Create `.env` files (use uploaded templates; never commit keys! – add to `.gitignore`).

**`backend/.env`:**

```
MONGO_URI=your_mongodb_atlas_connection_string # e.g., mongodb+srv://user:pass@cluster.mongodb.net/beyondchats
PORT=5000

```

**`scripts/.env`:**

```
GEMINI_API_KEY=your_gemini_key
SERPAPI_KEY=your_serpapi_key
API_BASE_URL=http://localhost:5000/api # Local backend

```

**`frontend/.env`:**

```
REACT_APP_API_URL=http://localhost:5000/api # Update post-deployment

```

**Set up MongoDB Atlas:**

- Create free cluster.  
- Whitelist IP: `0.0.0.0/0` (dev only; restrict in prod).  
- Get connection string, replace `<password>` with DB user pass.

### Step 3: Populate Database (Run Once)

This scrapes/enhances 5 articles and saves to MongoDB.

```
cd backend

```

```
npm run start # Or: node scraper.js (Phase 1), then node phase2.js (Phase 2)

```

**Output:** Logs progress (e.g., `✅ Saved: Article Title | Len: 1200 chars`). Expect ~5–10 min with delays.  

**Verify:** Check MongoDB Atlas collections (5 docs with `updated_content` and `references` arrays).

```
npm run dev # Starts at http://localhost:5000 (Nodemon auto-reloads)

```


**Frontend (new terminal):**

```
cd frontend

```

```
npm start # Starts at http://localhost:3000

```

Visit `http://localhost:3000` – browse articles, filter, compare!

### Troubleshooting

- **CORS Errors:** Ensure backend CORS allows `http://localhost:3000`.  
- **API Key Issues:** Check SerpAPI/Gemini quotas; code has fallbacks (e.g., hardcoded refs if search fails).  
- **Mongo Connect Fail:** Verify Atlas whitelist/user perms.  
- **Tailwind Not Working:** Run `npm install` again; check `tailwind.config.js`.

---

## 📖 Usage

- **Home Page:** View article cards (filter/sort/search). Click "Compare" for side-by-side modal.  
- **Article Modal:** Full read with badges (Original 📄 vs AI-Enhanced ✨), references.  
- **About Page:** Project explainer with architecture diagram.  
- **Dark Mode:** Toggle in Navbar (persists via `localStorage`).  

---

## 🏗 Architecture

High-level flow (see diagram [Image ID: 6]):

1. **Scrape Blogs (`backend/scraper.js`):** Axios + Cheerio → Extract title/content/URL/date from last page.  
2. **Search & Enhance (`node-script/index.js`):** SerpAPI for `"article title + similar blogs"` → Scrape top 2 refs → Gemini prompt: "Rewrite [content] using [refs], match BeyondChats style, add citations."  
3. **Store (`backend/models/Article.js`):** Mongoose schema saves original + enhanced.  
4. **Serve (`backend/routes/articles.js`):** Express GET/POST/PUT/DELETE for CRUD.  
5. **Display (frontend):** Axios fetch → React cards/modals → Tailwind UI.  

Data Flow: Blogs → Scraper → MongoDB → API → React (duplicated articles for "both" view).  

Security: Env vars for keys; no frontend exposure.  
Scalable: Add pagination to routes.

---

## 🤝 Contributing

Fork, PR with descriptions. Issues welcome for bugs/features (e.g., add Claude AI alternative).

---

## 📄 License

MIT License – Free to use/fork. © 2025 Omkar Kadam.

---

## 👨‍💻 Author

**Omkar Kadam**

- GitHub: [omkarrr88](https://github.com/omkarrr88)  
- LinkedIn: [Omkar Kadam](https://www.linkedin.com/in/omkarrrr/)  
- Portfolio: [omkar-kadam.vercel.app](https://omkar-kadam.vercel.app/)  
- Email: [omkarkadam@example.com](mailto:omkarkadam181188@gmail.com)   

Built for BeyondChats Internship – Shortlisted Dec 2025. 

---

**Last Updated:** Dec 31, 2025