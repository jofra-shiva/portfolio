import { useState, useEffect } from 'react';
import { getAchievements } from '../../api';
import { Award, ExternalLink, Calendar, MapPin } from 'lucide-react';
import './Achievements.css';

const Achievements = () => {
  const [achievements, setAchievements] = useState([]);

  useEffect(() => {
    getAchievements().then(res => setAchievements(res.data)).catch(console.error);
  }, []);

  if (achievements.length === 0) return null;

  return (
    <section className="achievements section" id="achievements">
      <div className="section-header" data-aos="fade-up">
        <h2 className="section-title">Honors & Recognition</h2>
        <p className="section-subtitle">Significant milestones and professional valedictories</p>
      </div>

      <div className="container">
        <div className="achievements__grid">
          {achievements.map((achievement, index) => (
            <div 
              key={achievement._id} 
              className="achievement-card card glass"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="achievement-card__header">
                <div className="achievement-card__icon-wrap">
                  <Award className="achievement-card__icon" />
                </div>
                <div className="achievement-card__meta">
                  <span className="achievement-card__date">
                    <Calendar size={12} /> {achievement.date}
                  </span>
                </div>
              </div>

              <div className="achievement-card__content">
                <h3 className="achievement-card__title">{achievement.title}</h3>
                <div className="achievement-card__org">
                  <MapPin size={14} /> {achievement.organization}
                </div>
                <p className="achievement-card__desc">{achievement.description}</p>
              </div>

              {achievement.link && (
                <div className="achievement-card__footer">
                  <a 
                    href={achievement.link} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="achievement-card__link"
                  >
                    Verify Credentials <ExternalLink size={14} />
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Achievements;
