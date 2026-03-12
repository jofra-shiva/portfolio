const mongoose = require('mongoose');

const achievementSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  date: { type: String }, // e.g., "Oct 2023" or "2024"
  organization: { type: String }, // Issuer or Company
  link: { type: String, default: '' },
  icon: { type: String, default: 'Award' }, // Lucide icon name or image URL
  order: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Achievement', achievementSchema);
