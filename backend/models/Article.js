// Mongoose schema for articles - flexible for updates/references
const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },  // Original content
  url: { type: String, required: true, unique: true },
  published_at: { type: Date },
  updated_content: { type: String },  // For Phase 2
  references: { type: [String] }  // Array of citation URLs
}, { timestamps: true });

module.exports = mongoose.model('Article', articleSchema);