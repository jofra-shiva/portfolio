import { Briefcase, Globe, Code2, Users } from 'lucide-react';
import './Experience.css';

const experiences = [
  {
    type: 'freelance',
    role: 'Freelance Full Stack Developer',
    org: 'Self-Employed',
    period: '2024 – Present',
    desc: 'Designing and developing custom portfolio websites, business landing pages, and web applications for clients. Delivering responsive, SEO-optimised sites using React, Node.js, and MongoDB.',
    tags: ['React', 'Node.js', 'MongoDB', 'CSS'],
    icon: <Globe size={20} />,
    color: '#8b5cf6',
  },
  {
    type: 'project',
    role: 'Personal Portfolio Platform',
    org: 'Side Project',
    period: '2025',
    desc: 'Built a full-featured MERN portfolio with dynamic content management, admin dashboard, analytics tracking, visitor stats, and a chatbot — deployed on Render.',
    tags: ['MERN', 'REST API', 'JWT Auth', 'Render'],
    icon: <Code2 size={20} />,
    color: '#0ea5e9',
  },
  {
    type: 'project',
    role: 'Web Development Projects',
    org: 'Academic & Personal',
    period: '2023 – 2024',
    desc: 'Built multiple full-stack applications covering e-commerce, task management, and student portals. Focused on clean architecture, MVC patterns, and real-world database design.',
    tags: ['Express', 'MySQL', 'React', 'GitHub'],
    icon: <Users size={20} />,
    color: '#10b981',
  },
];

const Experience = () => (
  <section id="experience" className="section experience">
    <div className="container">
      <div className="section-header" data-aos="fade-up">
        <div className="section-tag">Journey</div>
        <h2 className="section-title">Experience & <span>Work</span></h2>
        <div className="divider"></div>
        <p className="section-subtitle">Freelance work, personal projects, and real-world development experience</p>
      </div>

      <div className="exp__grid">
        {experiences.map((exp, i) => (
          <div
            key={i}
            className="exp-card card"
            data-aos="fade-up"
            data-aos-delay={i * 100}
          >
            <div className="exp-card__header">
              <div className="exp-card__icon-wrap" style={{ background: `${exp.color}18`, color: exp.color }}>
                {exp.icon}
              </div>
              <div className="exp-card__meta">
                <span className="exp-card__period">{exp.period}</span>
                <span className="exp-card__type badge">{exp.type}</span>
              </div>
            </div>

            <h3 className="exp-card__role">{exp.role}</h3>
            <div className="exp-card__org">{exp.org}</div>
            <p className="exp-card__desc">{exp.desc}</p>

            <div className="exp-card__tags">
              {exp.tags.map((tag, j) => (
                <span key={j} className="badge">{tag}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Experience;
