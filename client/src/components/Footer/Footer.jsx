import { Github, Linkedin, Instagram, Heart, Code2, ArrowUp, MapPin, Mail } from 'lucide-react';
import logoImg from '../../assets/logo.png';
import './Footer.css';

const Footer = ({ info }) => {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="footer">
      <div className="footer__glow"></div>
      <div className="container">
        <div className="footer__top">
          {/* Brand */}
          <div className="footer__brand-col">
            <div className="footer__brand-card">
              <div className="footer__brand">
                <img src={logoImg} alt="Logo" style={{ width: 24, height: 24, objectFit: 'contain' }} />
                <span>{info?.name || 'Sivaprakash'}</span>
              </div>
              <p className="footer__tagline">
                {info?.tagline || 'Full Stack Developer — building elegant, scalable web experiences.'}
              </p>
              <div className="footer__contact-info">
                {info?.email && (
                  <a href={`mailto:${info.email}`} className="footer__contact-link">
                    <Mail size={14} /> {info.email}
                  </a>
                )}
                {info?.location && (
                  <span className="footer__contact-link">
                    <MapPin size={14} /> {info.location}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer__links-col">
            <h4>Quick Links</h4>
            <ul>
              {['Home', 'About', 'Skills', 'Projects', 'Contact'].map((label) => (
                <li key={label}>
                  <a
                    href={`#${label.toLowerCase()}`}
                    onClick={(e) => { e.preventDefault(); document.querySelector(`#${label.toLowerCase()}`)?.scrollIntoView({ behavior: 'smooth' }); }}
                    className="footer__nav-link"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div className="footer__social-col">
            <h4>Connect</h4>
            <div className="footer__socials">
              {info?.github && (
                <a href={info.github} target="_blank" rel="noreferrer" className="footer__social-btn">
                  <Github size={16} /> <span>GitHub</span>
                </a>
              )}
              {info?.linkedin && (
                <a href={info.linkedin} target="_blank" rel="noreferrer" className="footer__social-btn">
                  <Linkedin size={16} /> <span>LinkedIn</span>
                </a>
              )}
              {info?.twitter && (
                <a href={info.twitter} target="_blank" rel="noreferrer" className="footer__social-btn">
                  <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>𝕏</span> <span>X (Twitter)</span>
                </a>
              )}
              {info?.leetcode && (
                <a href={info.leetcode} target="_blank" rel="noreferrer" className="footer__social-btn">
                  <Code2 size={16} /> <span>LeetCode</span>
                </a>
              )}
              {info?.instagram && (
                <a href={info.instagram} target="_blank" rel="noreferrer" className="footer__social-btn">
                  <span style={{ fontSize: '0.8rem', fontWeight: 700 }}>IG</span> <span>Instagram</span>
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="footer__divider"></div>

        <div className="footer__bottom">
          <p>© {new Date().getFullYear()} {info?.name || 'Sivaprakash M'}. All rights reserved.</p>
          <button className="scroll-top-btn" onClick={scrollTop} title="Back to top">
            <ArrowUp size={16} />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
