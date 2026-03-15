import { GraduationCap, MapPin, Mail, Code, Layers, Cpu, Briefcase, Trophy, Zap, Download } from 'lucide-react';
import './About.css';

const About = ({ info }) => {
  const whatIDo = [
    {
      icon: <Layers size={22} />,
      title: 'Full Stack Development',
      desc: 'Building complete web applications from pixel-perfect frontends to robust REST APIs using the MERN stack.',
      color: '#7c3aed',
    },
    {
      icon: <Code size={22} />,
      title: 'API Architecture',
      desc: 'Designing scalable, secure, well-documented RESTful APIs with Node.js & Express and JWT authentication.',
      color: '#0ea5e9',
    },
    {
      icon: <Cpu size={22} />,
      title: 'System Design',
      desc: 'Architecting production-grade, maintainable systems with clean MVC patterns for real-world performance.',
      color: '#00d2ff',
    },
    {
      icon: <Zap size={22} />,
      title: 'UI/UX & Responsive Design',
      desc: 'Crafting modern, mobile-first interfaces that deliver premium user experiences across all screen sizes.',
      color: '#f59e0b',
    },
  ];

  return (
    <section id="about" className="section about">
      <div className="container">
        <div className="section-header" data-aos="fade-up">
          <div className="section-tag">About Me</div>
          <h2 className="section-title">Who Am <span>I?</span></h2>
          <div className="divider"></div>
        </div>

        <div className="about__grid">
          {/* Left: Bio */}
          <div className="about__text" data-aos="fade-right">
            <div className="about__bio-card">
              <p className="about__bio">
                {info?.about || "I'm a passionate Full Stack Developer specializing in the MERN stack. I build modern, high-performance web applications and love turning complex ideas into smooth digital experiences. Driven by a goal to contribute to meaningful software projects and grow as a developer in a collaborative team environment."}
              </p>

              <div className="about__highlights">
                {[
                  { icon: <Trophy size={15} />, label: 'Education', value: 'MCA Pursuing (2025)' },
                  { icon: <MapPin size={15} />, label: 'Location', value: info?.location || 'Tamil Nadu, India' },
                  { icon: <Mail size={15} />, label: 'Email', value: info?.email || 'jofrashiva04@gmail.com' },
                ].map((item, i) => (
                  <div key={i} className="about__highlight-row">
                    <div className="about__highlight-icon">{item.icon}</div>
                    <div>
                      <div className="about__highlight-label">{item.label}</div>
                      <div className="about__highlight-value">{item.value}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="about__actions">
                <a href={info?.github || '#'} target="_blank" rel="noreferrer" className="btn btn-primary">
                  View GitHub
                </a>
                <a href="/resume.pdf" download className="btn btn-resume">
                  <Download size={16} /> Resume
                </a>
                <a href={info?.linkedin || '#'} target="_blank" rel="noreferrer" className="btn btn-outline">
                  LinkedIn
                </a>
              </div>
            </div>
          </div>

          {/* Right: Education Timeline */}
          <div className="about__right" data-aos="fade-left">
            <div className="about__timeline-card">
              <h3 className="about__section-title">
                <GraduationCap size={20} /> Education
              </h3>
              <div className="about__timeline">
                {info?.education?.length > 0 ? (
                  info.education.map((edu, i) => (
                    <div key={i} className="timeline-item" data-aos="fade-up" data-aos-delay={i * 120}>
                      <div className="timeline-item__dot"></div>
                      <div className="timeline-item__content">
                        {/* Year removed */}
                        <h4 className="timeline-item__degree">{edu.degree}</h4>
                        <p className="timeline-item__school">{edu.institution}</p>
                        {edu.grade && <div className="timeline-item__grade">Grade: {edu.grade}</div>}
                        {edu.description && <small className="timeline-item__desc">{edu.description}</small>}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="no-data-msg">Education details coming soon.</p>
                )}
              </div>

              {info?.experience?.length > 0 && (
                <div style={{ marginTop: '3rem' }}>
                  <h3 className="about__section-title">
                    <Briefcase size={20} /> Experience
                  </h3>
                  <div className="about__timeline">
                    {info.experience.map((exp, i) => (
                      <div key={i} className="timeline-item" data-aos="fade-up" data-aos-delay={i * 120}>
                        <div className="timeline-item__dot" style={{ background: 'var(--gradient-secondary)' }}></div>
                        <div className="timeline-item__content">
                          {/* Duration removed */}
                          <h4 className="timeline-item__degree">{exp.role}</h4>
                          <p className="timeline-item__school">{exp.company} {exp.location && `• ${exp.location}`}</p>
                          {exp.description && <small className="timeline-item__desc">{exp.description}</small>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* What I Do Cards */}
        <div className="about__what-i-do" data-aos="fade-up">
          <h3 className="about__section-title centered">What I Bring</h3>
          <div className="what-i-do__grid">
            {whatIDo.map((item, i) => (
              <div key={i} className="what-i-do__card card" data-aos="zoom-in" data-aos-delay={i * 100}>
                <div className="what-i-do__icon" style={{ background: `${item.color}18`, color: item.color }}>
                  {item.icon}
                </div>
                <h4>{item.title}</h4>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
