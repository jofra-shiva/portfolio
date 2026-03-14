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
    else if (/tablet|ipad|playbook|silk/i.test(ua)) deviceType = 'tablet';

    // Enhanced Browser detection
    let browser = 'Unknown';
    if (/edg/i.test(ua)) browser = 'Edge';
    else if (/opr|opera/i.test(ua)) browser = 'Opera';
    else if (/chrome|crios/i.test(ua)) browser = 'Chrome';
    else if (/firefox|fxios/i.test(ua)) browser = 'Firefox';
    else if (/safari/i.test(ua)) browser = 'Safari';
    else if (/trident/i.test(ua)) browser = 'Internet Explorer';

    // Enhanced OS detection
    let os = 'Unknown';
    if (/windows/i.test(ua)) os = 'Windows';
    else if (/macintosh|mac os x/i.test(ua)) os = 'Mac OS';
    else if (/linux/i.test(ua)) os = 'Linux';
    else if (/android/i.test(ua)) os = 'Android';
    else if (/iphone|ipad|ipod/i.test(ua)) os = 'iOS';

    // Record the visit
    Visitor.create({
      ipHash,
      userAgent: ua,
      deviceType,
      browser,
      os,
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
