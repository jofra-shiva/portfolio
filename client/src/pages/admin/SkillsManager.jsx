import { useState, useEffect } from 'react';
import { getSkills, createSkill, updateSkill, deleteSkill } from '../../api';
import toast from 'react-hot-toast';
import { Plus, Pencil, Trash2, X } from 'lucide-react';

const defaultForm = { name: '', category: 'frontend', level: 80 };

const SkillsManager = () => {
  const [skills, setSkills] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(defaultForm);
  const [editId, setEditId] = useState(null);

  const fetchSkills = async () => {
    try { const res = await getSkills(); setSkills(res.data); }
    catch { toast.error('Failed to load skills'); }
  };

  useEffect(() => { fetchSkills(); }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await updateSkill(editId, form); toast.success('Skill updated!');
      } else {
        await createSkill(form); toast.success('Skill added!');
      }
      fetchSkills(); closeModal();
    } catch { toast.error('Error saving skill'); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete skill?')) return;
    try { await deleteSkill(id); toast.success('Deleted!'); fetchSkills(); }
    catch { toast.error('Delete failed'); }
  };

  const closeModal = () => { setShowModal(false); setForm(defaultForm); setEditId(null); };

  const categories = ['frontend', 'backend', 'database', 'tools', 'other'];

  return (
    <div className="admin-page-container">
      <div className="manager-header">
        <h2>Skills Repository</h2>
        <button className="btn btn-primary btn-sm" onClick={() => setShowModal(true)}>
          <Plus size={16} /> Add New Skill
        </button>
      </div>

      <div className="admin-card-wrapper">
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Skill Name</th>
                <th>Category</th>
                <th>Mastery Level</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {skills.map((s) => (
                <tr key={s._id}>
                  <td style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{s.name}</td>
                  <td>
                    <span className="status-indicator status-indicator--primary">
                      {s.category}
                    </span>
                  </td>
                  <td>
                    <div className="table-skill-progress">
                      <div className="skill-progress-bar">
                        <div 
                          className="skill-progress-fill" 
                          style={{ width: `${s.level}%` }} 
                        />
                      </div>
                      <span className="skill-level-text">{s.level}%</span>
                    </div>
                  </td>
                  <td>
                    <div className="table-actions">
                      <button 
                        className="icon-btn" 
                        onClick={() => { setForm({ name: s.name, category: s.category, level: s.level }); setEditId(s._id); setShowModal(true); }}
                        title="Edit"
                      >
                        <Pencil size={15} />
                      </button>
                      <button 
                        className="icon-btn" 
                        style={{ color: 'var(--danger)' }}
                        onClick={() => handleDelete(s._id)}
                        title="Delete"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {skills.length === 0 && (
                <tr>
                  <td colSpan="4" className="empty-table-row">
                    No skills found. Start by adding one!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="project-modal-overlay" onClick={closeModal}>
          <div className="project-modal glass" style={{ maxWidth: 500 }} onClick={(e) => e.stopPropagation()}>
            <div className="project-modal-details">
              <h3>{editId ? 'Edit Skill' : 'Add New Skill'}</h3>
              
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div className="admin-form-group">
                  <label className="admin-label">Skill Title</label>
                  <input className="form-input" name="name" value={form.name} onChange={handleChange} required placeholder="e.g. React.js" />
                </div>
                
                <div className="modal-form-grid">
                  <div className="admin-form-group">
                    <label className="admin-label">Category</label>
                    <select className="form-input" name="category" value={form.category} onChange={handleChange}>
                      {categories.map((c) => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div className="admin-form-group">
                    <label className="admin-label">Mastery: {form.level}%</label>
                    <input type="range" min="0" max="100" name="level" value={form.level} onChange={handleChange} className="form-range" />
                  </div>
                </div>

                <div className="project-modal-links" style={{ justifyContent: 'flex-end' }}>
                  <button type="button" className="btn btn-outline" onClick={closeModal}>Cancel</button>
                  <button type="submit" className="btn btn-primary">{editId ? 'Save Changes' : 'Add Skill'}</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SkillsManager;
