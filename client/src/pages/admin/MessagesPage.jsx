import { useState, useEffect } from 'react';
import { getMessages, markRead, deleteMessage } from '../../api';
import toast from 'react-hot-toast';
import { Mail, Trash2, Eye } from 'lucide-react';

const MessagesPage = () => {
  const [messages, setMessages] = useState([]);

  const fetchMessages = async () => {
    try { const res = await getMessages(); setMessages(res.data); }
    catch { toast.error('Failed to load messages'); }
  };

  useEffect(() => { fetchMessages(); }, []);

  const handleRead = async (id) => {
    try { await markRead(id); fetchMessages(); }
    catch { toast.error('Error'); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete message?')) return;
    try { await deleteMessage(id); toast.success('Deleted!'); fetchMessages(); }
    catch { toast.error('Delete failed'); }
  };

  return (
    <div className="admin-page-container">
      <div className="manager-header">
        <h2>Inquiry Hub</h2>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <span className={`status-indicator ${messages.some(m => !m.read) ? 'status-indicator--warning' : 'status-indicator--success'}`}>
            {messages.filter(m => !m.read).length} Pending Follow-ups
          </span>
        </div>
      </div>

      <div className="admin-card-wrapper">
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Communication Asset</th>
                <th>Subject Matter</th>
                <th>Message Snippet</th>
                <th>Timestamp</th>
                <th>Interactions</th>
              </tr>
            </thead>
            <tbody>
              {messages.map((m) => (
                <tr key={m._id} style={{ opacity: m.read ? 0.7 : 1, transition: 'var(--transition-fast)' }}>
                  <td>
                    <div style={{ fontWeight: 800, color: 'var(--text-primary)', fontSize: '0.95rem' }}>{m.name}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginTop: '0.2rem' }}>{m.email}</div>
                  </td>
                  <td style={{ fontWeight: 600, color: m.read ? 'var(--text-muted)' : 'var(--primary-light)' }}>
                    {m.subject || 'Standard Inquiry'}
                  </td>
                  <td style={{ maxWidth: 350, color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: '1.5' }}>
                    {m.message.slice(0, 80)}{m.message.length > 80 ? '[...]' : ''}
                  </td>
                  <td>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 700 }}>
                      {new Date(m.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                    </div>
                  </td>
                  <td>
                    <div className="table-actions">
                      <a href={`mailto:${m.email}?subject=Re: ${m.subject || 'Your Inquiry'}`} className="icon-btn" title="Compose Reply">
                        <Mail size={15} />
                      </a>
                      {!m.read && (
                        <button className="icon-btn" style={{ color: 'var(--primary-light)' }} onClick={() => handleRead(m._id)} title="Archive Read"><Eye size={15} /></button>
                      )}
                      <button className="icon-btn" style={{ color: 'var(--danger)' }} onClick={() => handleDelete(m._id)} title="Hard Delete"><Trash2 size={15} /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {messages.length === 0 && (
                <tr>
                  <td colSpan="5" className="empty-table-row">
                    Your digital mailbox is empty. All quiet on the western front!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MessagesPage;
