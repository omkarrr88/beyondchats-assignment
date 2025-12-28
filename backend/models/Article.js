const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },  
  url: { type: String, required: true, unique: true },
  published_at: { type: Date },
  updated_content: { type: String },  
  references: { type: [String] }  
}, { timestamps: true });

module.exports = mongoose.model('Article', articleSchema);