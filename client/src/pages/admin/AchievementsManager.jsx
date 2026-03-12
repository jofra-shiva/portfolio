import { useState, useEffect } from 'react';
import { getAchievements, createAchievement, updateAchievement, deleteAchievement } from '../../api';
import toast from 'react-hot-toast';
import { Plus, Pencil, Trash2, X, Award, ExternalLink, Calendar } from 'lucide-react';

const defaultForm = { title: '', description: '', date: '', organization: '', link: '', icon: 'Award' };

const AchievementsManager = () => {
  const [achievements, setAchievements] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(defaultForm);
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchAchievements = async () => {
    try {
      const res = await getAchievements();
      setAchievements(res.data);
    } catch {
      toast.error('Failed to load achievements');
    }
  };

  useEffect(() => {
    fetchAchievements();
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editId) {
        await updateAchievement(editId, form);
        toast.success('Achievement updated!');
      } else {
        await createAchievement(form);
        toast.success('Achievement added!');
      }
      fetchAchievements();
      closeModal();
    } catch {
      toast.error('Error saving achievement');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this achievement?')) return;
    try {
      await deleteAchievement(id);
      toast.success('Deleted!');
      fetchAchievements();
    } catch {
      toast.error('Delete failed');
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setForm(defaultForm);
    setEditId(null);
  };

  return (
    <div className="admin-page-container">
      <div className="manager-header">
        <h2>Honor & Recognition</h2>
        <button className="btn btn-primary btn-sm" onClick={() => setShowModal(true)}>
          <Plus size={16} /> Add Achievement
        </button>
      </div>

      <div className="admin-card-wrapper">
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Achievement</th>
                <th>Organization</th>
                <th>Timeline</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {achievements.map((a) => (
                <tr key={a._id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <div className="status-indicator status-indicator--primary" style={{ padding: '0.5rem', borderRadius: '10px' }}>
                        <Award size={18} />
                      </div>
                      <div>
                        <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{a.title}</div>
                        {a.link && (
                          <a href={a.link} target="_blank" rel="noreferrer" style={{ fontSize: '0.75rem', color: 'var(--primary-light)', display: 'flex', alignItems: 'center', gap: '0.25rem', marginTop: '0.2rem' }}>
                            View Certificate <ExternalLink size={10} />
                          </a>
                        )}
                      </div>
                    </div>
                  </td>
                  <td>
                    <span style={{ fontWeight: 600, color: 'var(--text-secondary)' }}>{a.organization || '—'}</span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                      <Calendar size={14} /> {a.date || '—'}
                    </div>
                  </td>
                  <td>
                    <div className="table-actions">
                      <button 
                        className="icon-btn" 
                        onClick={() => { setForm({ ...a }); setEditId(a._id); setShowModal(true); }}
                        title="Edit"
                      >
                        <Pencil size={15} />
                      </button>
                      <button 
                        className="icon-btn" 
                        style={{ color: 'var(--danger)' }}
                        onClick={() => handleDelete(a._id)}
                        title="Delete"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {achievements.length === 0 && (
                <tr>
                  <td colSpan="4" className="empty-table-row">
                    No achievements documented yet. Time to brag a little!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="project-modal-overlay" onClick={closeModal}>
          <div className="project-modal glass" style={{ maxWidth: 600 }} onClick={(e) => e.stopPropagation()}>
            <div className="project-modal-details">
              <h3>{editId ? 'Edit Achievement' : 'Document Achievement'}</h3>
              
              <form onSubmit={handleSubmit} className="modal-form-grid" style={{ marginTop: '1.5rem' }}>
                <div className="admin-form-group" style={{ gridColumn: 'span 2' }}>
                  <label className="admin-label">Achievement Title *</label>
                  <input className="form-input" name="title" value={form.title} onChange={handleChange} required placeholder="e.g. Best Developer Award 2024" />
                </div>
                
                <div className="admin-form-group">
                  <label className="admin-label">Issuing Organization</label>
                  <input className="form-input" name="organization" value={form.organization} onChange={handleChange} placeholder="e.g. Google, University, etc." />
                </div>

                <div className="admin-form-group">
                  <label className="admin-label">Date Received</label>
                  <input className="form-input" name="date" value={form.date} onChange={handleChange} placeholder="e.g. Oct 2024" />
                </div>

                <div className="admin-form-group" style={{ gridColumn: 'span 2' }}>
                  <label className="admin-label">Brief Description *</label>
                  <textarea className="form-input" name="description" rows={3} value={form.description} onChange={handleChange} required placeholder="What was this achievement for?" />
                </div>

                <div className="admin-form-group" style={{ gridColumn: 'span 2' }}>
                  <label className="admin-label">Verification Link (Certificate URL)</label>
                  <input className="form-input" name="link" value={form.link} onChange={handleChange} placeholder="https://verify.com/..." />
                </div>

                <div className="project-modal-links" style={{ gridColumn: 'span 2', justifyContent: 'flex-end', marginTop: '1rem' }}>
                  <button type="button" className="btn btn-outline" onClick={closeModal}>Cancel</button>
                  <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? 'Processing...' : editId ? 'Save Changes' : 'Record Achievement'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AchievementsManager;
