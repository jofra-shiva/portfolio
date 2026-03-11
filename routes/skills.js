const express = require('express');
const router = express.Router();
const Skill = require('../models/Skill');
const { protect } = require('../middleware/auth');

// GET /api/skills - Public
router.get('/', async (req, res) => {
  try {
    const skills = await Skill.find().sort({ category: 1, order: 1 });
    res.json(skills);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST /api/skills - Protected
router.post('/', protect, async (req, res) => {
  try {
    const skill = await Skill.create(req.body);
    res.status(201).json(skill);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT /api/skills/:id - Protected
router.put('/:id', protect, async (req, res) => {
  try {
    const skill = await Skill.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!skill) return res.status(404).json({ message: 'Skill not found' });
    res.json(skill);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE /api/skills/:id - Protected
router.delete('/:id', protect, async (req, res) => {
  try {
    await Skill.findByIdAndDelete(req.params.id);
    res.json({ message: 'Skill deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
