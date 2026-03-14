import './Skills.css';

const categoryConfig = {
  frontend: { label: 'Frontend', color: '#7c3aed', bg: 'rgba(124,58,237,0.12)' },
  backend:  { label: 'Backend',  color: '#0ea5e9', bg: 'rgba(14,165,233,0.12)' },
  database: { label: 'Database', color: '#10b981', bg: 'rgba(16,185,129,0.12)' },
  tools:    { label: 'Tools & DevOps', color: '#00d2ff', bg: 'rgba(0,210,255,0.12)' },
  other:    { label: 'Other',    color: '#8b5cf6', bg: 'rgba(139,92,246,0.12)' },
};

const SkillBadge = ({ skill }) => {
  const cfg = categoryConfig[skill.category] || categoryConfig.other;
  
  const getLevelLabel = (level) => {
    if (level >= 90) return 'Expert';
    if (level >= 75) return 'Advanced';
    if (level >= 60) return 'Proficient';
    return 'Intermediate';
  };

  return (
    <div className="skill-item" data-aos="fade-up">
      <div className="skill-item__badge-wrap">
        <span className="skill-item__name">{skill.name}</span>
        <span className="skill-badge" style={{ background: cfg.bg, color: cfg.color, border: `1px solid ${cfg.color}33` }}>
          {getLevelLabel(skill.level)}
        </span>
      </div>
    </div>
  );
};

const defaultTechList = ['Git', 'Postman', 'VS Code', 'REST API', 'JWT'];

const Skills = ({ skills }) => {
  const grouped = skills.reduce((acc, skill) => {
    const cat = skill.category || 'other';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(skill);
    return acc;
  }, {});

  return (
    <section id="skills" className="section skills">
      <div className="container">
        <div className="section-header" data-aos="fade-up">
          <div className="section-tag">Tech Stack</div>
          <h2 className="section-title">My <span>Skills</span></h2>
          <div className="divider"></div>
          <p className="section-subtitle">Technologies I use to build modern, scalable applications</p>
        </div>

        {Object.keys(grouped).length > 0 ? (
          <div className="skills__grid">
            {Object.entries(grouped).map(([cat, catSkills], i) => {
              const cfg = categoryConfig[cat] || categoryConfig.other;
              return (
                <div key={cat} className="skills__category-card card" data-aos="fade-up" data-aos-delay={i * 100}>
                  <div className="skills__category-header">
                    <div className="category-icon" style={{ background: cfg.bg, color: cfg.color }}>
                      <span className="category-dot" style={{ background: cfg.color }}></span>
                      {cfg.label}
                    </div>
                  </div>
                  <div className="skills__list">
                    {catSkills.map((skill, j) => (
                      <SkillBadge key={j} skill={skill} />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="empty-state" data-aos="fade-up">
             <p>Skills are being updated. Check back soon!</p>
          </div>
        )}

        {/* Tech pill cloud */}
        <div className="skills__tech-cloud" data-aos="fade-up">
          <p className="skills__cloud-label">Ecosystem & Tools</p>
          <div className="skills__cloud-pills">
            {defaultTechList.map((tech) => (
              <div key={tech} className="tech-logo-pill card">{tech}</div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
