const express = require('express');
const router = express.Router();
const Visitor = require('../models/Visitor');
const { protect } = require('../middleware/auth');

/**
 * @route   GET /api/analytics/stats
 * @desc    Get visitor statistics
 * @access  Private (Admin)
 */
router.get('/stats', protect, async (req, res) => {
  try {
    const totalViews = await Visitor.countDocuments();
    
    // Unique visitors based on ipHash (which is ip + date hash in the middleware)
    // If we want overall unique total across time, we'd need a different hash without the date salt
    // For now, let's treat unique as "daily unique" if we use the date salt, or let's aggregate.
    const uniqueVisitorsResult = await Visitor.aggregate([
      { $group: { _id: "$ipHash" } },
      { $count: "count" }
    ]);
    const uniqueVisitors = uniqueVisitorsResult.length > 0 ? uniqueVisitorsResult[0].count : 0;

    // Device breakdown
    const deviceBreakdown = await Visitor.aggregate([
      { $group: { _id: "$deviceType", count: { $sum: 1 } } }
    ]);

    // Last 30 days history
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const history = await Visitor.aggregate([
      { $match: { timestamp: { $gte: thirtyDaysAgo } } },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$timestamp" } },
          views: { $sum: 1 }
        }
      },
      { $sort: { "_id": 1 } }
    ]);

    res.json({
      totalViews,
      uniqueVisitors,
      deviceBreakdown,
      history
    });
  } catch (error) {
    console.error('Analytics Fetch Error:', error);
    res.status(500).json({ message: 'Server error fetching analytics' });
  }
});

/**
 * @route   GET /api/analytics/recent
 * @desc    Get recent individual visitors
 * @access  Private (Admin)
 */
router.get('/recent', protect, async (req, res) => {
  try {
    const recentVisitors = await Visitor.find()
      .sort({ timestamp: -1 })
      .limit(50);
    
    res.json(recentVisitors);
  } catch (error) {
    console.error('Recent Visitors Fetch Error:', error);
    res.status(500).json({ message: 'Server error fetching recent visitors' });
  }
});

module.exports = router;
