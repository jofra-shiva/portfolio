const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const rateLimit = require('express-rate-limit');

const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE });

// Block repeated bad requests to /login
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes window
  max: 5, // restrict to 5 consecutive login failures per IP
  message: { message: 'Too many login attempts from this IP. Please try again after 15 minutes.' },
  standardHeaders: true,
  legacyHeaders: false,
});

// @route POST /api/auth/login
router.post('/login', loginLimiter, async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    // Enforce "ONLY me" security: Only an actual user object with 'admin' role passes.
    if (user && user.role === 'admin' && (await user.matchPassword(password))) {
      return res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id)
      });
    } else {
      // Artificial delay to prevent timing attacks and brute forcing
      setTimeout(() => {
        res.status(401).json({ message: 'Invalid Admin credentials or Unauthorized Access.' });
      }, 1500);
    }
  } catch (error) {
    res.status(500).json({ message: 'Server authentication error' });
  }
});

// @route GET /api/auth/me
const { protect } = require('../middleware/auth');
router.get('/me', protect, async (req, res) => {
  res.json(req.user);
});

module.exports = router;
