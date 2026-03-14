import { useState, useEffect } from 'react';
import { getProjects, getSkills, getMessages, getAchievements, getVisitorStats } from '../../api';
import { FolderKanban, Star, MessageSquare, TrendingUp, Plus, Eye, Trophy, Users } from 'lucide-react';
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
  const [stats, setStats] = useState({ projects: 0, skills: 0, messages: 0, unread: 0, achievements: 0 });

  useEffect(() => {
    Promise.all([getProjects(), getSkills(), getMessages(), getAchievements()])
      .then(([p, s, m, a]) => {
        setStats({
          projects: p.data.length,
          skills: s.data.length,
          messages: m.data.length,
          unread: m.data.filter((msg) => !msg.read).length,
          achievements: a.data.length,
          visits: 0
        });
        
        getVisitorStats().then(v => {
          setStats(prev => ({ ...prev, visits: v.data.totalViews }));
        }).catch(console.error);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="admin-page-container">
      <div className="manager-header">
        <div>
          <h2>Operational Intelligence</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.35rem' }}>Greetings, SHIVA. Reviewing your ecosystem's current state.</p>
        </div>
      </div>

      <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
        <StatCard 
          icon={<FolderKanban size={24} />} 
          label="Total Projects" 
          value={stats.projects} 
          color="rgba(124, 58, 237, 0.15)" 
        />
        <StatCard 
          icon={<Star size={24} />} 
          label="Technologies" 
          value={stats.skills} 
          color="rgba(14, 165, 233, 0.15)" 
        />
        <StatCard 
          icon={<Trophy size={24} />} 
          label="Achievements" 
          value={stats.achievements} 
          color="rgba(234, 179, 8, 0.15)" 
        />
        <StatCard 
          icon={<MessageSquare size={24} />} 
          label="Client Inquiries" 
          value={stats.messages} 
          color="rgba(16, 185, 129, 0.15)" 
        />
        <StatCard 
          icon={<TrendingUp size={24} />} 
          label="Unread" 
          value={stats.unread} 
          color="rgba(0, 210, 255, 0.15)" 
        />
        <StatCard 
          icon={<Users size={24} />} 
          label="Website Traffic" 
          value={stats.visits} 
          color="rgba(99, 102, 241, 0.15)" 
        />
      </div>

      <div className="admin-card-wrapper" style={{ marginTop: '2.5rem', padding: '2.5rem' }}>
        <h3 style={{ marginBottom: '1.75rem', fontFamily: 'var(--font-display)', fontWeight: 700 }}>Quick Operations</h3>
        <div className="quick-actions">
          <a href="/admin/projects" className="action-card glass">
            <div className="action-card__icon"><Plus size={20} /></div>
            <h4>Projects</h4>
            <p>Maintain your gallery</p>
          </a>
          <a href="/admin/skills" className="action-card glass">
            <div className="action-card__icon"><Star size={20} /></div>
            <h4>Arsenal</h4>
            <p>Evolve technical stacking</p>
          </a>
          <a href="/admin/achievements" className="action-card glass">
            <div className="action-card__icon"><Trophy size={20} /></div>
            <h4>Honors</h4>
            <p>Document recognition</p>
          </a>
          <a href="/admin/messages" className="action-card glass">
            <div className="action-card__icon"><MessageSquare size={20} /></div>
            <h4>Inbox</h4>
            <p>Lead communication</p>
          </a>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
