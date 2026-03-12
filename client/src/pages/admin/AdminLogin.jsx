import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../api';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';
import { Lock, Mail, Eye, EyeOff, Code2 } from 'lucide-react';
import logoImg from '../../assets/logo.png';
import './AdminLogin.css';

const AdminLogin = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await login(form);
      localStorage.setItem('adminToken', res.data.token);
      setUser(res.data);
      toast.success(`Welcome back, ${res.data.name}!`);
      navigate('/admin/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-bg">
        <div className="login-bg__orb login-bg__orb--1"></div>
        <div className="login-bg__orb login-bg__orb--2"></div>
        <div className="login-bg__orb login-bg__orb--3"></div>
      </div>

      <div className="login-card glass">
        <div className="login-header">
          <div className="login-logo">
            <img src={logoImg} alt="Logo" style={{ width: 36, height: 36, objectFit: 'contain' }} />
          </div>
          <h1>SHIVA'S Portal</h1>
          <p>Secure authentication for lead architect</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label className="form-label">Email</label>
            <div className="input-icon-wrapper">
              <Mail size={16} className="input-icon" />
              <input
                className="form-input input-with-icon"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="admin@portfolio.com"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <div className="input-icon-wrapper">
              <Lock size={16} className="input-icon" />
              <input
                className="form-input input-with-icon"
                type={showPass ? 'text' : 'password'}
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Enter password"
                required
              />
              <button type="button" className="input-toggle" onClick={() => setShowPass(!showPass)}>
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }} disabled={loading}>
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        <a href="/" className="login-back">← Back to Portfolio</a>
      </div>
    </div>
  );
};

export default AdminLogin;
