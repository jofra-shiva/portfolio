import { useState, useEffect } from 'react';
import { getProjects, createProject, updateProject, deleteProject, uploadImage } from '../../api';
import toast from 'react-hot-toast';
import { Plus, Pencil, Trash2, X, Upload, FolderKanban } from 'lucide-react';
import './ProjectsManager.css';

const defaultForm = {
  title: '', description: '', longDescription: '', image: '',
  techStack: '', githubLink: '', liveLink: '', featured: false
};

const ProjectsManager = () => {
  const [projects, setProjects] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(defaultForm);
  const [editId, setEditId] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchProjects = async () => {
    try { const res = await getProjects(); setProjects(res.data); }
    catch (e) { toast.error('Failed to load projects'); }
  };

  useEffect(() => { fetchProjects(); }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('image', file);
    setUploading(true);
    try {
      const res = await uploadImage(formData);
      setForm((f) => ({ ...f, image: res.data.url }));
      toast.success('Image uploaded!');
    } catch { toast.error('Image upload failed'); }
    finally { setUploading(false); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = { ...form, techStack: form.techStack.split(',').map((t) => t.trim()).filter(Boolean) };
    try {
      if (editId) {
        await updateProject(editId, data);
        toast.success('Project updated!');
      } else {
        await createProject(data);
        toast.success('Project created!');
      }
      fetchProjects();
      closeModal();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error saving project');
    } finally { setLoading(false); }
  };

  const handleEdit = (project) => {
    setForm({ ...project, techStack: (project.techStack || []).join(', ') });
    setEditId(project._id);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this project?')) return;
    try { await deleteProject(id); toast.success('Deleted!'); fetchProjects(); }
    catch { toast.error('Delete failed'); }
  };

  const closeModal = () => { setShowModal(false); setForm(defaultForm); setEditId(null); };

  return (
    <div className="admin-page-container">
      <div className="manager-header">
        <h2>Projects Gallery</h2>
        <button className="btn btn-primary btn-sm" onClick={() => setShowModal(true)}>
          <Plus size={16} /> Add New Project
        </button>
      </div>

      <div className="admin-card-wrapper">
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Project Details</th>
                <th>Tech Stack</th>
                <th>Visibility</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((p) => (
                <tr key={p._id}>
                  <td>
                    <div className="table-project">
                      {p.image ? (
                        <img src={p.image} alt={p.title} className="table-project__img" />
                      ) : (
                        <div className="table-project__placeholder"><FolderKanban size={18} /></div>
                      )}
                      <div>
                        <div className="table-project__title">{p.title}</div>
                        <div className="table-project__desc">{p.description.slice(0, 50)}...</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="table-tags">
                      {(p.techStack || []).slice(0, 3).map((t, i) => (
                        <span key={i} className="status-indicator status-indicator--primary" style={{ fontSize: '0.65rem' }}>{t}</span>
                      ))}
                      {p.techStack?.length > 3 && <span className="badge">+{p.techStack.length - 3}</span>}
                    </div>
                  </td>
                  <td>
                    <span className={`status-indicator ${p.featured ? 'status-indicator--success' : 'status-indicator--warning'}`}>
                      {p.featured ? '★ Featured' : 'Standard'}
                    </span>
                  </td>
                  <td>
                    <div className="table-actions">
                      <button className="icon-btn" onClick={() => handleEdit(p)} title="Edit"><Pencil size={15} /></button>
                      <button className="icon-btn" style={{ color: 'var(--danger)' }} onClick={() => handleDelete(p._id)} title="Delete"><Trash2 size={15} /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {projects.length === 0 && (
                <tr>
                  <td colSpan="4" className="empty-table-row">
                    Your portfolio is currently empty. Time to showcase some work!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="project-modal-overlay" onClick={closeModal}>
          <div className="project-modal glass" style={{ maxWidth: 800 }} onClick={(e) => e.stopPropagation()}>
            <div className="project-modal-details">
              <h3>{editId ? 'Refine Project' : 'New Creation'}</h3>
              
              <form onSubmit={handleSubmit} className="modal-form-grid" style={{ marginTop: '1.5rem' }}>
                <div className="admin-form-group">
                  <label className="admin-label">Project Title *</label>
                  <input className="form-input" name="title" value={form.title} onChange={handleChange} required placeholder="My Amazing App" />
                </div>
                
                <div className="admin-form-group">
                  <label className="admin-label">GitHub Repository</label>
                  <input className="form-input" name="githubLink" value={form.githubLink} onChange={handleChange} placeholder="https://github.com/..." />
                </div>

                <div className="form-group" style={{ gridColumn: 'span 2' }}>
                  <label className="admin-label">Elevator Pitch (Short Description) *</label>
                  <input className="form-input" name="description" value={form.description} onChange={handleChange} required placeholder="Briefly describe what this project does..." />
                </div>

                <div className="form-group" style={{ gridColumn: 'span 2' }}>
                  <label className="admin-label">Detailed Narrative (Long Description)</label>
                  <textarea className="form-input" name="longDescription" rows={4} value={form.longDescription} onChange={handleChange} placeholder="Tell the story behind this project..." />
                </div>
                
                <div className="admin-form-group">
                  <label className="admin-label">Tech Stack (comma separated)</label>
                  <input className="form-input" name="techStack" value={form.techStack} onChange={handleChange} placeholder="React, Node.js, MongoDB" />
                </div>

                <div className="admin-form-group">
                  <label className="admin-label">Live Deployment URL</label>
                  <input className="form-input" name="liveLink" value={form.liveLink} onChange={handleChange} placeholder="https://myapp.vercel.app" />
                </div>

                <div className="form-group" style={{ gridColumn: 'span 2' }}>
                  <label className="admin-label">Visual Asset (Project Image)</label>
                  <div className="upload-area" style={{ 
                    padding: '1.5rem', 
                    border: '1px dashed var(--glass-border)', 
                    borderRadius: 'var(--radius-md)',
                    background: 'rgba(255,255,255,0.02)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '1rem'
                  }}>
                    {form.image && <img src={form.image} alt="" style={{ width: '200px', height: '110px', objectFit: 'cover', borderRadius: 'var(--radius-sm)', border: '1px solid var(--glass-border)' }} />}
                    <div style={{ display: 'flex', gap: '1rem', width: '100%', alignItems: 'center' }}>
                      <label className="btn btn-outline btn-sm" style={{ cursor: 'pointer', flex: 1, justifyContent: 'center' }}>
                        <Upload size={14} /> {uploading ? 'Uploading...' : 'Upload Image'}
                        <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} />
                      </label>
                      <input className="form-input" name="image" value={form.image} onChange={handleChange} style={{ flex: 2 }} placeholder="Or paste image URL" />
                    </div>
                  </div>
                </div>

                <div className="form-group" style={{ gridColumn: 'span 2', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <input type="checkbox" id="featured" name="featured" checked={form.featured} onChange={handleChange} style={{ width: '18px', height: '18px', cursor: 'pointer', accentColor: 'var(--primary)' }} />
                  <label htmlFor="featured" className="admin-label" style={{ margin: 0, cursor: 'pointer' }}>Showcase as Featured Project</label>
                </div>

                <div className="project-modal-links" style={{ gridColumn: 'span 2', justifyContent: 'flex-end', marginTop: '1rem' }}>
                  <button type="button" className="btn btn-outline" onClick={closeModal}>Cancel</button>
                  <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? 'Processing...' : editId ? 'Save Changes' : 'Launch Project'}
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

export default ProjectsManager;
