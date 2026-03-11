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
    <div className="messages-manager">
      <div className="manager-header">
        <h2>Client Inquiries</h2>
        <span className="status-indicator status-indicator--warning">
          {messages.filter(m => !m.read).length} Unread Messages
        </span>
      </div>

      <div className="admin-card-wrapper">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Sender Details</th>
              <th>Subject</th>
              <th>Message Preview</th>
              <th>Received</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {messages.map((m) => (
              <tr key={m._id} style={{ opacity: m.read ? 0.6 : 1, transition: 'var(--transition-fast)' }}>
                <td>
                  <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{m.name}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>{m.email}</div>
                </td>
                <td style={{ fontWeight: 600, color: m.read ? 'var(--text-muted)' : 'var(--primary-light)' }}>
                  {m.subject || '—'}
                </td>
                <td style={{ maxWidth: 280, color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                  {m.message.slice(0, 100)}{m.message.length > 100 ? '...' : ''}
                </td>
                <td style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                  {new Date(m.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                </td>
                <td>
                  <div className="table-actions">
                    <a href={`mailto:${m.email}?subject=Re: ${m.subject || 'Your Inquiry'}`} className="icon-btn btn-primary" title="Reply to Sender">
                      <Mail size={15} />
                    </a>
                    {!m.read && (
                      <button className="icon-btn" onClick={() => handleRead(m._id)} title="Mark as Read"><Eye size={15} /></button>
                    )}
                    <button className="icon-btn btn-danger" onClick={() => handleDelete(m._id)} title="Archive/Delete"><Trash2 size={15} /></button>
                  </div>
                </td>
              </tr>
            ))}
            {messages.length === 0 && (
              <tr>
                <td colSpan="5" className="empty-table-row">
                  <Mail size={40} style={{ opacity: 0.2, display: 'block', margin: '0 auto 1rem' }} />
                  Your inbox is currently empty.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MessagesPage;
