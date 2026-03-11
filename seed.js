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
      tagline: 'Full Stack Developer & Tech Enthusiast',
      typingTexts: ['Full Stack Developer', 'MERN Stack Developer', 'Tech Enthusiast', 'Problem Solver'],
      bio: "I'm a passionate Full Stack Developer specialized in the MERN stack. I build innovative, real-world solutions with clean code and a focus on user experience.",
      about: "I craft modern, responsive web apps with an eye for detail. From frontend finesse to backend logic, I enjoy turning ideas into smooth digital experiences. Always exploring AI integrations & smart workflows.",
      email: 'jofrashiva04@gmail.com',
      phone: '+91 88389 39801',
      location: 'Tamil Nadu, India',
      github: 'https://github.com/jofrashiva',
      linkedin: 'https://www.linkedin.com/in/sivaprakash-m-1525ss',
      instagram: 'https://www.instagram.com/jofra_shiva04/',
      whatsapp: 'https://wa.me/918838939801',
      education: [
        {
          degree: 'M.C.A (Master of Computer Applications)',
          institution: 'Nehru Institute of Information Technology & Management',
          year: '2023 - 2025',
          description: 'Specialized in software engineering, web development, and cloud computing.'
        },
        {
          degree: 'B.Sc. Information Technology',
          institution: 'Mary Matha College',
          year: '2020 - 2023',
          description: 'Foundation in programming, databases, and computer science fundamentals.'
        }
      ],
      experience: []
    });
    console.log('✅ Portfolio info seeded');

    // Seed Projects
    await Project.insertMany([
      {
        title: 'Smart Campus Portal',
        description: 'Full-stack management system with student/staff records, attendance, and exams.',
        longDescription: 'A comprehensive campus management system featuring role-based access control (admin, faculty, student) with secure authentication. Manages student records, attendance tracking, exam scheduling, and grade management.',
        image: '',
        techStack: ['React', 'Node.js', 'MongoDB', 'Express', 'JWT', 'REST API'],
        githubLink: 'https://github.com/jofrashiva',
        liveLink: '',
        featured: true,
        order: 1
      },
      {
        title: 'EmoNews AI',
        description: 'Emotion-based news recommendation using facial expression analysis and live news APIs.',
        longDescription: 'An innovative AI-powered application that analyzes users facial expressions in real-time and recommends news articles based on their current emotional state. Integrates computer vision models with live news APIs.',
        image: '',
        techStack: ['Python', 'React', 'TensorFlow', 'OpenCV', 'News API', 'Flask'],
        githubLink: 'https://github.com/jofrashiva',
        liveLink: '',
        featured: true,
        order: 2
      },
      {
        title: 'MCA Learning Hub',
        description: 'Study portal for MCA learners with notes, syllabus, coding problems, and previous papers.',
        longDescription: 'A comprehensive learning platform designed for MCA students. Features an interactive roadmap, downloadable study materials, coding challenges, previous exam papers, and a clean modern UI.',
        image: '',
        techStack: ['React', 'Node.js', 'MongoDB', 'Express', 'CSS3', 'REST API'],
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
