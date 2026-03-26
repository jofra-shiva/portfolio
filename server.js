const express = require('express');
const cors = require('cors');
const path = require('path');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const visitorTracker = require('./middleware/visitorTracker');
require('dotenv').config();

const app = express();

// Connect Database
console.log('⏳ Connecting to MongoDB...');
connectDB().then(() => {
  console.log('✅ MongoDB connection initialization complete');
}).catch(err => {
  console.error('❌ MongoDB initialization failed:', err);
});

// Security Middlewares — custom CSP to allow GitHub stats images
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: [
          "'self'", 
          "'unsafe-inline'", 
          "'unsafe-eval'",
          "https://vercel.live",
          "https://*.vercel.live",
          "https://www.googletagmanager.com",
          "https://www.google-analytics.com",
          "https://www.clarity.ms",
          "https://*.clarity.ms"
        ],
        scriptSrcElem: [
          "'self'", 
          "'unsafe-inline'", 
          "https://vercel.live",
          "https://*.vercel.live",
          "https://www.googletagmanager.com",
          "https://www.clarity.ms",
          "https://*.clarity.ms"
        ],
        styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com", "https://vercel.live", "https://*.vercel.live"],
        fontSrc: ["'self'", "https://fonts.gstatic.com"],
        imgSrc: [
          "'self'",
          "data:",
          "blob:",
          "https://github-readme-stats.vercel.app",
          "https://github-readme-streak-stats.herokuapp.com",
          "https://raw.githubusercontent.com",
          "https://avatars.githubusercontent.com",
          "https://res.cloudinary.com",
          "https://*.onrender.com",
          "https://vercel.live",
          "https://*.vercel.live",
          "https://vercel.com",
          "https://www.googletagmanager.com",
          "https://www.google-analytics.com",
          "https://*.clarity.ms",
          "https://c.bing.com"
        ],
        connectSrc: [
          "'self'", 
          "https://api.github.com",
          "https://vercel.live",
          "https://*.vercel.live",
          "https://*.vercel-storage.com",
          "https://www.google-analytics.com",
          "https://*.google-analytics.com",
          "https://*.clarity.ms",
          "https://c.bing.com"
        ],
        frameSrc: ["'self'", "https://vercel.live", "https://*.vercel.live"],
        objectSrc: ["'none'"],
      },
    },
  })
);
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" })); // Allow images

// app.use(mongoSanitize()); // Temporarily disabled due to Vercel/Render strict getter crashes

// Standard Middleware
const allowedOrigins = [
  process.env.CLIENT_URL,
  'http://localhost:5173',
  'https://sivaprakash-m.onrender.com',
  /\.vercel\.app$/ // Allow all Vercel deployments
].filter(Boolean);

app.use(cors({
  origin: true, // Allow all origins in production for troubleshooting
  credentials: true
}));
app.use(express.json({ limit: '10kb' })); // Body payload limit
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Track Visitors (apply before routes but after standard middleware)
app.use(visitorTracker);

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/projects', require('./routes/projects'));
app.use('/api/skills', require('./routes/skills'));
app.use('/api/portfolio', require('./routes/portfolio'));
app.use('/api/contact', require('./routes/contact'));
app.use('/api/upload', require('./routes/upload'));
app.use('/api/achievements', require('./routes/achievements'));
app.use('/api/analytics', require('./routes/analytics'));

// Serve Static Assets in production
if (process.env.NODE_ENV === 'production' || process.env.RENDER) {
  // Set static folder
  app.use(express.static(path.join(__dirname, 'client/dist')));

  // Any route that is not an API route, serve index.html
  app.get(/^(?!\/api).*/, (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'));
  });
} else {
  // Health check and root route for development
  app.get('/', (req, res) => {
    res.send('Portfolio Backend API is running successfully!');
  });
}

app.get('/api/health', (req, res) => {
  const dbStatus = mongoose.connection.readyState;
  const dbStatusText = 
    dbStatus === 1 ? 'connected' : 
    dbStatus === 0 ? 'disconnected' : 
    dbStatus === 2 ? 'connecting' : 
    dbStatus === 3 ? 'disconnecting' : 'unknown';

  res.json({ 
    status: 'ok', 
    message: 'Portfolio API is running',
    database: dbStatusText,
    databaseCode: dbStatus,
    env: process.env.NODE_ENV,
    hasMongoUri: !!process.env.MONGODB_URI,
    uptime: process.uptime(),
    ts: new Date().toISOString()
  });
});

// Render and most cloud providers set PORT automatically.
const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    
    // Debug: Check if dist folder exists
    const distPath = path.join(__dirname, 'client/dist');
    const fs = require('fs');
    if (fs.existsSync(distPath)) {
      console.log('📂 Frontend build directory found at:', distPath);
    } else {
      console.warn('⚠️ Warning: Frontend build directory NOT found at:', distPath);
    }
  });
}

// Export for Vercel
module.exports = app;
