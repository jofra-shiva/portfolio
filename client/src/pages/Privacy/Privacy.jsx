import React, { useEffect } from 'react';
import { Shield, Info, Lock, Eye, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './Privacy.css';

const PrivacyPolicy = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="privacy-page">
      <div className="privacy-container">
        <button className="back-btn" onClick={() => navigate('/')}>
          <ArrowLeft size={18} /> Back to Home
        </button>

        <header className="privacy-header">
          <Shield className="privacy-icon" size={48} />
          <h1>Privacy Policy</h1>
          <p>Last updated: March 2026</p>
        </header>

        <section className="privacy-section">
          <div className="section-title">
            <Info size={20} />
            <h2>Overview</h2>
          </div>
          <p>
            Your privacy is important to me. This policy explains how this website collects and uses 
            anonymous visitor data to improve the user experience.
          </p>
        </section>

        <section className="privacy-section">
          <div className="section-title">
            <Eye size={20} />
            <h2>Data Collection</h2>
          </div>
          <p>
            This website uses <strong>Google Analytics (GA4)</strong> and <strong>Microsoft Clarity</strong> 
            to collect anonymous information about how visitors interact with the site. This data includes:
          </p>
          <ul>
            <li>Approximate location (based on IP address)</li>
            <li>Device type (Mobile, Tablet, Desktop)</li>
            <li>Browser type and version</li>
            <li>Pages visited and time spent on each page</li>
            <li>Click patterns and scroll behavior (anonymous heatmaps)</li>
          </ul>
        </section>

        <section className="privacy-section">
          <div className="section-title">
            <Lock size={20} />
            <h2>How Data is Used</h2>
          </div>
          <p>
            The collected data is used exclusively for:
          </p>
          <ul>
            <li>Analyzing website traffic and performance</li>
            <li>Improving the design and user interface</li>
            <li>Understanding which projects or content are most relevant to visitors</li>
          </ul>
          <p className="highlight">
            Note: No personally identifiable information (PII) is collected unless you voluntarily 
            submit it through the contact form.
          </p>
        </section>

        <section className="privacy-section">
          <div className="section-title">
            <Shield size={20} />
            <h2>Third-Party Services</h2>
          </div>
          <p>
            This website uses scripts provided by Google and Microsoft. You can learn more about 
            their privacy practices here:
          </p>
          <div className="privacy-links">
            <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
              Google Privacy Policy
            </a>
            <a href="https://privacy.microsoft.com/privacystatement" target="_blank" rel="noopener noreferrer">
              Microsoft Privacy Statement
            </a>
          </div>
        </section>

        <footer className="privacy-page-footer">
          <p>If you have any questions, feel free to reach out via the contact form on the home page.</p>
        </footer>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
