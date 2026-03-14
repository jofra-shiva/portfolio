const mongoose = require('mongoose');
require('dotenv').config();
const Skill = require('../models/Skill');

const mernSkills = [
  // Frontend
  { name: 'React.js', category: 'frontend', level: 90, order: 1 },
  { name: 'Redux / Context API', category: 'frontend', level: 85, order: 2 },
  { name: 'Tailwind CSS', category: 'frontend', level: 90, order: 3 },
  { name: 'JavaScript (ES6+)', category: 'frontend', level: 90, order: 4 },
  { name: 'HTML5 & Semantic UI', category: 'frontend', level: 95, order: 5 },
  { name: 'CSS3 & Sass', category: 'frontend', level: 88, order: 6 },
  { name: 'Axios', category: 'frontend', level: 85, order: 7 },
  
  // Backend
  { name: 'Node.js', category: 'backend', level: 88, order: 1 },
  { name: 'Express.js', category: 'backend', level: 90, order: 2 },
  { name: 'RESTful API Design', category: 'backend', level: 92, order: 3 },
  { name: 'JWT Authentication', category: 'backend', level: 85, order: 4 },
  { name: 'Socket.io', category: 'backend', level: 75, order: 5 },
  { name: 'Nodemailer', category: 'backend', level: 80, order: 6 },
  
  // Database
  { name: 'MongoDB', category: 'database', level: 88, order: 1 },
  { name: 'Mongoose (ODM)', category: 'database', level: 90, order: 2 },
  { name: 'Firebase', category: 'database', level: 75, order: 3 },
  
  // Tools
  { name: 'Git & GitHub', category: 'tools', level: 90, order: 1 },
  { name: 'Postman', category: 'tools', level: 88, order: 2 },
  { name: 'VS Code', category: 'tools', level: 95, order: 3 },
  { name: 'Vercel / Netlify', category: 'tools', level: 85, order: 4 },
  { name: 'Docker', category: 'tools', level: 70, order: 5 },
  { name: 'System Architecture', category: 'tools', level: 80, order: 6 }
];

const addSkills = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Remove existing skills to avoid duplicates if re-running
    await Skill.deleteMany({ category: { $in: ['frontend', 'backend', 'database', 'tools'] } });
    
    await Skill.insertMany(mernSkills);
    console.log('✅ MERN & Web Development skills stored successfully!');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error storing skills:', error);
    process.exit(1);
  }
};

addSkills();
