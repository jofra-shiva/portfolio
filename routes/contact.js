const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const Contact = require('../models/Contact');
const { protect } = require('../middleware/auth');

// Configure NodeMailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// POST /api/contact - Public
router.post('/', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ message: 'Name, email and message are required' });
    }
    const contact = await Contact.create({ name, email, subject, message });

    // Send Auto-Reply async and silently
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      const mailOptions = {
        from: `"Sivaprakash M" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: `Thank you for reaching out, ${name}!`,
        html: `
          <div style="font-family: Arial, sans-serif; padding: 25px; max-width: 600px; line-height: 1.6; border: 1px solid #eaeaea; border-radius: 12px; border-top: 4px solid #7c3aed;">
            <h2 style="color: #1e293b; margin-top: 0;">Hi ${name},</h2>
            <p style="color: #334155; font-size: 16px;">
              Thank you so much for reaching out to me via my portfolio! 
            </p>
            <p style="color: #334155; font-size: 16px;">
              This is an automated reply to confirm that I have successfully received your message regarding <strong>"${subject || 'Project Inquiry'}"</strong>.
            </p>
            <p style="color: #334155; font-size: 16px;">
              I am currently engaged with other tasks, but I will review your message and personally get back to you as soon as I am free.
            </p>
            <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 25px 0;" />
            <p style="color: #64748b; font-size: 14px; margin-bottom: 0;">
              Best regards,<br/>
              <strong style="color: #0f172a;">Sivaprakash M</strong><br/>
              Full Stack Developer
            </p>
          </div>
        `
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) console.error('Failed to send auto-reply:', error);
        else console.log('Auto-reply sent successfully via NodeMailer!');
      });
    }

    res.status(201).json({ message: 'Message sent successfully!', contact });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/contact - Protected (admin)
router.get('/', protect, async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT /api/contact/:id/read - Protected
router.put('/:id/read', protect, async (req, res) => {
  try {
    const msg = await Contact.findByIdAndUpdate(req.params.id, { read: true }, { new: true });
    res.json(msg);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE /api/contact/:id - Protected
router.delete('/:id', protect, async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.json({ message: 'Message deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
