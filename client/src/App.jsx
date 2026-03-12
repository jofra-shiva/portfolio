import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import PortfolioPage from './pages/PortfolioPage';
import AdminLogin from './pages/admin/AdminLogin';
import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import ProjectsManager from './pages/admin/ProjectsManager';
import SkillsManager from './pages/admin/SkillsManager';
import MessagesPage from './pages/admin/MessagesPage';
import PortfolioInfoManager from './pages/admin/PortfolioInfoManager';
import AchievementsManager from './pages/admin/AchievementsManager';
import './index.css';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}><div className="spinner"></div></div>;
  return user ? children : <Navigate to="/admin" replace />;
};

const AdminApp = ({ children }) => (
  <ProtectedRoute>
    <AdminLayout>{children}</AdminLayout>
  </ProtectedRoute>
);

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Portfolio */}
            <Route path="/" element={<PortfolioPage />} />

            {/* Admin */}
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminApp><AdminDashboard /></AdminApp>} />
            <Route path="/admin/projects" element={<AdminApp><ProjectsManager /></AdminApp>} />
            <Route path="/admin/skills" element={<AdminApp><SkillsManager /></AdminApp>} />
            <Route path="/admin/messages" element={<AdminApp><MessagesPage /></AdminApp>} />
            <Route path="/admin/portfolio" element={<AdminApp><PortfolioInfoManager /></AdminApp>} />
            <Route path="/admin/achievements" element={<AdminApp><AchievementsManager /></AdminApp>} />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>

          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: 'var(--bg-secondary)',
                color: 'var(--text-primary)',
                border: '1px solid var(--border)',
                borderRadius: '12px',
              },
              success: { iconTheme: { primary: '#10b981', secondary: 'white' } },
              error: { iconTheme: { primary: '#ef4444', secondary: 'white' } },
            }}
          />
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
