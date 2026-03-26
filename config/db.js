const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI;
    
    if (!mongoUri) {
      console.error('❌ MONGODB_URI is not defined in environment variables');
      return;
    }

    // Mask the password for security in logs
    const maskedUri = mongoUri.replace(/\/\/.*:.*@/, '//****:****@');
    console.log(`🔗 Attempting to connect to MongoDB: ${maskedUri}`);

    const options = {
      bufferCommands: false, // Don't buffer operations when disconnected
      serverSelectionTimeoutMS: 5000, // Timeout after 5s
    };

    const conn = await mongoose.connect(mongoUri, options);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB Error: ${error.message}`);
    // Do not exit process in production; let the server stay alive to respond to health checks
    if (process.env.NODE_ENV !== 'production') {
      // process.exit(1); 
    }
  }
};

module.exports = connectDB;
