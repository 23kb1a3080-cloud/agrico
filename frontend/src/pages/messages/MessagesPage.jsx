import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import { IconMessage, IconUser, IconTractor, IconLocation } from '../../components/Icons';

export const MessagesPage = () => {
  const { user } = useAuth();
  const { messages, sendMessage } = useApp();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const paramFarmerId = searchParams.get('farmerId');
  const paramFarmerName = searchParams.get('farmerName');

  const [activePartner, setActivePartner] = useState({
    id: paramFarmerId ? Number(paramFarmerId) : (user?.role === 'FARMER' ? 4 : 1),
    name: paramFarmerName || (user?.role === 'FARMER' ? 'Pooja Sharma' : 'Ramesh Patel'),
    role: user?.role === 'FARMER' ? 'Customer' : 'Farmer (Nashik)'
  });

  const [inputText, setInputText] = useState('');

  // Conversation partners list
  const partners = [
    { id: 1, name: 'Ramesh Patel', role: 'Verified Farmer • Nashik' },
    { id: 3, name: 'Balvinder Singh', role: 'Verified Farmer • Ludhiana' },
    { id: 4, name: 'Pooja Sharma', role: 'Customer • Mumbai' }
  ].filter(p => p.id !== user?.id);

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    sendMessage(
      user?.id || 99,
      user?.name || 'Me',
      activePartner.id,
      activePartner.name,
      inputText
    );
    setInputText('');
  };

  return (
    <div className="container page-wrapper">
      <div style={{ marginBottom: '1.25rem' }}>
        <h1 className="heading-serif" style={{ color: 'var(--dark-green)', fontSize: '1.85rem', margin: 0 }}>
          Direct Inquiries & Farmer Communication
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
          Real-time trade discussions between buyers and verified agricultural producers
        </p>
      </div>

      <div className="messages-container">
        {/* CONVERSATION THREADS LIST */}
        <aside className="conversations-sidebar">
          <div className="conversations-header">
            <h4 style={{ color: 'var(--dark-green)', margin: 0, fontSize: '1rem' }}>Active Chats</h4>
          </div>

          <div className="conversations-list">
            {partners.map(p => (
              <div
                key={p.id}
                className={`conversation-item ${activePartner.id === p.id ? 'active' : ''}`}
                onClick={() => setActivePartner(p)}
              >
                <div className="conversation-avatar">
                  {p.name.charAt(0)}
                </div>
                <div>
                  <strong style={{ fontSize: '0.92rem', color: 'var(--text-primary)', display: 'block' }}>
                    {p.name}
                  </strong>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    {p.role}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* CHAT WINDOW */}
        <main className="chat-panel">
          <div className="chat-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div className="conversation-avatar" style={{ width: '38px', height: '38px' }}>
                {activePartner.name.charAt(0)}
              </div>
              <div>
                <strong style={{ fontSize: '1rem', color: 'var(--dark-green)', display: 'block' }}>
                  {activePartner.name}
                </strong>
                <span style={{ fontSize: '0.75rem', color: '#16a34a', fontWeight: 600 }}>
                  ● Active now • Direct Inquiry
                </span>
              </div>
            </div>

            <span className="badge badge-approved" style={{ fontSize: '0.75rem' }}>
              Encrypted Mandi Chat
            </span>
          </div>

          <div className="chat-messages-area">
            {messages.map((msg, idx) => {
              const isMine = msg.senderId === user?.id || msg.isMe;
              return (
                <div
                  key={msg.id || idx}
                  className={`chat-bubble ${isMine ? 'bubble-me' : 'bubble-other'}`}
                >
                  <div>{msg.text}</div>
                  <span className="bubble-time">{msg.timestamp || 'Now'}</span>
                </div>
              );
            })}
          </div>

          <form onSubmit={handleSend} className="chat-input-bar">
            <input
              type="text"
              className="form-control"
              placeholder={`Message ${activePartner.name} regarding quantity, harvest timing, or logistics...`}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
            <button type="submit" className="btn btn-primary" style={{ padding: '0 1.5rem' }}>
              Send
            </button>
          </form>
        </main>
      </div>
    </div>
  );
};

