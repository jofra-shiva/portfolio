import { useState, useEffect } from 'react';
import { getVisitorStats } from '../../api';
import { Users, Eye, Monitor, Smartphone, Tablet, Calendar, ArrowUpRight } from 'lucide-react';
import './AdminCommon.css';

const Analytics = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getVisitorStats()
      .then(res => {
        setStats(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="admin-loading">Initializing analytics...</div>;
  if (!stats) return <div className="admin-error">Failed to load analytics data.</div>;

  return (
    <div className="admin-page-container">
      <div className="manager-header">
        <div>
          <h2>Audience Intelligence</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.35rem' }}>
            Tracking how the world interacts with your portfolio.
          </p>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card card">
          <div className="stat-card__icon" style={{ background: 'rgba(16, 185, 129, 0.1)' }}>
            <Eye size={24} color="#10b981" />
          </div>
          <div className="stat-card__info">
            <div className="stat-card__value">{stats.totalViews}</div>
            <div className="stat-card__label">Total Website Views</div>
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
      </div>

      <div className="analytics-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginTop: '2.5rem' }}>
        {/* Device Breakdown */}
        <div className="admin-card-wrapper" style={{ padding: '2rem' }}>
          <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Monitor size={20} /> Device Ecosystem
          </h3>
          <div className="device-list">
            {stats.deviceBreakdown.map(device => (
              <div key={device._id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid var(--border)' }}>
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

        {/* Recent Traffic */}
        <div className="admin-card-wrapper" style={{ padding: '2rem' }}>
          <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Calendar size={20} /> Recent Traffic (Last 30 Days)
          </h3>
          <div className="history-list" style={{ maxHeight: '300px', overflowY: 'auto' }}>
            {stats.history.length === 0 ? (
              <p style={{ color: 'var(--text-muted)' }}>No recent traffic data available.</p>
            ) : (
              stats.history.reverse().map(day => (
                <div key={day._id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid var(--border)' }}>
                  <span style={{ fontSize: '0.9rem' }}>{new Date(day._id).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontWeight: 600 }}>{day.views}</span>
                    <ArrowUpRight size={14} color="#10b981" />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
