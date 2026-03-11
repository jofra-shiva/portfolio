const express = require('express');
const router = express.Router();
const PortfolioInfo = require('../models/PortfolioInfo');
const { protect } = require('../middleware/auth');

// GET /api/portfolio - Public
router.get('/', async (req, res) => {
  try {
    let info = await PortfolioInfo.findOne();
    if (!info) info = await PortfolioInfo.create({});
    res.json(info);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT /api/portfolio - Protected
router.put('/', protect, async (req, res) => {
  try {
    let info = await PortfolioInfo.findOne();
    if (!info) {
      info = await PortfolioInfo.create(req.body);
    } else {
      info = await PortfolioInfo.findByIdAndUpdate(info._id, req.body, { new: true });
    }
    res.json(info);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
