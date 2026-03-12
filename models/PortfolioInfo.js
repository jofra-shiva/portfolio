const mongoose = require('mongoose');

const portfolioInfoSchema = new mongoose.Schema({
  name: { type: String, default: 'Sivaprakash' },
  tagline: { type: String, default: 'Full Stack Developer & Tech Enthusiast' },
  typingTexts: [{ type: String }],
  bio: { type: String, default: '' },
  about: { type: String, default: '' },
  email: { type: String, default: 'jofrashiva04@gmail.com' },
  phone: { type: String, default: '' },
  location: { type: String, default: '' },
  github: { type: String, default: 'https://github.com/jofrashiva' },
  linkedin: { type: String, default: 'https://www.linkedin.com/in/sivaprakash-m-1525ss' },
  instagram: { type: String, default: 'https://www.instagram.com/jofra_shiva04/' },
  whatsapp: { type: String, default: 'https://wa.me/918838939801' },
  twitter: { type: String, default: '' },
  leetcode: { type: String, default: '' },
  resumeLink: { type: String, default: '' },
  profileImage: { type: String, default: '' },
  yearsExp: { type: String, default: 'Fresher' },
  projectsCount: { type: String, default: '10+' },
  degree: { type: String, default: 'MCA' },
  education: [{
    degree: { type: String },
    institution: { type: String },
    startDate: { type: String },
    endDate: { type: String },
    year: { type: String },
    grade: { type: String },
    description: { type: String }
  }],
  experience: [{
    role: { type: String },
    company: { type: String },
    location: { type: String },
    startDate: { type: String },
    endDate: { type: String },
    duration: { type: String },
    description: { type: String }
  }]
}, { timestamps: true });

module.exports = mongoose.model('PortfolioInfo', portfolioInfoSchema);
