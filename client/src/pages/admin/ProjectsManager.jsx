import { useState, useEffect } from 'react';
import { getProjects, createProject, updateProject, deleteProject, uploadImage } from '../../api';
import toast from 'react-hot-toast';
import { Plus, Pencil, Trash2, X, Upload } from 'lucide-react';
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
    <div className="projects-manager">
      <div className="manager-header">
        <h2>Projects</h2>
        <button className="btn btn-primary btn-sm" onClick={() => setShowModal(true)}>
          <Plus size={16} /> Add Project
        </button>
      </div>

      <div className="projects-table-wrapper card">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Project</th><th>Tech Stack</th><th>Featured</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((p) => (
              <tr key={p._id}>
                <td>
                  <div className="table-project">
                    {p.image && <img src={p.image} alt={p.title} className="table-project__img" />}
                    <div>
                      <div className="table-project__title">{p.title}</div>
                      <div className="table-project__desc">{p.description.slice(0, 60)}...</div>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="table-tags">
                    {(p.techStack || []).slice(0, 3).map((t, i) => <span key={i} className="badge">{t}</span>)}
                  </div>
                </td>
                <td>
                  <span className={`status-badge ${p.featured ? 'status-badge--active' : ''}`}>
                    {p.featured ? '★ Featured' : 'Regular'}
                  </span>
                </td>
                <td>
                  <div className="table-actions">
                    <button className="icon-btn" onClick={() => handleEdit(p)} title="Edit"><Pencil size={15} /></button>
                    <button className="icon-btn btn-danger" onClick={() => handleDelete(p._id)} title="Delete"><Trash2 size={15} /></button>
                  </div>
                </td>
              </tr>
            ))}
            {projects.length === 0 && (
              <tr><td colSpan="4" style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '2rem' }}>No projects yet. Add your first one!</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal card" onClick={(e) => e.stopPropagation()}>
            <div className="modal__header">
              <h3>{editId ? 'Edit Project' : 'New Project'}</h3>
              <button className="icon-btn" onClick={closeModal}><X size={18} /></button>
            </div>
            <form onSubmit={handleSubmit} className="modal__form">
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Title *</label>
                  <input className="form-input" name="title" value={form.title} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label className="form-label">GitHub URL</label>
                  <input className="form-input" name="githubLink" value={form.githubLink} onChange={handleChange} />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Short Description *</label>
                <input className="form-input" name="description" value={form.description} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label className="form-label">Full Description</label>
                <textarea className="form-input" name="longDescription" rows={3} value={form.longDescription} onChange={handleChange} />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Tech Stack (comma separated)</label>
                  <input className="form-input" name="techStack" value={form.techStack} onChange={handleChange} placeholder="React, Node.js, MongoDB" />
                </div>
                <div className="form-group">
                  <label className="form-label">Live Demo URL</label>
                  <input className="form-input" name="liveLink" value={form.liveLink} onChange={handleChange} />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Project Image</label>
                <div className="upload-area">
                  {form.image && <img src={form.image} alt="" className="upload-preview" />}
                  <label className="btn btn-outline btn-sm" style={{ cursor: 'pointer' }}>
                    <Upload size={14} /> {uploading ? 'Uploading...' : 'Upload Image'}
                    <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} />
                  </label>
                  {form.image && <input className="form-input" name="image" value={form.image} onChange={handleChange} style={{ marginTop: '0.5rem' }} placeholder="Or paste image URL" />}
                </div>
              </div>
              <div className="form-group" style={{ flexDirection: 'row', alignItems: 'center', gap: '0.5rem' }}>
                <input type="checkbox" id="featured" name="featured" checked={form.featured} onChange={handleChange} />
                <label htmlFor="featured" className="form-label" style={{ margin: 0 }}>Mark as Featured</label>
              </div>
              <div className="modal__actions">
                <button type="button" className="btn btn-outline" onClick={closeModal}>Cancel</button>
                <button type="submit" className="btn btn-primary" disabled={loading}>
                  {loading ? 'Saving...' : editId ? 'Update Project' : 'Create Project'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectsManager;
