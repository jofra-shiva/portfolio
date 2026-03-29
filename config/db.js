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
      bufferCommands: true, // Allow waiting for connection in serverless
      serverSelectionTimeoutMS: 20000, 
      family: 4, // Force IPv4 to avoid IPv6 resolution issues on Vercel
    };

    const conn = await mongoose.connect(mongoUri, options);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB Error: ${error.message}`);
    
    if (error.message.includes('querySrv ECONNREFUSED')) {
      console.error('🌎 DNS Error: Your network/provider is blocking SRV record queries. Trying to force ipv4first DNS order...');
    } else if (error.message.includes('IP address') || error.message.includes('whitelisted') || error.name === 'MongooseServerSelectionError') {
      console.error('🔓 URGENT: It looks like an IP Whitelist issue. Go to MongoDB Atlas -> Network Access -> Add IP Address -> Select "Allow Access From Anywhere" (0.0.0.0/0).');
    }

    console.error('💡 Tip: Ensure your MONGODB_URI starts with "mongodb+srv://" for best results with Vercel.');
    
    // In production, we don't exit to stay alive for other static requests or health checks
    if (process.env.NODE_ENV !== 'production') {
      // process.exit(1); 
    }
  }
};

module.exports = connectDB;
