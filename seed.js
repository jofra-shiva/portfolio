const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const User = require('./models/User');
const Project = require('./models/Project');
const Skill = require('./models/Skill');
const PortfolioInfo = require('./models/PortfolioInfo');

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await User.deleteMany();
    await Project.deleteMany();
    await Skill.deleteMany();
    await PortfolioInfo.deleteMany();

    // Create admin user
    const admin = await User.create({
      name: 'Sivaprakash',
      email: 'admin@portfolio.com',
      password: 'Admin@123',
      role: 'admin'
    });
    console.log('✅ Admin user created:', admin.email);

    // Seed Portfolio Info
    await PortfolioInfo.create({
      name: 'Sivaprakash',
      tagline: 'Lead Architect | Full Stack MERN Expert',
      typingTexts: ['Full Stack Architect', 'MERN Stack Specialist', 'AI Solutions Developer', 'Software Engineer'],
      bio: "Visionary Full Stack Developer with expert-level proficiency in the MERN stack. I engineer sophisticated, production-grade web applications that seamlessly blend robust backend architecture with premium, high-performance user interfaces.",
      about: "I specialize in architecting scalable digital ecosystems. From high-throughput RESTful APIs to pixel-perfect frontends, my focus is on delivering secure, maintainable, and industry-leading software solutions that drive business value.",
      email: 'jofrashiva04@gmail.com',
      phone: '+91 88389 39801',
      location: 'Tamil Nadu, India',
      github: 'https://github.com/jofrashiva',
      linkedin: 'https://www.linkedin.com/in/sivaprakash-m-1525ss',
      instagram: 'https://www.instagram.com/jofra_shiva04/',
      whatsapp: 'https://wa.me/918838939801',
      education: [
        {
          degree: 'Master of Computer Applications (MCA)',
          institution: 'Nehru Institute of Information Technology & Management',
          year: '2023 - 2025',
          description: 'Specializing in Enterprise Software Architecture, Deep Learning, and Cloud Systems.'
        },
        {
          degree: 'Bachelor of Science in Information Technology',
          institution: 'Mary Matha College',
          year: '2020 - 2023',
          description: 'Distinguished foundation in Data Structures, Algorithms, and Core Computing Principles.'
        }
      ],
      experience: []
    });
    console.log('✅ Portfolio info seeded');
 
    // Seed Projects
    await Project.insertMany([
      {
        title: 'AcademiaFlow: ERP Engine',
        description: 'Enterprise-grade Campus Management System with RBAC and secure student-staff synchronization.',
        longDescription: 'A sophisticated institutional resource planning engine featuring multi-tier Role-Based Access Control (RBAC). It centralizes academic records, automates attendance via secure APIs, and provides real-time analytics for institutional performance tracking.',
        image: '',
        techStack: ['React.js', 'Node.js', 'MongoDB', 'Express', 'JWT', 'REST API'],
        githubLink: 'https://github.com/jofrashiva',
        liveLink: '',
        featured: true,
        order: 1
      },
      {
        title: 'SenticNews: AI Recommendations',
        description: 'Context-aware news engine leveraging Facial Emotion Recognition and NLP for personalized feeds.',
        longDescription: 'An advanced AI-integrated news delivery platform that utilizes Computer Vision (CVP) to analyze user sentiment in real-time. It correlates emotional states with topic categories to provide a hyper-personalized news consumption experience.',
        image: '',
        techStack: ['Python', 'TensorFlow', 'OpenCV', 'React', 'Flask', 'News Systems'],
        githubLink: 'https://github.com/jofrashiva',
        liveLink: '',
        featured: true,
        order: 2
      },
      {
        title: 'CodexMCA: Interactive Roadmap',
        description: 'High-performance learning hub providing structured education paths, technical syllabi, and coding resources.',
        longDescription: 'A premium educational architecture built for modern engineering students. It features a hierarchical study repository, real-time code execution environments for challenges, and a centralized document management system for academic excellence.',
        image: '',
        techStack: ['React', 'MERN Stack', 'Postman', 'Cloud Storage', 'CSS-in-JS'],
        githubLink: 'https://github.com/jofrashiva',
        liveLink: '',
        featured: true,
        order: 3
      }
    ]);
    console.log('✅ Projects seeded');

    // Seed Skills
    await Skill.insertMany([
      // Frontend
      { name: 'React.js', category: 'frontend', level: 90, order: 1 },
      { name: 'JavaScript', category: 'frontend', level: 88, order: 2 },
      { name: 'HTML5', category: 'frontend', level: 95, order: 3 },
      { name: 'CSS3', category: 'frontend', level: 88, order: 4 },
      // Backend
      { name: 'Node.js', category: 'backend', level: 85, order: 1 },
      { name: 'Express.js', category: 'backend', level: 85, order: 2 },
      { name: 'REST API', category: 'backend', level: 90, order: 3 },
      { name: 'Python', category: 'backend', level: 75, order: 4 },
      // Database
      { name: 'MongoDB', category: 'database', level: 85, order: 1 },
      { name: 'MySQL', category: 'database', level: 75, order: 2 },
      // Tools
      { name: 'Git & GitHub', category: 'tools', level: 88, order: 1 },
      { name: 'VS Code', category: 'tools', level: 95, order: 2 },
      { name: 'Postman', category: 'tools', level: 85, order: 3 },
      { name: 'System Design', category: 'tools', level: 80, order: 4 }
    ]);
    console.log('✅ Skills seeded');

    console.log('\n🎉 Database seeded successfully!');
    console.log('📧 Admin Email: admin@portfolio.com');
    console.log('🔑 Admin Password: Admin@123');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seed Error:', error);
    process.exit(1);
  }
};

seedData();
