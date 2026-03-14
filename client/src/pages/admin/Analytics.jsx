import { useState, useEffect } from 'react';
import { getVisitorStats, getRecentVisitors } from '../../api';
import { Users, Eye, Monitor, Smartphone, Tablet, Calendar, ArrowUpRight, Clock, MapPin, Globe, Cpu, Hash, X, Activity } from 'lucide-react';
import './AdminCommon.css';

const Analytics = () => {
  const [stats, setStats] = useState(null);
  const [recentVisitors, setRecentVisitors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedVisitor, setSelectedVisitor] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, recentRes] = await Promise.all([
          getVisitorStats(),
          getRecentVisitors()
        ]);
        setStats(statsRes.data);
        setRecentVisitors(recentRes.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div className="admin-loading">Initializing audience intelligence systems...</div>;
  if (!stats) return <div className="admin-error">Failed to load analytics data. Intelligence systems offline.</div>;

  return (
    <div className="admin-page-container">
      <div className="manager-header">
        <div>
          <h2>Audience Intelligence</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.35rem' }}>
            Tracking how the world interacts with your digital architecture.
          </p>
        </div>
        <div className="status-indicator status-indicator--success">
          <Activity size={14} /> Systems Online
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card card">
          <div className="stat-card__icon" style={{ background: 'rgba(16, 185, 129, 0.1)' }}>
            <Eye size={24} color="#10b981" />
          </div>
          <div className="stat-card__info">
            <div className="stat-card__value">{stats.totalViews}</div>
            <div className="stat-card__label">Lifetime Views</div>
          </div>
        </div>

        <div className="stat-card card">
          <div className="stat-card__icon" style={{ background: 'rgba(14, 165, 233, 0.1)' }}>
            <Users size={24} color="#0ea5e9" />
          </div>
          <div className="stat-card__info">
            <div className="stat-card__value">{stats.uniqueVisitors}</div>
            <div className="stat-card__label">Unique Daily Visitors</div>
          </div>
        </div>

        <div className="stat-card card">
          <div className="stat-card__icon" style={{ background: 'rgba(124, 58, 237, 0.1)' }}>
            <Clock size={24} color="#7c3aed" />
          </div>
          <div className="stat-card__info">
            <div className="stat-card__value">{recentVisitors.length}</div>
            <div className="stat-card__label">Sessions Logged</div>
          </div>
        </div>
      </div>

      <div className="analytics-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem', marginTop: '2.5rem' }}>
        {/* Live Traffic Feed */}
        <div className="admin-card-wrapper" style={{ padding: '2rem', gridColumn: 'span 2' }}>
          <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Activity size={20} color="#10b981" /> Live Visitor Stream
          </h3>
          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Device / Browser</th>
                  <th>IP Fingerprint</th>
                  <th>Timestamp</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {recentVisitors.length === 0 ? (
                  <tr><td colSpan="4" style={{ textAlign: 'center', padding: '3rem' }}>No live data available.</td></tr>
                ) : (
                  recentVisitors.map(visitor => (
                    <tr key={visitor._id}>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <div style={{ padding: '8px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px' }}>
                            {visitor.deviceType === 'mobile' ? <Smartphone size={16} /> : 
                             visitor.deviceType === 'tablet' ? <Tablet size={16} /> : <Monitor size={16} />}
                          </div>
                          <div>
                            <div style={{ fontWeight: 600, textTransform: 'capitalize' }}>{visitor.browser || 'Unknown'} / {visitor.os || 'OS'}</div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{visitor.deviceType} environment</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <code style={{ background: 'rgba(124, 58, 237, 0.1)', color: 'var(--primary-light)', padding: '4px 8px', borderRadius: '4px', fontSize: '0.8rem' }}>
                          {visitor.ipHash.substring(0, 16)}...
                        </code>
                      </td>
                      <td>
                        <div style={{ fontSize: '0.85rem' }}>{new Date(visitor.timestamp).toLocaleDateString()}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{new Date(visitor.timestamp).toLocaleTimeString()}</div>
                      </td>
                      <td>
                        <button 
                          className="btn btn-primary" 
                          style={{ padding: '8px 16px', fontSize: '0.8rem' }}
                          onClick={() => setSelectedVisitor(visitor)}
                        >
                          Show A to Z
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Device Breakdown */}
        <div className="admin-card-wrapper" style={{ padding: '2rem' }}>
          <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Monitor size={20} /> Device Ecosystem
          </h3>
          <div className="device-list">
            {stats.deviceBreakdown.map(device => (
              <div key={device._id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '15px 0', borderBottom: '1px solid var(--border)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  {device._id === 'mobile' ? <Smartphone size={18} /> : 
                   device._id === 'tablet' ? <Tablet size={18} /> : <Monitor size={18} />}
                  <span style={{ textTransform: 'capitalize' }}>{device._id}</span>
                </div>
                <div style={{ fontWeight: 600 }}>{device.count} <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: 400 }}>views</span></div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Traffic History */}
        <div className="admin-card-wrapper" style={{ padding: '2rem' }}>
          <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Calendar size={20} /> Traffic History (30D)
          </h3>
          <div className="history-list" style={{ maxHeight: '350px', overflowY: 'auto' }}>
            {[...stats.history].reverse().map(day => (
              <div key={day._id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid var(--border)' }}>
                <span style={{ fontSize: '0.9rem' }}>{new Date(day._id).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontWeight: 600 }}>{day.views}</span>
                  <ArrowUpRight size={14} color="#10b981" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      {selectedVisitor && (
        <div className="modal-overlay" onClick={() => setSelectedVisitor(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '600px', width: '90%' }}>
            <div className="modal-header">
              <h3>Device Intel: A-Z Details</h3>
              <button className="close-btn" onClick={() => setSelectedVisitor(null)}><X size={20} /></button>
            </div>
            <div className="modal-body">
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                <div className="info-item">
                  <label style={{ color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    <MapPin size={12} style={{ marginRight: '5px' }} /> Path Accessed
                  </label>
                  <div style={{ fontWeight: 600, marginTop: '4px' }}>{selectedVisitor.path}</div>
                </div>
                <div className="info-item">
                  <label style={{ color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    <Hash size={12} style={{ marginRight: '5px' }} /> Session Hash
                  </label>
                  <div style={{ fontWeight: 600, marginTop: '4px', wordBreak: 'break-all', fontSize: '0.85rem' }}>{selectedVisitor.ipHash}</div>
                </div>
                <div className="info-item">
                  <label style={{ color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    <Monitor size={12} style={{ marginRight: '5px' }} /> Operating System
                  </label>
                  <div style={{ fontWeight: 600, marginTop: '4px' }}>{selectedVisitor.os || 'N/A'}</div>
                </div>
                <div className="info-item">
                  <label style={{ color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    <Globe size={12} style={{ marginRight: '5px' }} /> Browser Engine
                  </label>
                  <div style={{ fontWeight: 600, marginTop: '4px' }}>{selectedVisitor.browser || 'N/A'}</div>
                </div>
                <div className="info-item">
                  <label style={{ color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    <Cpu size={12} style={{ marginRight: '5px' }} /> Device Class
                  </label>
                  <div style={{ fontWeight: 600, marginTop: '4px', textTransform: 'capitalize' }}>{selectedVisitor.deviceType}</div>
                </div>
                <div className="info-item">
                  <label style={{ color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    <Clock size={12} style={{ marginRight: '5px' }} /> Recorded At
                  </label>
                  <div style={{ fontWeight: 600, marginTop: '4px' }}>
                    {new Date(selectedVisitor.timestamp).toLocaleString()}
                  </div>
                </div>
              </div>
              <div style={{ marginTop: '2rem' }}>
                <label style={{ color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Full User Agent String
                </label>
                <div style={{ 
                  background: 'rgba(0,0,0,0.2)', 
                  padding: '1rem', 
                  borderRadius: '8px', 
                  marginTop: '8px',
                  fontSize: '0.8rem',
                  lineHeight: '1.5',
                  fontFamily: 'monospace',
                  color: 'var(--text-secondary)',
                  border: '1px solid var(--border)'
                }}>
                  {selectedVisitor.userAgent}
                </div>
              </div>
            </div>
            <div className="modal-footer" style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end' }}>
              <button className="btn btn-outline" onClick={() => setSelectedVisitor(null)}>Close Intel</button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.8);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          animation: fadeIn 0.3s ease;
        }
        .modal-content {
          background: var(--bg-card);
          border: 1px solid var(--glass-border);
          border-radius: 1.5rem;
          padding: 2rem;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
          animation: slideUp 0.3s ease;
        }
        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
        }
        .close-btn {
          background: none;
          border: none;
          color: var(--text-muted);
          cursor: pointer;
          transition: 0.2s;
        }
        .close-btn:hover {
          color: var(--text-primary);
          transform: rotate(90deg);
        }
        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default Analytics;
