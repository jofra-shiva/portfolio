import { useState } from 'react';
import { Mail, MapPin, Phone, Send, Github, Linkedin, Instagram, MessageSquare } from 'lucide-react';
import toast from 'react-hot-toast';
import { sendContact } from '../../api';
import './Contact.css';

const Contact = ({ info }) => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      return toast.error('Please fill all required fields');
    }
    setLoading(true);
    try {
      await sendContact(form);
      toast.success('Message sent successfully! I\'ll get back to you soon.');
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      toast.error('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleWhatsApp = () => {
    if (!form.name || !form.message) {
      return toast.error('Please fill name and message to send via WhatsApp');
    }
    const phone = (info?.phone || '918838939801').replace(/[^0-9]/g, '');
    const text = `New Portfolio Enquiry%0A--------------------%0AName: ${form.name}%0AEmail: ${form.email || 'N/A'}%0ASubject: ${form.subject || 'N/A'}%0AMessage: ${form.message}`;
    window.open(`https://wa.me/${phone}?text=${text}`, '_blank');
  };

  const socials = [
    { icon: <Github size={20} />, href: info?.github, label: 'GitHub' },
    { icon: <Linkedin size={20} />, href: info?.linkedin, label: 'LinkedIn' },
    { icon: <Instagram size={20} />, href: info?.instagram, label: 'Instagram' },
  ];

  return (
    <section id="contact" className="section contact">
      <div className="container">
        <div className="section-header" data-aos="fade-up">
          <div className="section-tag">// get in touch</div>
          <h2 className="section-title">Contact <span>Me</span></h2>
          <div className="divider"></div>
          <p className="section-subtitle">Have a project in mind? Let's build something great together.</p>
        </div>

        <div className="contact__grid">
          <div className="contact__info" data-aos="fade-right">
            <div className="contact__info-card">
              <h3>Let's Talk</h3>
              <p className="contact__tagline">I'm currently open for freelance work and full-time positions. Feel free to reach out!</p>

              <div className="contact__details">
                {[
                  { icon: <Mail size={18} />, label: 'Email', value: info?.email || '', href: info?.email ? `mailto:${info.email}` : '#' },
                  { icon: <Phone size={18} />, label: 'Phone', value: info?.phone || '', href: info?.phone ? `tel:${info.phone}` : '#' },
                  { icon: <MapPin size={18} />, label: 'Location', value: info?.location || '', href: null },
                ].map((item, i) => (
                  <div key={i} className="contact__detail-item">
                    <div className="contact__detail-icon">{item.icon}</div>
                    <div>
                      <div className="contact__detail-label">{item.label}</div>
                      {item.href ? (
                        <a href={item.href} className="contact__detail-value">{item.value}</a>
                      ) : (
                        <span className="contact__detail-value">{item.value}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="contact__socials">
                {socials.map((s, i) => s.href && (
                  <a key={i} href={s.href} target="_blank" rel="noreferrer" className="social-icon" title={s.label}>
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="contact__form-wrapper" data-aos="fade-left">
            <form className="contact__form contact__form-card" onSubmit={handleSubmit}>
              <h3>Send a Message</h3>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Name *</label>
                  <input className="form-input" name="name" value={form.name} onChange={handleChange} placeholder="Your name" required />
                </div>
                <div className="form-group">
                  <label className="form-label">Email *</label>
                  <input className="form-input" type="email" name="email" value={form.email} onChange={handleChange} placeholder="your@email.com" required />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Subject</label>
                <input className="form-input" name="subject" value={form.subject} onChange={handleChange} placeholder="Project inquiry" />
              </div>
              <div className="form-group">
                <label className="form-label">Message *</label>
                <textarea className="form-input" name="message" rows={5} value={form.message} onChange={handleChange} placeholder="Tell me about your project..." required />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }} disabled={loading}>
                  <Send size={16} />
                  {loading ? 'Sending...' : 'Send Message'}
                </button>
                <button type="button" onClick={handleWhatsApp} className="btn btn-outline" style={{ width: '100%', justifyContent: 'center' }}>
                  <MessageSquare size={16} />
                  Send via WhatsApp
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
