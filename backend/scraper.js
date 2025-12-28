const axios = require('axios');
const cheerio = require('cheerio');
const mongoose = require('mongoose');
const Article = require('./models/Article');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('DB Error:', err));

async function scrapeBlogs() {
  try {
    // Step 1: Get total pages from first page
    const { data: firstPage } = await axios.get('https://beyondchats.com/blogs/');
    const $first = cheerio.load(firstPage);
    let lastPageLink = $first('.pagination .page-link:last-child').attr('href');  
    let lastPageNum = 1;
    if (lastPageLink) {
      const match = lastPageLink.match(/page=(\d+)/);
      lastPageNum = match ? parseInt(match[1]) : 3;  
    }
    console.log(`Scraping page ${lastPageNum} for oldest articles`);

    // Step 2: Fetch last page
    const { data: lastPage } = await axios.get(`https://beyondchats.com/blogs/?page=${lastPageNum}`);
    const $ = cheerio.load(lastPage);
    const articleCards = $('.blog-post, .article-card, .post-item').slice(0, 5);  

    for (const card of articleCards) {
      const $card = cheerio(card);
      const title = $card.find('h2 a, .post-title').text().trim() || 'No title';
      const link = $card.find('a').attr('href');
      const fullUrl = link ? (link.startsWith('http') ? link : 'https://beyondchats.com' + link) : '';

      if (!fullUrl || await Article.findOne({ url: fullUrl })) {
        console.log('Skipped duplicate or invalid:', title);
        continue;
      }

      // Fetch full article content
      const { data: articleHtml } = await axios.get(fullUrl);
      const $article = cheerio.load(articleHtml);
      const content = $article('.post-content, .article-body, main p').text().trim().substring(0, 10000);  // Limit, join paras
      const dateStr = $article('.publish-date, .post-date').text().trim();
      const publishedAt = new Date(dateStr) || new Date();  

      await Article.create({
        title,
        content,
        url: fullUrl,
        published_at: publishedAt
      });
      console.log(`Scraped: ${title}`);
      await new Promise(r => setTimeout(r, 1000));  // delay added
    }
    console.log('Scraping complete! Check MongoDB.');
    mongoose.disconnect();
  } catch (err) {
    console.error('Scrape error:', err);
  }
}

scrapeBlogs();