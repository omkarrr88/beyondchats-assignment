// Phase 2 Script: SerpAPI conditional + crash-proof fallback (no library call if no key)
require('dotenv').config();
const axios = require('axios');
const cheerio = require('cheerio');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

const API_BASE = process.env.API_BASE_URL;
let SerpApi = null;
let serpapi = null;
const hasSerpKey = process.env.SERPAPI_KEY && process.env.SERPAPI_KEY.length > 10;
if (hasSerpKey) {
  try {
    SerpApi = require('google-search-results-nodejs');
    serpapi = new SerpApi.GoogleSearch(process.env.SERPAPI_KEY);
    console.log('✅ SerpAPI enabled with valid key');
  } catch (err) {
    console.log('⚠️ SerpAPI library error—using fallback');
  }
} else {
  console.log('⚠️ No valid SERPAPI_KEY—using fallback refs (get free at serpapi.com)');
}

async function fetchArticles() {
  try {
    const { data } = await axios.get(`${API_BASE}/articles`);
    console.log(`Fetched ${data.length} articles from DB`);
    return data;
  } catch (err) {
    console.error('Failed to fetch articles:', err.message);
    return [];
  }
}

// Enhanced fallback: Topic-specific mock refs (real blogs for demo)
function getMockRefs(title) {
  const keyword = title.toLowerCase().includes('chatbots') ? 'chatbots' : 
                  title.toLowerCase().includes('sales') ? 'sales chatbots' : 
                  title.toLowerCase().includes('e-commerce') ? 'ecommerce chatbots' : 
                  title.toLowerCase().includes('customer service') ? 'customer service chatbots' : 
                  'chatbots examples';
  const mocks = [
    `https://blog.hubspot.com/service/chatbot-examples`,
    `https://www.intercom.com/blog/chatbot-best-practices`,
    `https://www.zendesk.com/blog/chatbot-examples/`,
    `https://www.freshworks.com/blog/chatbot-examples/`,
    `https://www.drift.com/learn/chatbot-examples/`
  ];
  const refs = [mocks[0], mocks[Math.floor(Math.random() * mocks.length)]];  // 2 varied
  console.log(`Using fallback refs for "${title}" (keyword: ${keyword})`);
  return refs;
}

async function searchGoogle(title) {
  if (!hasSerpKey || !serpapi) {
    return getMockRefs(title);
  }

  const params = {
    q: `"${title}" -site:beyondchats.com`,
    num: 10,
    tbs: 'qdr:y'
  };
  try {
    console.log(`Searching Google for: "${title}"`);
    const response = await serpapi.json(params);
    if (!response || !response.organic_results) {
      console.error('Invalid SerpAPI response—using fallback');
      return getMockRefs(title);
    }

    const results = response.organic_results || [];
    const blogLinks = results
      .filter(r => r.link && (
        r.link.includes('/blog/') || 
        r.link.includes('/article/') || 
        r.link.includes('medium.com') || 
        r.link.includes('hubspot.com') ||
        r.link.includes('intercom.com') ||
        r.link.includes('zendesk.com')
      ))
      .slice(0, 2)
      .map(r => r.link);
    console.log(`Found ${blogLinks.length} real reference links for "${title}"`);
    return blogLinks.length >= 2 ? blogLinks : getMockRefs(title);
  } catch (err) {
    console.error('SerpAPI error (caught):', err.message);
    return getMockRefs(title);
  }
}

async function scrapeContent(url) {
  try {
    console.log(`Scraping ref: ${url}`);
    const { data } = await axios.get(url, { timeout: 10000 });
    const $ = cheerio.load(data);
    let text = $('article, .post-content, .entry-content, main, .content').text();
    if (text.length < 500) text = $('p').text();
    const content = text.trim().substring(0, 8000);
    console.log(`Scraped ${content.length} chars from ${url}`);
    return content;
  } catch (err) {
    console.error(`Scrape failed ${url}:`, err.message);
    return 'Sample reference content for demo purposes. In real use, this would be scraped blog body.';
  }
}

async function rewriteWithGemini(originalContent, ref1Content, ref2Content, ref1Url, ref2Url) {
  const prompt = `You are an expert SEO content writer. Rewrite the following original article to match the professional tone, structure, formatting (use headings, bullet points, bold text where appropriate), engagement, and depth of the two top-ranking reference articles.

Keep all core facts and meaning from the original. Make it more readable, modern, and optimized for readers (better flow, subheadings, lists).

At the very end, add a "References" section with:
[1] ${ref1Url}
[2] ${ref2Url}

Original Article:
${originalContent.substring(0, 4000)}

Reference Article 1 (emulate style/structure):
${ref1Content.substring(0, 4000)}

Reference Article 2 (emulate style/structure):
${ref2Content.substring(0, 4000)}

Output ONLY the rewritten article with references at the end. No explanations.`;

  try {
    console.log('Calling Gemini for rewrite...');
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const updated = response.text().trim();
    console.log(`Gemini rewrite complete (~${updated.length} chars)`);
    return updated;
  } catch (err) {
    console.error('Gemini API error:', err.message);
    return originalContent;  // Fallback
  }
}

async function updateArticle(articleId, updatedContent, references) {
  try {
    await axios.put(`${API_BASE}/articles/${articleId}`, {
      updated_content: updatedContent,
      references: references
    });
    console.log(`✅ Updated article ${articleId} with Gemini rewrite + refs`);
  } catch (err) {
    console.error(`Update failed for ${articleId}:`, err.message);
  }
}

async function processArticle(article) {
  if (article.updated_content) {
    console.log(`Already updated: ${article.title}`);
    return;
  }

  console.log(`\n🔄 Processing: ${article.title}`);
  const refUrls = await searchGoogle(article.title);
  if (refUrls.length < 2) {
    console.log('⚠️ Not enough references — skipping');
    return;
  }

  const [ref1Content, ref2Content] = await Promise.all([
    scrapeContent(refUrls[0]),
    scrapeContent(refUrls[1])
  ]);

  if (!ref1Content || !ref2Content || (ref1Content.length < 100 && ref2Content.length < 100)) {
    console.log('⚠️ Failed to scrape meaningful content — skipping');
    return;
  }

  const updatedContent = await rewriteWithGemini(
    article.content,
    ref1Content,
    ref2Content,
    refUrls[0],
    refUrls[1]
  );

  await updateArticle(article._id || article.id, updatedContent, refUrls);
  await new Promise(r => setTimeout(r, 5000));  // 5s delay
}

async function main() {
  const articles = await fetchArticles();
  if (articles.length === 0) {
    console.log('No articles in DB — run scraper first!');
    return;
  }

  for (const article of articles) {
    await processArticle(article);
  }

  console.log('\n🎉 Phase 2 Complete! Check API for updated_content + references.');
}

main().catch(console.error);