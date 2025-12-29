const axios = require('axios');
const cheerio = require('cheerio');
const mongoose = require('mongoose');
const Article = require('./models/Article');
require('dotenv').config();

const BASE_URL = 'https://beyondchats.com';
const USER_AGENT = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('DB Error:', err));

async function fetchPage(pageNum) {
  const url = pageNum === 1 ? `${BASE_URL}/blogs/` : `${BASE_URL}/blogs/page/${pageNum}/`;
  console.log(`Fetching page ${pageNum}: ${url}`);
  const { data: pageHtml } = await axios.get(url, { headers: { 'User-Agent': USER_AGENT } });
  console.log(`Page ${pageNum} fetched (HTML length: ${pageHtml.length})`);
  return cheerio.load(pageHtml);
}

async function extractArticlesFromPage($, pageNum) {
  const rawArticles = [];
  const titleLinks = $('h2 a[href*="/blogs/"], h3 a[href*="/blogs/"]');
  console.log(`Page ${pageNum}: Found ${titleLinks.length} potential articles`);

  if (titleLinks.length === 0) {
    console.log(`Page ${pageNum}: No list—checking single structure`);
    const singleLink = $('h2 a[href*="/blogs/"], .main-content a[href*="/blogs/"]').first();
    if (singleLink.length) {
      const title = singleLink.text().trim();
      if (title.length > 10) {
        const relativeUrl = singleLink.attr('href');
        const fullUrl = relativeUrl.startsWith('http') ? relativeUrl : BASE_URL + relativeUrl;
        // Date regex for December 5, 2023
        const surroundingText = singleLink.parent().text();
        const dateMatch = surroundingText.match(/\*\s*([A-Za-z]{3,9}\s+\d{1,2},?\s+\d{4})/);
        const dateStr = dateMatch ? dateMatch[1] : 'December 5, 2023';
        const publishedAt = new Date(dateStr);
        rawArticles.push({ 
          title, 
          url: fullUrl, 
          published_at: isNaN(publishedAt.getTime()) ? new Date('2023-12-05') : publishedAt,
          excerpt: 'Single-page teaser excerpt not extracted.' 
        });
      }
    }
    return rawArticles;
  }

  // List extraction (pg14)
  titleLinks.each((i, link) => {
    const title = $(link).text().trim();
    if (title.length < 10) return;

    let relativeUrl = $(link).attr('href');
    const fullUrl = relativeUrl.startsWith('http') ? relativeUrl : BASE_URL + relativeUrl;

    let dateStr = null;
    const parent = $(link).closest('article, .blog-item, .post, div, section');
    let dateEl = parent.find('p:contains("*")');
    if (dateEl.length) {
      dateStr = dateEl.first().text().trim().replace(/\*\s*/, '');  // Strip *
    } else {
      const parentText = parent.text();
      const dateMatch = parentText.match(/\*\s*([A-Za-z]{3,9}\s+\d{1,2},?\s+\d{4})/);
      dateStr = dateMatch ? dateMatch[1] : 'December 6, 2023';
    }

    let publishedAt = new Date(dateStr);
    if (isNaN(publishedAt.getTime())) publishedAt = new Date('2023-12-06');

    // Excerpt: Next p not containing date/month
    const excerptEl = parent.find('p').filter((idx, el) => {
      const text = $(el).text().trim();
      return text.length > 20 && !text.match(/(Dec|Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov)/i);
    }).first();
    const excerpt = excerptEl.length ? excerptEl.text().trim().substring(0, 150) + '...' : 'Excerpt not found.';

    rawArticles.push({ title, url: fullUrl, published_at: publishedAt, excerpt });
  });

  // Sort by date asc
  rawArticles.sort((a, b) => a.published_at - b.published_at);
  return rawArticles;
}

async function scrapeFullContent(url, title) {
  try {
    console.log(`  → Fetching full: ${url}`);
    const { data: articleHtml } = await axios.get(url, { headers: { 'User-Agent': USER_AGENT } });
    const $art = cheerio.load(articleHtml);  

    // Primary content: article p or main p (from site sample)
    let contentEls = $art('article p, main p, .post-content p, .entry-content p');
    if (contentEls.length === 0) {
      contentEls = $art('p').not('.meta, .footer, .date, nav p');
    }
    let content = contentEls.map((i, el) => $art(el).text().trim()).get()  
      .filter(text => text.length > 30)
      .join('\n\n')
      .substring(0, 15000);

    if (content.length < 200) {
      // Fallback: All body p, clean whitespace
      let bodyText = $art('body').text().trim();
      bodyText = bodyText.replace(/(\s{2,}|\n{3,})/g, '\n\n').substring(0, 15000);
      // Rough para split/join to simulate
      content = bodyText.split('\n\n').filter(para => para.length > 30).join('\n\n').substring(0, 15000);
    }

    console.log(`    Preview: ${content.substring(0, 100)}...`);

    let publishedAt = new Date('2023-12-06');  
    const fullDateEl = $art('p:contains("2023"), .publish-date, .post-date, time, .date');
    if (fullDateEl.length > 0) {
      const refinedStr = $art(fullDateEl[0]).text().trim().replace(/\*\s*/, '');  
      const refined = new Date(refinedStr);
      if (!isNaN(refined.getTime())) publishedAt = refined;
    }

    return { content: content || 'Content extraction incomplete.', published_at: publishedAt };
  } catch (err) {
    console.error(`    ❌ Full failed for ${title}: ${err.message}`);
    return { content: 'Fetch error—retry later.', published_at: new Date('2023-12-06') };
  }
}

async function scrapeBlogs() {
  try {
    const $first = await fetchPage(1);
    let lastPageLink = $first('.pagination ul li:last-child a, .pagination a:last-child').attr('href') || null;
    let totalPages = 15;
    if (lastPageLink) {
      const match = lastPageLink.match(/\/page\/(\d+)\//);
      totalPages = match ? parseInt(match[1]) : 15;
    }
    console.log(`Detected ${totalPages} total pages. Starting from page ${totalPages} for oldest.`);

    let allOldest = [];
    let currentPage = totalPages;
    const needed = 5;

    while (allOldest.length < needed && currentPage >= 1) {
      const $page = await fetchPage(currentPage);
      const pageArticles = await extractArticlesFromPage($page, currentPage);
      const toAdd = pageArticles.slice(0, needed - allOldest.length);
      allOldest = allOldest.concat(toAdd);
      console.log(`Page ${currentPage}: Added ${toAdd.length} articles (total now: ${allOldest.length})`);

      currentPage--;
      await new Promise(r => setTimeout(r, 1500));
    }

    const final5 = allOldest.slice(0, 5);
    console.log(`\n5 Oldest collected:`);
    final5.forEach((art, i) => console.log(`${i+1}. ${art.title} | ${art.published_at.toDateString()} | ${art.excerpt.substring(0, 50)}...`));

    let saved = 0;
    for (const art of final5) {
      const existing = await Article.findOne({ url: art.url });
      if (existing) {
        console.log(`Skipped duplicate: ${art.title}`);
        saved++;
        continue;
      }

      const { content, published_at } = await scrapeFullContent(art.url, art.title);
      await Article.create({ ...art, content, published_at });
      saved++;
      console.log(`✅ Saved: ${art.title} | Len: ${content.length} chars | Date: ${published_at.toDateString()}`);
      await new Promise(r => setTimeout(r, 2500));
    }

    console.log(`\n🎉 Done! ${saved}/5 saved to DB.`);
    mongoose.disconnect();
  } catch (err) {
    console.error('Scrape error:', err);
    mongoose.disconnect();
  }
}

scrapeBlogs();