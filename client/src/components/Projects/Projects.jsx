import { useState } from 'react';
import { Github, ExternalLink, Code2, Star, X } from 'lucide-react';
import './Projects.css';

const ProjectCard = ({ project, index, onClick }) => (
  <div
    className={`project-card ${project.featured ? 'project-card--featured' : ''}`}
    data-aos="fade-up"
    data-aos-delay={index * 80}
    onClick={() => onClick(project)}
    style={{ cursor: 'pointer' }}
  >
    <div className="project-card__image">
      {project.image ? (
        <img src={project.image} alt={project.title} loading="lazy" />
      ) : (
        <div className="project-card__placeholder">
          <Code2 size={40} />
        </div>
      )}
      {project.featured && (
        <span className="project-card__featured-badge">
          <Star size={11} fill="currentColor" /> Featured
        </span>
      )}
      <div className="project-card__overlay">
        <span className="overlay__view-text">Click to view details</span>
      </div>
    </div>

    <div className="project-card__body">
      <h3 className="project-card__title">{project.title}</h3>
      <p className="project-card__desc" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{project.description}</p>

      <div className="project-card__tags">
        {(project.techStack || []).slice(0, 3).map((tech, i) => (
          <span key={i} className="badge">{tech}</span>
        ))}
        {(project.techStack?.length > 3) && <span className="badge">+{project.techStack.length - 3}</span>}
      </div>
    </div>
  </div>
);

const Projects = ({ projects, loading }) => {
  const [selectedProject, setSelectedProject] = useState(null);

  const closeModal = () => setSelectedProject(null);

  return (
    <section id="projects" className="section projects">
      <div className="container">
        <div className="section-header" data-aos="fade-up">
          <div className="section-tag">My Work</div>
          <h2 className="section-title">Featured <span>Projects</span></h2>
          <div className="divider"></div>
          <p className="section-subtitle">Production-grade applications built with modern full-stack technologies</p>
        </div>

        {loading ? (
          <div className="spinner"></div>
        ) : projects.length > 0 ? (
          <div className="projects__grid">
            {projects.map((project, i) => (
              <ProjectCard key={project._id} project={project} index={i} onClick={setSelectedProject} />
            ))}
          </div>
        ) : (
          <div className="empty-state" data-aos="fade-up">
            <Code2 size={48} className="empty-state__icon" />
            <p>Projects are being curated. Stay tuned!</p>
          </div>
        )}

        {projects.length > 0 && (
          <div className="projects__cta" data-aos="fade-up">
            <a href="https://github.com/jofrashiva" target="_blank" rel="noreferrer" className="btn btn-outline">
              <Github size={18} /> View All on GitHub
            </a>
          </div>
        )}
      </div>

      {selectedProject && (
        <div className="project-modal-overlay" onClick={closeModal}>
          <div className="project-modal" onClick={e => e.stopPropagation()}>
            <button className="project-modal-close" onClick={closeModal}>
              <X size={24} />
            </button>
            <div className="project-modal-content">
              {selectedProject.image ? (
                <img src={selectedProject.image} alt={selectedProject.title} className="project-modal-img" />
              ) : (
                <div className="project-modal-placeholder"><Code2 size={40} /></div>
              )}
              <div className="project-modal-details">
                <h3>{selectedProject.title}</h3>
                <div className="project-modal-tags">
                  {(selectedProject.techStack || []).map((tech, i) => (
                    <span key={i} className="badge badge--modal">{tech}</span>
                  ))}
                </div>
                <p className="project-modal-desc">{selectedProject.description}</p>
                
                <div className="project-modal-links">
                  {selectedProject.githubLink && (
                    <a href={selectedProject.githubLink} target="_blank" rel="noreferrer" className="btn btn-outline" title="View Code">
                      <Github size={18} /> Code
                    </a>
                  )}
                  {selectedProject.liveLink && (
                    <a href={selectedProject.liveLink} target="_blank" rel="noreferrer" className="btn btn-primary" title="Live Demo">
                      <ExternalLink size={18} /> Live Demo
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Projects;
