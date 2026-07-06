const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema({
  page: { type: String, required: true },
  section: { type: String, required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  order: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Content', contentSchema);