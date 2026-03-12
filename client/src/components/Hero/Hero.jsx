import { useEffect, useRef } from 'react';
import Typed from 'typed.js';
import { Github, Linkedin, Mail, ArrowDown, ExternalLink } from 'lucide-react';
import ParticleBackground from '../ParticleBackground/ParticleBackground';
import profileImg from '../../assets/jofra.jpeg';
import './Hero.css';

const Hero = ({ info, projects }) => {
  const typedRef = useRef(null);

  useEffect(() => {
    const strings = info?.typingTexts?.length
      ? info.typingTexts
      : ['Full Stack Developer', 'MERN Specialist', 'Problem Solver', 'Tech Enthusiast'];

    const typed = new Typed(typedRef.current, {
      strings,
      typeSpeed: 55,
      backSpeed: 35,
      backDelay: 2200,
      loop: true,
      cursorChar: '|',
    });
    return () => typed.destroy();
  }, [info]);

  return (
    <section id="home" className="hero">
      <ParticleBackground />
      <div className="container hero__content">

        {/* ---- Left: Text ---- */}
        <div className="hero__text">
          <div className="hero__eyebrow" data-aos="fade-down">
            <span className="eyebrow-dot"></span>
            Available for Opportunities
          </div>

          <h1 className="hero__name" data-aos="fade-up">
            {info?.name || 'Sivaprakash M'}
          </h1>

          <div className="hero__typed-wrapper" data-aos="fade-up" data-aos-delay="100">
            <span className="hero__typed-prefix">I'm a</span>
            <span className="hero__typed" ref={typedRef}></span>
          </div>

          <p className="hero__bio" data-aos="fade-up" data-aos-delay="200">
            {info?.bio || "Expert in MERN stack development, crafting scalable web solutions with modern architecture and premium user interfaces."}
          </p>

          {/* Stats */}
          <div className="hero__stats" data-aos="fade-up" data-aos-delay="300">
            <div className="hero__stat card">
              <span className="hero__stat-value">{projects?.length > 0 ? `${projects.length}+` : (info?.projectsCount || '0')}</span>
              <span className="hero__stat-label">Projects</span>
            </div>
            <div className="hero__stat card">
              <span className="hero__stat-value">{info?.degree || 'MCA'}</span>
              <span className="hero__stat-label">Pursuing</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="hero__cta" data-aos="fade-up" data-aos-delay="400">
            <a href="#projects" className="btn btn-primary" onClick={(e) => { e.preventDefault(); document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' }); }}>
              <ExternalLink size={16} />
              View My Work
            </a>
            <a href="#contact" className="btn btn-outline" onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }}>
              <Mail size={16} />
              Hire Me
            </a>
          </div>

          {/* Socials */}
          <div className="hero__socials" data-aos="fade-up" data-aos-delay="500">
            {info?.github && (
              <a href={info.github} target="_blank" rel="noreferrer" className="social-icon" title="GitHub">
                <Github size={18} />
              </a>
            )}
            {info?.linkedin && (
              <a href={info.linkedin} target="_blank" rel="noreferrer" className="social-icon" title="LinkedIn">
                <Linkedin size={18} />
              </a>
            )}
            {info?.twitter && (
              <a href={info.twitter} target="_blank" rel="noreferrer" className="social-icon" title="X (Twitter)">
                <span style={{ fontSize: '1rem', fontWeight: 600 }}>𝕏</span>
              </a>
            )}
            {info?.leetcode && (
              <a href={info.leetcode} target="_blank" rel="noreferrer" className="social-icon" title="LeetCode">
                <Code2 size={18} />
              </a>
            )}
            {info?.instagram && (
              <a href={info.instagram} target="_blank" rel="noreferrer" className="social-icon" title="Instagram">
                <span style={{ fontSize: '1rem' }}>IG</span>
              </a>
            )}
            <a href={`mailto:${info?.email || 'jofrashiva04@gmail.com'}`} className="social-icon" title="Email">
              <Mail size={18} />
            </a>
            <div className="hero__socials-divider"></div>
            <span className="hero__available">🟢 Open to work</span>
          </div>
        </div>

        {/* ---- Right: Profile Card ---- */}
        <div className="hero__visual" data-aos="zoom-in" data-aos-delay="200">
          <div className="hero__profile-card">
            <div className="hero__avatar">
              <img src={profileImg} alt="Sivaprakash" className="avatar-img" />
            </div>

            <div className="hero__profile-name">{info?.name || 'Sivaprakash M'}</div>
            <div className="hero__profile-title">Full Stack Developer</div>
            <div className="hero__profile-divider"></div>

            <div className="hero__profile-stats">
              <div className="profile-stat">
                <div className="profile-stat__value">{info?.projectsCount || '0'}</div>
                <div className="profile-stat__label">Projects</div>
              </div>
              <div className="profile-stat">
                <div className="profile-stat__value">{info?.degree || 'MCA'}</div>
                <div className="profile-stat__label">Degree</div>
              </div>
            </div>
            <div className="hero__profile-divider"></div>

            <div className="hero__tech-chips">
              {['MongoDB', 'Express', 'React', 'Node.js', 'REST API', 'Git'].map((t) => (
                <span key={t} className="tech-chip">{t}</span>
              ))}
            </div>
          </div>

          {/* Floating tech bubbles */}
          <div className="hero__floating-cards">
            <div className="float-card float-card--tl animate-float">
              <span className="float-card__icon">⚛️</span><span>React.js</span>
            </div>
            <div className="float-card float-card--tr animate-float" style={{ animationDelay: '1.2s' }}>
              <span className="float-card__icon">🌿</span><span>MongoDB</span>
            </div>
            <div className="float-card float-card--bl animate-float" style={{ animationDelay: '2.4s' }}>
              <span className="float-card__icon">🚀</span><span>Node.js</span>
            </div>
            <div className="float-card float-card--br animate-float" style={{ animationDelay: '0.6s' }}>
              <span className="float-card__icon">⚡</span><span>REST API</span>
            </div>
          </div>
        </div>
      </div>

      <a href="#about" className="hero__scroll-indicator" onClick={(e) => { e.preventDefault(); document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' }); }}>
        <div className="scroll-line"></div>
        <ArrowDown size={15} />
        SCROLL
      </a>
    </section>
  );
};

export default Hero;
