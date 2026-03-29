const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const User = require('./models/User');
const Project = require('./models/Project');
const Skill = require('./models/Skill');
const Achievement = require('./models/Achievement');
const PortfolioInfo = require('./models/PortfolioInfo');

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await User.deleteMany();
    await Project.deleteMany();
    await Skill.deleteMany();
    await Achievement.deleteMany();
    await PortfolioInfo.deleteMany();

    // Create admin user
    const admin = await User.create({
      name: 'Leo',
      email: 'Leo@gmail.com',
      password: "asdfghjkl;'",
      role: 'admin'
    });
    console.log('✅ Admin user created:', admin.email);

    // Seed Portfolio Info
    await PortfolioInfo.create({
      name: 'Sivaprakash',
      tagline: 'Full Stack Developer & Tech Enthusiast',
      typingTexts: ['Full Stack Developer', 'MERN Stack Specialist', 'Web Architect', 'UI/UX Enthusiast'],
      bio: "Full Stack Web Developer building scalable, responsive web applications with the MERN stack. Passionate about clean code, great UX, and turning ideas into real-world digital products.",
      about: "I specialize in the MERN stack (MongoDB, Express, React, Node.js). I have a strong foundation in building efficient RESTful APIs and modern, responsive frontend interfaces.",
      email: 'jofrashiva04@gmail.com',
      phone: '+91 88389 39801',
      location: 'Tamil Nadu, India',
      github: 'https://github.com/jofra-shiva',
      linkedin: 'https://www.linkedin.com/in/sivaprakash-m-1525ss',
      instagram: 'https://www.instagram.com/jofra_shiva04/',
      whatsapp: 'https://wa.me/918838939801',
      yearsExp: 'Fresher',
      projectsCount: '2+',
      degree: 'MCA',
      education: [
        {
          degree: 'MCA',
          institution: 'Nehru Institute of Information Technology & Management',
          year: '2023 - 2025'
        },
        {
          degree: 'B.Sc Information Technology',
          institution: 'Mary Matha College',
          year: '2020 - 2023',
          grade: '7.6'
        }
      ],
      experience: [
        {
          role: 'Frontend Developer',
          company: 'AK Technologies',
          location: 'Coimbatore',
          description: 'AVSECO company project'
        }
      ]
    });
    console.log('✅ Portfolio info seeded');

    // Seed Achievements
    await Achievement.create({
      title: "Hindhusthan",
      description: "SZFd",
      date: "oct 2025",
      organization: "google",
      icon: "Trophy",
      order: 0
    });
    console.log('✅ Achievements seeded');

    // Seed Projects
    await Project.insertMany([
      {
        title: 'Emo News',
        description: 'Emotional based to showing news',
        longDescription: 'An AI-integrated news delivery platform that correlations emotional states with topic categories for a personalized experience.',
        image: 'https://sivaprakash-m.onrender.com/uploads/1773649208438-7520033.png',
        techStack: ['React', 'Express', 'MongoDB'],
        githubLink: 'https://github.com/jofra-shiva/EmoNews',
        liveLink: 'https://emo-news-6tz6.vercel.app/overview',
        featured: true,
        order: 1
      },
      {
        title: 'AVSECO Smart ERP',
        description: 'AVSECO Smart ERP System',
        longDescription: 'A sophisticated institutional resource planning engine built for AVSECO.',
        image: 'https://sivaprakash-m.onrender.com/uploads/1773649013748-941534426.png',
        techStack: ['React'],
        githubLink: 'https://github.com/sivaprakashakintern/avseco_f',
        liveLink: 'https://avseco-f.vercel.app/',
        featured: false,
        order: 2
      }
    ]);
    console.log('✅ Projects seeded');

    // Seed Skills
    await Skill.insertMany([
      { name: 'Redux / Context API', category: 'frontend', level: 85, order: 2 },
      { name: 'HTML5 & Semantic UI', category: 'frontend', level: 95, order: 5 },
      { name: 'Node.js', category: 'backend', level: 88, order: 1 },
      { name: 'Socket.io', category: 'backend', level: 75, order: 5 },
      { name: 'Mongoose (ODM)', category: 'database', level: 90, order: 2 },
      { name: 'Firebase', category: 'database', level: 75, order: 3 },
      { name: 'Vercel / Netlify', category: 'tools', level: 85, order: 4 },
      { name: 'React.js', category: 'frontend', level: 92, order: 1 },
      { name: 'JavaScript', category: 'frontend', level: 90, order: 3 },
      { name: 'MongoDB', category: 'database', level: 88, order: 1 }
    ]);
    console.log('✅ Skills seeded');

    console.log('\n🎉 Database recovered and seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Restore Error:', error);
    process.exit(1);
  }
};

seedData();
