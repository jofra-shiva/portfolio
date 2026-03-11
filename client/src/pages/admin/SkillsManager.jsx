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
    <div style={{ maxWidth: 800 }}>
      <div className="manager-header">
        <h2>Skills</h2>
        <button className="btn btn-primary btn-sm" onClick={() => setShowModal(true)}><Plus size={16} /> Add Skill</button>
      </div>

      <div className="projects-table-wrapper card">
        <table className="admin-table">
          <thead>
            <tr><th>Skill</th><th>Category</th><th>Level</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {skills.map((s) => (
              <tr key={s._id}>
                <td style={{ fontWeight: 600 }}>{s.name}</td>
                <td><span className="badge">{s.category}</span></td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div style={{ flex: 1, height: 6, background: 'var(--border)', borderRadius: 999 }}>
                      <div style={{ width: `${s.level}%`, height: '100%', background: 'var(--gradient-primary)', borderRadius: 999 }} />
                    </div>
                    <span style={{ fontSize: '0.8rem', color: 'var(--primary)', fontFamily: 'var(--font-mono)', minWidth: 35 }}>{s.level}%</span>
                  </div>
                </td>
                <td>
                  <div className="table-actions">
                    <button className="icon-btn" onClick={() => { setForm({ name: s.name, category: s.category, level: s.level }); setEditId(s._id); setShowModal(true); }}><Pencil size={15} /></button>
                    <button className="icon-btn btn-danger" onClick={() => handleDelete(s._id)}><Trash2 size={15} /></button>
                  </div>
                </td>
              </tr>
            ))}
            {skills.length === 0 && <tr><td colSpan="4" style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '2rem' }}>No skills found.</td></tr>}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal card" style={{ maxWidth: 420 }} onClick={(e) => e.stopPropagation()}>
            <div className="modal__header">
              <h3>{editId ? 'Edit Skill' : 'Add Skill'}</h3>
              <button className="icon-btn" onClick={closeModal}><X size={18} /></button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Skill Name *</label>
                <input className="form-input" name="name" value={form.name} onChange={handleChange} required placeholder="e.g. React.js" />
              </div>
              <div className="form-group">
                <label className="form-label">Category</label>
                <select className="form-input" name="category" value={form.category} onChange={handleChange}>
                  {categories.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Proficiency Level: {form.level}%</label>
                <input type="range" min="0" max="100" name="level" value={form.level} onChange={handleChange} style={{ width: '100%', accentColor: 'var(--primary)' }} />
              </div>
              <div className="modal__actions">
                <button type="button" className="btn btn-outline" onClick={closeModal}>Cancel</button>
                <button type="submit" className="btn btn-primary">{editId ? 'Update' : 'Add Skill'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SkillsManager;
