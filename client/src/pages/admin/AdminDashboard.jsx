import { useState, useEffect } from 'react';
import { getProjects, getSkills, getMessages } from '../../api';
import { FolderKanban, Star, MessageSquare, TrendingUp, Plus, Eye } from 'lucide-react';
import './AdminDashboard.css';

const StatCard = ({ icon, label, value, color }) => (
  <div className="stat-card card">
    <div className="stat-card__icon" style={{ background: color }}>
      {icon}
    </div>
    <div className="stat-card__info">
      <div className="stat-card__value">{value}</div>
      <div className="stat-card__label">{label}</div>
    </div>
  </div>
);

const AdminDashboard = () => {
  const [stats, setStats] = useState({ projects: 0, skills: 0, messages: 0, unread: 0 });

  useEffect(() => {
    Promise.all([getProjects(), getSkills(), getMessages()])
      .then(([p, s, m]) => {
        setStats({
          projects: p.data.length,
          skills: s.data.length,
          messages: m.data.length,
          unread: m.data.filter((msg) => !msg.read).length,
        });
      })
      .catch(console.error);
  }, []);

  return (
    <div className="admin-page-container">
      <div className="manager-header">
        <div>
          <h2>System Intelligence</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.35rem' }}>Overview of your digital ecosystem performance.</p>
        </div>
      </div>

      <div className="stats-grid">
        <StatCard 
          icon={<FolderKanban size={24} />} 
          label="Portfolio Projects" 
          value={stats.projects} 
          color="rgba(124, 58, 237, 0.15)" 
        />
        <StatCard 
          icon={<Star size={24} />} 
          label="Technical Arsenal" 
          value={stats.skills} 
          color="rgba(14, 165, 233, 0.15)" 
        />
        <StatCard 
          icon={<MessageSquare size={24} />} 
          label="Global Inquiries" 
          value={stats.messages} 
          color="rgba(16, 185, 129, 0.15)" 
        />
        <StatCard 
          icon={<TrendingUp size={24} />} 
          label="Pending Responses" 
          value={stats.unread} 
          color="rgba(249, 115, 22, 0.15)" 
        />
      </div>

      <div className="admin-card-wrapper" style={{ marginTop: '2.5rem', padding: '2.5rem' }}>
        <h3 style={{ marginBottom: '1.75rem', fontFamily: 'var(--font-display)', fontWeight: 700 }}>Critical Shortcuts</h3>
        <div className="quick-actions">
          <a href="/admin/projects" className="action-card glass">
            <div className="action-card__icon"><Plus size={20} /></div>
            <h4>Gallery Manager</h4>
            <p>Maintain your showcase projects</p>
          </a>
          <a href="/admin/skills" className="action-card glass">
            <div className="action-card__icon"><Star size={20} /></div>
            <h4>Arsenal Update</h4>
            <p>Evolve your technical capabilities</p>
          </a>
          <a href="/admin/messages" className="action-card glass">
            <div className="action-card__icon"><MessageSquare size={20} /></div>
            <h4>Inquiry Intel</h4>
            <p>Analyze incoming communications</p>
          </a>
          <a href="/" target="_blank" rel="noreferrer" className="action-card glass">
            <div className="action-card__icon"><Eye size={20} /></div>
            <h4>Live Pulse</h4>
            <p>Monitor production interface</p>
          </a>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
