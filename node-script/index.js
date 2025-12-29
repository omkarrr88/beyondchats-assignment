// Phase 2: Real SerpAPI (relaxed key-phrase search) + your exact fallback refs + Gemini 2.5-flash-lite
require('dotenv').config();
const axios = require('axios');
const cheerio = require('cheerio');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash-lite' });

let SerpApi = null;
let search = null;

const serpKey = process.env.SERPAPI_KEY?.trim();
if (serpKey && serpKey.length > 20) {
  try {
    SerpApi = require('google-search-results-nodejs');
    search = new SerpApi.GoogleSearch(serpKey);
    console.log('SerpAPI loaded — using real Google search with relaxed queries');
  } catch (err) {
    console.log('SerpAPI library failed — using your fallback refs');
  }
} else {
  console.log('No valid SERPAPI_KEY — using your specified fallback refs');
}

const API_BASE = process.env.API_BASE_URL;

// Your exact fallback references (used when SerpAPI fails or no results)
const fallbackRefs = {
  "Chatbots Magic: Beginner’s Guidebook": [
    "https://elextensions.com/beginners-guide-chatbots/",
    "https://www.eclincher.com/articles/beginners-guide-chatbots"
  ],
  "From 0 to Sales Hero: How Sales Chatbots Increase Conversions": [
    "https://www.nutshell.com/blog/chatbot-for-website-conversion",
    "https://leadoo.com/blog/chatbot-conversion-data-bots-increase-conversion/"
  ],
  "Can Chatbots Boost Your E-commerce Conversions?": [
    "https://polcode.com/resources/blog/boosting-e-commerce-conversion-rates-with-ai-chatbots/",
    "https://www.nutshell.com/blog/chatbot-for-website-conversion"
  ],
  "10 Solutions for Common Customer Service Issues": [
    "https://knowmax.ai/blog/customer-service-problems/",
    "https://www.revechat.com/blog/customer-service-problems/"
  ],
  "Chatbots Vs Live Chat: What is best?": [
    "https://www.tidio.com/blog/chatbot-vs-live-chat/",
    "https://www.proprofschat.com/blog/live-chat-vs-chatbots/"
  ]
};

// Generate relaxed key-phrase query (no quotes, common words removed)
function generateRelaxedQuery(title) {
  return title
    .toLowerCase()
    .replace(/["?:]/g, '')
    .replace(/\b(how|what|is|are|the|your|a|an|for|in|on|with|to|vs|and|0|10)\b/gi, ' ')
    .trim()
    .split(' ')
    .filter(word => word.length > 3)
    .join(' ') + ' blog OR article -site:beyondchats.com';
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

async function searchGoogleForBlogs(title) {
  if (!search) {
    console.log(`Using your fallback refs for "${title}"`);
    return fallbackRefs[title] || fallbackRefs["Chatbots Magic: Beginner’s Guidebook"];
  }

  const relaxedQuery = generateRelaxedQuery(title);
  console.log(`Searching Google with relaxed query: "${relaxedQuery}"`);

  return new Promise((resolve) => {
    search.json({ q: relaxedQuery, num: 10 }, (data) => {
      try {
        if (!data || !data.organic_results || data.organic_results.length === 0) {
          console.log(`No results — using fallback refs`);
          return resolve(
            fallbackRefs[title] || fallbackRefs["Chatbots Magic: Beginner’s Guidebook"]
          );
        }

        const blogLinks = data.organic_results
          .map(r => r.link)
          .filter(link =>
            link &&
            (
              link.includes('/blog') ||
              link.includes('/article') ||
              link.includes('medium.com') ||
              link.includes('hubspot.com') ||
              link.includes('intercom.com') ||
              link.includes('zendesk.com') ||
              link.includes('tidio.com') ||
              link.includes('nutshell.com') ||
              link.includes('leadoo.com')
            )
          )
          .slice(0, 2);

        if (blogLinks.length < 2) {
          console.log(`Only ${blogLinks.length} valid links — using fallback`);
          return resolve(
            fallbackRefs[title] || fallbackRefs["Chatbots Magic: Beginner’s Guidebook"]
          );
        }

        console.log(`Found ${blogLinks.length} real blog links`);
        resolve(blogLinks);
      } catch (err) {
        console.error(`SerpAPI parsing failed — using fallback`);
        resolve(
          fallbackRefs[title] || fallbackRefs["Chatbots Magic: Beginner’s Guidebook"]
        );
      }
    });
  });
}


async function scrapeContent(url) {
  try {
    console.log(`Scraping: ${url}`);
    const { data } = await axios.get(url, { timeout: 15000 });
    const $ = cheerio.load(data);
    let text = $('article p, main p, .content p').text();
    if (text.length < 1000) text = $('p').text();
    return text.trim().replace(/\s+/g, ' ').substring(0, 10000);
  } catch (err) {
    console.error(`Scrape failed: ${url}`, err.message);
    return 'Reference content on chatbot best practices.';
  }
}

async function rewriteWithGemini(original, ref1, ref2, url1, url2) {
  const prompt = `Rewrite the original article to match the professional style of the two references (use headings, bold, bullets, engaging tone).

End with References section.

Original: ${original.substring(0, 5000)}

Ref 1: ${ref1.substring(0, 4000)}

Ref 2: ${ref2.substring(0, 4000)}

References:
[1] ${url1}
[2] ${url2}

Output only rewritten article.`;

  try {
    console.log('Generating with Gemini 2.5-flash-lite...');
    const result = await model.generateContent(prompt);
    return result.response.text().trim();
  } catch (err) {
    console.error('Gemini error:', err.message);
    return original + `\n\nReferences\n[1] ${url1}\n[2] ${url2}`;
  }
}

async function updateArticle(id, content, refs) {
  try {
    await axios.put(`${API_BASE}/articles/${id}`, {
      updated_content: content,
      references: refs
    });
    console.log(`Updated article ${id}\n`);
  } catch (err) {
    console.error('Update failed:', err.message);
  }
}

async function processArticle(article) {
  if (article.updated_content) {
    console.log(`Skipped (already updated): ${article.title}\n`);
    return;
  }

  console.log(`Processing: ${article.title}`);
  const refUrls = await searchGoogleForBlogs(article.title);

  const [ref1Content, ref2Content] = await Promise.all([
    scrapeContent(refUrls[0]),
    scrapeContent(refUrls[1])
  ]);

  const updatedContent = await rewriteWithGemini(
    article.content,
    ref1Content,
    ref2Content,
    refUrls[0],
    refUrls[1]
  );

  await updateArticle(article._id, updatedContent, refUrls);

  console.log('Waiting 60 seconds...\n');
  await new Promise(r => setTimeout(r, 60000));
}

async function main() {
  const articles = await fetchArticles();
  if (articles.length === 0) {
    console.log('No articles — run Phase 1 scraper first!');
    return;
  }

  console.log(`Starting Phase 2 for ${articles.length} articles...\n`);

  for (const article of articles) {
    await processArticle(article);
  }

  console.log('Phase 2 Complete! Real Google search (relaxed) or your fallback + Gemini rewrite + citations done.');
}

main().catch(err => {
  console.error('Script error:', err.message);
});