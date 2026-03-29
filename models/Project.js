const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  longDescription: { type: String },
  image: { type: String, default: '' },
  techStack: [{ type: String }],
  githubLink: { type: String, default: '' },
  liveLink: { type: String, default: '' },
  featured: { type: Boolean, default: false },
  order: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.models.Project || mongoose.model('Project', projectSchema);
