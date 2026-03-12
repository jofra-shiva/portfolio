import { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Code2, LayoutDashboard, FolderKanban, Star, LogOut, Menu, X, MessageSquare, User, ExternalLink, Trophy } from 'lucide-react';
import logoImg from '../../assets/logo.png';
import './AdminLayout.css';
import './AdminCommon.css';

const navItems = [
  { path: '/admin/dashboard', label: 'Dashboard', icon: <LayoutDashboard size={18} /> },
  { path: '/admin/projects', label: 'Projects', icon: <FolderKanban size={18} /> },
  { path: '/admin/skills', label: 'Skills', icon: <Star size={18} /> },
  { path: '/admin/messages', label: 'Messages', icon: <MessageSquare size={18} /> },
  { path: '/admin/portfolio', label: 'Resume Info', icon: <User size={18} /> },
  { path: '/admin/achievements', label: 'Achievements', icon: <Trophy size={18} /> },
];

const AdminLayout = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleLogout = () => {
    logout();
    navigate('/admin');
  };

  return (
    <div className={`admin-layout ${sidebarOpen ? '' : 'sidebar-collapsed'}`}>
      <aside className="admin-sidebar glass">
        <div className="sidebar__header">
          <div className="sidebar__brand">
            <img src={logoImg} alt="Logo" style={{ width: 28, height: 28, objectFit: 'contain' }} />
            {sidebarOpen && <span style={{ textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 800 }}>SHIVA</span>}
          </div>
          <button className="icon-btn sidebar__toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        <nav className="sidebar__nav">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`sidebar__link ${location.pathname === item.path ? 'active' : ''}`}
            >
              <div className="sidebar__link-icon">{item.icon}</div>
              {sidebarOpen && <span>{item.label}</span>}
            </Link>
          ))}
        </nav>

        <div className="sidebar__footer">
          <div className="sidebar__user">
            <div className="sidebar__avatar">{user?.name?.[0] || 'S'}</div>
            {sidebarOpen && (
              <div className="sidebar__user-info">
                <span className="sidebar__user-name">{user?.name || 'SHIVA'}</span>
                <span className="sidebar__user-role">Lead Architect</span>
              </div>
            )}
          </div>
          <button className="sidebar__logout icon-btn" onClick={handleLogout} title="Logout">
            <LogOut size={18} />
          </button>
        </div>
      </aside>

      <main className="admin-main">
        <div className="admin-topbar">
          <div className="admin-topbar__title">
            {navItems.find((n) => n.path === location.pathname)?.label || 'Admin'}
          </div>
          <a href="/" className="btn btn-outline btn-sm" target="_blank" rel="noreferrer">View Portfolio</a>
        </div>
        <div className="admin-content">
          <div className="admin-page-container">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
