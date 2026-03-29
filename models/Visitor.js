const mongoose = require('mongoose');

const visitorSchema = new mongoose.Schema({
  ipHash: {
    type: String,
    required: true,
    index: true
  },
  userAgent: String,
  deviceType: {
    type: String,
    enum: ['mobile', 'tablet', 'desktop', 'unknown'],
    default: 'unknown'
  },
  browser: String,
  os: String,
  path: {
    type: String,
    default: '/'
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Index for easy statistics
visitorSchema.index({ timestamp: -1 });

module.exports = mongoose.models.Visitor || mongoose.model('Visitor', visitorSchema);
