import { useState, useEffect } from 'react';
import { getProjects, getSkills, getMessages } from '../../api';
import { FolderKanban, Star, MessageSquare, TrendingUp, Plus, Eye } from 'lucide-react';
import './AdminDashboard.css';

const StatCard = ({ icon, label, value, color }) => (
  <div className="stat-card card">
    <div className="stat-card__icon" style={{ background: `${color}15`, color }}>
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
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <h2>Welcome back, Admin 👋</h2>
        <p>Monitor and manage your portfolio performance from here.</p>
      </div>

      <div className="stats-grid">
        <StatCard 
          icon={<FolderKanban size={24} />} 
          label="Total Projects" 
          value={stats.projects} 
          color="#7c3aed" 
        />
        <StatCard 
          icon={<Star size={24} />} 
          label="Skills Mastery" 
          value={stats.skills} 
          color="#0ea5e9" 
        />
        <StatCard 
          icon={<MessageSquare size={24} />} 
          label="Inquiries" 
          value={stats.messages} 
          color="#10b981" 
        />
        <StatCard 
          icon={<TrendingUp size={24} />} 
          label="Unread" 
          value={stats.unread} 
          color="#f97316" 
        />
      </div>

      <div className="dashboard-tips card">
        <h3>Quick Operations</h3>
        <div className="quick-actions">
          <a href="/admin/projects" className="action-card">
            <div className="action-card__icon"><Plus size={20} /></div>
            <h4>Manage Projects</h4>
            <p>Add, edit or remove works</p>
          </a>
          <a href="/admin/skills" className="action-card">
            <div className="action-card__icon"><Star size={20} /></div>
            <h4>Update Skills</h4>
            <p>Refine your tech stack</p>
          </a>
          <a href="/admin/messages" className="action-card">
            <div className="action-card__icon"><MessageSquare size={20} /></div>
            <h4>Check Messages</h4>
            <p>Respond to new leads</p>
          </a>
          <a href="/" target="_blank" rel="noreferrer" className="action-card">
            <div className="action-card__icon"><Eye size={20} /></div>
            <h4>Live View</h4>
            <p>See current portfolio</p>
          </a>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
