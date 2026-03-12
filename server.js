const express = require('express');
const cors = require('cors');
const path = require('path');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const connectDB = require('./config/db');
require('dotenv').config();

const app = express();

// Connect Database
console.log('⏳ Connecting to MongoDB...');
connectDB().then(() => {
  console.log('✅ MongoDB connection initialization complete');
}).catch(err => {
  console.error('❌ MongoDB initialization failed:', err);
});

// Security Middlewares
app.use(helmet()); // Secure HTTP headers
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
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);
    if (allowedOrigins.some(allowed => 
      typeof allowed === 'string' ? allowed === origin : allowed.test(origin)
    )) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
app.use(express.json({ limit: '10kb' })); // Body payload limit
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/projects', require('./routes/projects'));
app.use('/api/skills', require('./routes/skills'));
app.use('/api/portfolio', require('./routes/portfolio'));
app.use('/api/contact', require('./routes/contact'));
app.use('/api/upload', require('./routes/upload'));

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
  res.json({ status: 'ok', message: 'Portfolio API is running' });
});

// Render and most cloud providers set PORT automatically.
// We must listen on 0.0.0.0 to be accessible externally.
const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`🌐 Accessible at http://0.0.0.0:${PORT}`);
    
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
