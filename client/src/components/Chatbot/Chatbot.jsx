import { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot } from 'lucide-react';
import { chatbotSystemPrompt } from './chatbotKnowledge';
import './Chatbot.css';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || ''; // Add to .env

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hi! I'm Sivaprakash's AI Assistant. How can I help you today?", sender: 'bot' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async (e) => {
    e?.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.trim();
    setMessages(prev => [...prev, { text: userMessage, sender: 'user' }]);
    setInput('');
    setLoading(true);

    try {
      if (!API_KEY) throw new Error('No API Key');

      // Uses the deeply specialized knowledge base built for Sivaprakash
      const fullPrompt = `${chatbotSystemPrompt}\n\n${userMessage}`;

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ 
              parts: [{ 
                text: fullPrompt 
              }] 
            }]
          })
        }
      );
      
      const data = await response.json();
      
      if (data.error) throw new Error(data.error.message);
      
      const botText = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (botText) {
        setMessages(prev => [...prev, { text: botText, sender: 'bot' }]);
        return;
      }
    } catch (error) {
      // Fallback local logic if API fails or key is missing
      const msg = userMessage.toLowerCase();
      let reply = "I'm currently running in offline mode. Please feel free to check out Sivaprakash's projects or use the contact form to reach out!";
      
      if (msg.includes('hi') || msg.includes('hello') || msg.includes('hey')) {
        reply = "Hello! I'm Sivaprakash's AI Assistant. How can I help you learn more about his work?";
      } else if (msg.includes('skill') || msg.includes('tech') || msg.includes('stack')) {
        reply = "Sivaprakash specializes in the MERN stack: MongoDB, Express.js, React, and Node.js. He also has experience with REST APIs and modern CSS.";
      } else if (msg.includes('project') || msg.includes('work')) {
        reply = "He has built several high-quality applications. You can view them in the Projects section above!";
      } else if (msg.includes('contact') || msg.includes('hire') || msg.includes('email')) {
        reply = "You can contact Sivaprakash directly using the form below, or reach out to him via LinkedIn!";
      } else if (msg.includes('education') || msg.includes('mca') || msg.includes('study')) {
        reply = "Sivaprakash is currently pursuing his MCA and continuously building scalable full-stack applications.";
      }
      
      setTimeout(() => {
        setMessages(prev => [...prev, { text: reply, sender: 'bot' }]);
      }, 500); // Small delay to feel natural
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button 
        className={`chatbot-fab ${isOpen ? 'hidden' : ''}`} 
        onClick={() => setIsOpen(true)}
        title="Chat with AI"
      >
        <MessageSquare size={24} />
      </button>

      <div className={`chatbot-window card ${isOpen ? 'open' : ''}`}>
        <div className="chatbot-header">
          <div className="chatbot-header-title">
            <Bot size={20} />
            <span>AI Assistant</span>
          </div>
          <button className="icon-btn" onClick={() => setIsOpen(false)}>
            <X size={18} />
          </button>
        </div>
        
        <div className="chatbot-messages">
          {messages.map((msg, index) => (
            <div key={index} className={`chatbot-bubble ${msg.sender}`}>
              {msg.text}
            </div>
          ))}
          {loading && (
            <div className="chatbot-bubble bot loading-bubble">
              <span className="dot"></span><span className="dot"></span><span className="dot"></span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <form className="chatbot-input-area" onSubmit={handleSend}>
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me anything..."
            className="form-input"
          />
          <button type="submit" className="btn btn-primary btn-sm chatbot-send" disabled={loading || !input.trim()}>
            <Send size={16} />
          </button>
        </form>
      </div>
    </>
  );
};

export default Chatbot;
