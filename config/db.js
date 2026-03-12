const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
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
