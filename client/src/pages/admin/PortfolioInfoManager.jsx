import { useState, useEffect } from 'react';
import { getPortfolioInfo, updatePortfolioInfo } from '../../api';
import toast from 'react-hot-toast';
import { User, Mail, MapPin, Globe, Save, Info, GraduationCap, Briefcase, Plus, Trash2 } from 'lucide-react';

const PortfolioInfoManager = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    bio: '',
    about: '',
    location: '',
    github: '',
    linkedin: '',
    instagram: '',
    whatsapp: '',
    twitter: '',
    leetcode: '',
    tagline: '',
    yearsExp: '',
    projectsCount: '',
    degree: '',
    education: [],
    experience: []
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const res = await getPortfolioInfo();
        if (res.data) {
          const mappedEdu = (res.data.education || []).map(e => {
            const newE = { ...e, startDate: e.startDate || e.year || '' };
            newE.year = '';
            return newE;
          });
          const mappedExp = (res.data.experience || []).map(e => {
            const newE = { ...e, startDate: e.startDate || e.duration || '' };
            newE.duration = '';
            return newE;
          });
          setForm(prev => ({ ...prev, ...res.data, education: mappedEdu, experience: mappedExp }));
        }
      } catch (err) {
        console.error('Failed to load portfolio info');
      }
    };
    fetchInfo();
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  // Handle Dynamic Arrays (Education/Experience)
  const handleArrayChange = (index, field, value, type) => {
    const newArray = [...form[type]];
    newArray[index][field] = value;
    setForm({ ...form, [type]: newArray });
  };

  const addArrayItem = (type) => {
    const newItem = type === 'education' 
      ? { degree: '', institution: '', startDate: '', endDate: '', grade: '', description: '' }
      : { role: '', company: '', location: '', startDate: '', endDate: '', description: '' };
    setForm({ ...form, [type]: [...form[type], newItem] });
  };

  const removeArrayItem = (index, type) => {
    const newArray = [...form[type]];
    newArray.splice(index, 1);
    setForm({ ...form, [type]: newArray });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updatePortfolioInfo(form);
      toast.success('Professional profile updated!');
    } catch (err) {
      toast.error('Update failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-page-container">
      <div className="manager-header">
        <h2>Professional Profile</h2>
        <button className="btn btn-primary btn-sm" onClick={handleSubmit} disabled={loading}>
          <Save size={16} /> {loading ? 'Saving Changes...' : 'Save Profile'}
        </button>
      </div>

      <div className="admin-card-wrapper" style={{ padding: '2.5rem' }}>
        <form onSubmit={handleSubmit}>
          {/* Section: Basic Identity */}
          <div className="form-section">
            <h3 className="section-subtitle-admin">
              <User size={18} /> Basic Identity
            </h3>
            <div className="grid-3">
              <div className="admin-form-group">
                <label className="admin-label">Display Name</label>
                <input className="form-input" name="name" value={form.name} onChange={handleChange} placeholder="Sivaprakash M" />
              </div>
              <div className="admin-form-group">
                <label className="admin-label">Professional Email</label>
                <input className="form-input" name="email" value={form.email} onChange={handleChange} placeholder="jofrashiva04@gmail.com" />
              </div>
              <div className="admin-form-group">
                <label className="admin-label">Current / Highest Degree</label>
                <input className="form-input" name="degree" value={form.degree} onChange={handleChange} placeholder="MCA" />
              </div>
            </div>
            
            <div className="modal-form-grid" style={{ marginTop: '1.25rem' }}>
              <div className="admin-form-group">
                <label className="admin-label">Recruiter Tagline</label>
                <input className="form-input" name="tagline" value={form.tagline} onChange={handleChange} placeholder="e.g. MERN Stack Developer | AI Enthusiast" />
              </div>
              <div className="modal-form-grid">
                <div className="admin-form-group">
                  <label className="admin-label">Experience</label>
                  <input className="form-input" name="yearsExp" value={form.yearsExp} onChange={handleChange} placeholder="e.g. Fresher / 1 Year" />
                </div>
                <div className="admin-form-group">
                  <label className="admin-label">Projects Completed</label>
                  <input className="form-input" name="projectsCount" value={form.projectsCount} onChange={handleChange} placeholder="e.g. 10+" />
                </div>
              </div>
            </div>
          </div>

          {/* Section: Education Management */}
          <div className="form-section" style={{ marginTop: '3.5rem' }}>
            <div className="manager-header" style={{ marginBottom: '1.5rem' }}>
              <h3 className="section-subtitle-admin" style={{ margin: 0, border: 'none' }}>
                <GraduationCap size={18} /> Education History
              </h3>
              <button type="button" className="btn btn-outline btn-sm" onClick={() => addArrayItem('education')}>
                <Plus size={14} /> Add Education
              </button>
            </div>
            <div className="admin-array-list">
              {form.education.map((edu, idx) => (
                <div key={idx} className="admin-array-item glass">
                   <div className="grid-3">
                    <div className="admin-form-group" style={{ gridColumn: 'span 2' }}>
                      <label className="admin-label">Degree / Field</label>
                      <input className="form-input" value={edu.degree} onChange={(e) => handleArrayChange(idx, 'degree', e.target.value, 'education')} placeholder="e.g. Master of Computer Applications" />
                    </div>
                    {/* Year Input Removed per user request */}
                  </div>
                  <div className="modal-form-grid" style={{ marginTop: '1rem' }}>
                    <div className="admin-form-group">
                      <label className="admin-label">Institution Name</label>
                      <input className="form-input" value={edu.institution} onChange={(e) => handleArrayChange(idx, 'institution', e.target.value, 'education')} />
                    </div>
                    <div className="admin-form-group">
                      <label className="admin-label">Grade / Performance</label>
                      <input className="form-input" value={edu.grade} onChange={(e) => handleArrayChange(idx, 'grade', e.target.value, 'education')} placeholder="e.g. 8.5 CGPA" />
                    </div>
                  </div>
                  <div className="admin-form-group" style={{ marginTop: '1rem' }}>
                    <label className="admin-label">Notes / Description</label>
                    <textarea className="form-input" rows={2} value={edu.description} onChange={(e) => handleArrayChange(idx, 'description', e.target.value, 'education')} />
                  </div>
                  <button type="button" className="btn-remove-item" onClick={() => removeArrayItem(idx, 'education')}>
                    <Trash2 size={14} /> Remove
                  </button>
                </div>
              ))}
              {form.education.length === 0 && <p className="empty-msg-admin">No education record found.</p>}
            </div>
          </div>

          {/* Section: Experience Management */}
          <div className="form-section" style={{ marginTop: '3.5rem' }}>
            <div className="manager-header" style={{ marginBottom: '1.5rem' }}>
              <h3 className="section-subtitle-admin" style={{ margin: 0, border: 'none' }}>
                <Briefcase size={18} /> Work Experience
              </h3>
              <button type="button" className="btn btn-outline btn-sm" onClick={() => addArrayItem('experience')}>
                <Plus size={14} /> Add Experience
              </button>
            </div>
            <div className="admin-array-list">
              {form.experience.map((exp, idx) => (
                <div key={idx} className="admin-array-item glass">
                   <div className="grid-3">
                    <div className="admin-form-group" style={{ gridColumn: 'span 2' }}>
                      <label className="admin-label">Job Role</label>
                      <input className="form-input" value={exp.role} onChange={(e) => handleArrayChange(idx, 'role', e.target.value, 'experience')} placeholder="e.g. Full Stack Intern" />
                    </div>
                    {/* Duration Input Removed per user request */}
                  </div>
                  <div className="modal-form-grid" style={{ marginTop: '1rem' }}>
                    <div className="admin-form-group">
                      <label className="admin-label">Company Name</label>
                      <input className="form-input" value={exp.company} onChange={(e) => handleArrayChange(idx, 'company', e.target.value, 'experience')} />
                    </div>
                    <div className="admin-form-group">
                      <label className="admin-label">Location</label>
                      <input className="form-input" value={exp.location} onChange={(e) => handleArrayChange(idx, 'location', e.target.value, 'experience')} placeholder="e.g. Remote" />
                    </div>
                  </div>
                  <div className="admin-form-group" style={{ marginTop: '1rem' }}>
                    <label className="admin-label">Responsibilities</label>
                    <textarea className="form-input" rows={2} value={exp.description} onChange={(e) => handleArrayChange(idx, 'description', e.target.value, 'experience')} />
                  </div>
                  <button type="button" className="btn-remove-item" onClick={() => removeArrayItem(idx, 'experience')}>
                    <Trash2 size={14} /> Remove
                  </button>
                </div>
              ))}
              {form.experience.length === 0 && <p className="empty-msg-admin">No work experience record found.</p>}
            </div>
          </div>

          {/* Section: Bios */}
          <div className="form-section" style={{ marginTop: '3.5rem' }}>
            <h3 className="section-subtitle-admin">
              <Info size={18} /> Professional Narrative
            </h3>
            <div className="modal-form-grid">
              <div className="admin-form-group">
                <label className="admin-label">Hero Introduction (Short)</label>
                <textarea className="form-input" name="bio" value={form.bio} onChange={handleChange} rows={2} />
              </div>
              <div className="admin-form-group">
                <label className="admin-label">About Me Narrative (Detailed)</label>
                <textarea className="form-input" name="about" value={form.about} onChange={handleChange} rows={5} />
              </div>
            </div>
          </div>

          {/* Section: Socials */}
          <div className="form-section" style={{ marginTop: '3.5rem' }}>
            <h3 className="section-subtitle-admin">
              <Globe size={18} /> Social & Connectivity
            </h3>
            
            <div className="admin-form-group" style={{ marginBottom: '1.5rem', maxWidth: '400px' }}>
              <label className="admin-label">Current Base Location</label>
              <div className="input-icon-wrapper">
                <MapPin size={14} className="input-icon" />
                <input className="form-input input-with-icon" name="location" value={form.location} onChange={handleChange} placeholder="e.g. Chennai, India" />
              </div>
            </div>

            <div className="grid-3">
              {['github', 'linkedin', 'instagram', 'whatsapp', 'twitter', 'leetcode']
                .filter(platform => form[platform] !== undefined && form[platform] !== null && String(form[platform]).length > 0 || ['github', 'linkedin'].includes(platform))
                .map(platform => (
                  <div className="admin-form-group" key={platform}>
                    <label className="admin-label" style={{ textTransform: 'capitalize' }}>{platform}</label>
                    <div style={{ display: 'flex', gap: '0.75rem' }}>
                      <input 
                        className="form-input" 
                        name={platform} 
                        value={form[platform] || ''} 
                        onChange={handleChange} 
                        placeholder={`https://${platform}.com/...`}
                      />
                      {!['github', 'linkedin'].includes(platform) && (
                        <button 
                          type="button" 
                          className="icon-btn" 
                          style={{ color: 'var(--danger)' }}
                          onClick={() => setForm(p => ({ ...p, [platform]: '' }))}
                        >
                          <Trash2 size={16} />
                        </button>
                      )}
                    </div>
                  </div>
              ))}
            </div>
          </div>

          <div style={{ marginTop: '3rem', display: 'flex', justifyContent: 'center', borderTop: '1px solid var(--border)', paddingTop: '2rem' }}>
            <button type="submit" className="btn btn-primary" style={{ padding: '0.8rem 2.5rem' }} disabled={loading}>
              <Save size={18} /> {loading ? 'Saving Profile...' : 'Save All Professional Data'}
            </button>
          </div>
        </form>
      </div>

      <style>{`
        .section-header-admin {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
          border-bottom: 1px solid var(--border);
          padding-bottom: 1rem;
        }
        .admin-array-list {
          display: flex;
          flex-direction: column;
          gap: 2rem;
          margin-top: 1.5rem;
        }
        .admin-array-item {
          padding: 2rem;
          position: relative;
          background: var(--bg-secondary);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
        }
        .empty-msg-admin {
          text-align: center;
          color: var(--text-muted);
          font-style: italic;
          padding: 2rem;
          background: rgba(255,255,255,0.01);
          border: 1px dashed var(--border);
          border-radius: var(--radius-md);
        }
        .btn-remove-item {
          position: absolute;
          top: 1.25rem;
          right: 1.25rem;
          background: rgba(239, 68, 68, 0.08);
          color: #ef4444;
          border: 1px solid rgba(239, 68, 68, 0.15);
          padding: 0.45rem 0.9rem;
          border-radius: 8px;
          font-size: 0.72rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          cursor: pointer;
          transition: 0.25s cubic-bezier(0.4, 0, 0.2, 1);
          text-transform: uppercase;
          letter-spacing: 0.02em;
        }
        .btn-remove-item:hover {
          background: #ef4444;
          color: white; 
          border-color: transparent;
          box-shadow: 0 4px 12px rgba(239, 68, 68, 0.25);
          transform: translateY(-2px);
        }
      `}</style>
    </div>
  );
};

export default PortfolioInfoManager;

