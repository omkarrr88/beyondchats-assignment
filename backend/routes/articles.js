// Express routes for CRUD
const express = require('express');
const Article = require('../models/Article');
const router = express.Router();

// GET /api/articles - List all
router.get('/', async (req, res) => {
  try {
    const articles = await Article.find().sort({ published_at: 1 });
    res.json(articles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/articles/:id - Show one
router.get('/:id', async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) return res.status(404).json({ error: 'Not found' });
    res.json(article);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/articles - Create
router.post('/', async (req, res) => {
  try {
    const { title, content, url, published_at } = req.body;
    if (!title || !content || !url) return res.status(400).json({ error: 'Missing fields' });
    const existing = await Article.findOne({ url });
    if (existing) return res.status(409).json({ error: 'Duplicate URL' });
    const article = new Article({ title, content, url, published_at: new Date(published_at) });
    await article.save();
    res.status(201).json(article);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/articles/:id - Update
router.put('/:id', async (req, res) => {
  try {
    const { updated_content, references } = req.body;
    const article = await Article.findByIdAndUpdate(
      req.params.id,
      { updated_content, references },
      { new: true, runValidators: true }
    );
    if (!article) return res.status(404).json({ error: 'Not found' });
    res.json(article);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/articles/:id
router.delete('/:id', async (req, res) => {
  try {
    await Article.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;