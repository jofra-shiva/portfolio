const Visitor = require('../models/Visitor');
const crypto = require('crypto');

/**
 * Middleware to track visitors.
 * It hashes the IP to maintain privacy while allowing unique visitor counting.
 */
const visitorTracker = async (req, res, next) => {
  try {
    // Skip tracking for API requests (except specifically the frontend entry point if desired)
    // and skip for admin routes
    if (req.path.startsWith('/api') || req.path.startsWith('/admin')) {
      return next();
    }

    // Get IP and User Agent
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const ua = req.headers['user-agent'] || '';

    // Create a hash of the IP + current date to track daily unique visitors
    const salt = new Date().toISOString().split('T')[0]; // Daily salt
    const ipHash = crypto.createHash('sha256').update(ip + salt).digest('hex');

    // Basic device detection logic
    let deviceType = 'desktop';
    if (/mobile/i.test(ua)) deviceType = 'mobile';
    else if (/tablet|ipad/i.test(ua)) deviceType = 'tablet';

    // Basic browser detection
    let browser = 'unknown';
    if (/chrome|crios/i.test(ua)) browser = 'chrome';
    else if (/firefox|fxios/i.test(ua)) browser = 'firefox';
    else if (/safari/i.test(ua) && !/chrome/i.test(ua)) browser = 'safari';
    else if (/edge/i.test(ua)) browser = 'edge';

    // Record the visit
    // We use a background-like approach: don't wait for it to finish to respond to the user
    Visitor.create({
      ipHash,
      userAgent: ua,
      deviceType,
      browser,
      path: req.path,
      timestamp: new Date()
    }).catch(err => console.error('Error recording visitor:', err));

    next();
  } catch (error) {
    console.error('Visitor tracker error:', error);
    next();
  }
};

module.exports = visitorTracker;
