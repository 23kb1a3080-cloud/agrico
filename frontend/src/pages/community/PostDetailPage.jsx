import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import {
  IconSprout,
  IconLocation,
  IconCheck,
  IconMessage
} from '../../components/Icons';

export const PostDetailPage = () => {
  const { id } = useParams();
  const { communityPosts, addCommentToPost } = useApp();
  const { user } = useAuth();

  const [commentText, setCommentText] = useState('');
  const [remedy, setRemedy] = useState('');

  const post = communityPosts.find(p => p.id === Number(id)) || communityPosts[0];

  const handleSubmitComment = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    addCommentToPost(post.id, {
      authorName: user?.name || 'Fellow Farmer',
      isExpert: user?.role === 'ADMIN',
      text: remedy ? `${commentText}\n\n[Recommended Remedy/Dosage]: ${remedy}` : commentText
    });

    setCommentText('');
    setRemedy('');
  };

  return (
    <div className="container page-wrapper" style={{ maxWidth: '900px' }}>
      <div style={{ marginBottom: '1.25rem' }}>
        <Link to="/community" style={{ color: 'var(--primary-green)', fontWeight: 600, fontSize: '0.88rem' }}>
          ← Back to All Community Discussions
        </Link>
      </div>

      {/* QUESTION THREAD HEADER */}
      <div className="card" style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div className="post-author-avatar">
              {post.authorName.charAt(0)}
            </div>
            <div>
              <strong style={{ color: 'var(--dark-green)' }}>{post.authorName}</strong>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                <IconLocation size={12} /> {post.authorLocation} • {post.createdAt}
              </div>
            </div>
          </div>

          <span className="badge" style={{ background: '#e0f2fe', color: '#0369a1', fontSize: '0.85rem' }}>
            <IconSprout size={14} /> Crop: {post.crop}
          </span>
        </div>

        <h1 className="heading-serif" style={{ fontSize: '1.75rem', color: 'var(--dark-green)', marginBottom: '1rem' }}>
          {post.title}
        </h1>

        <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: '1.65', marginBottom: '1.5rem' }}>
          {post.content}
        </p>

        {post.image && (
          <div style={{ borderRadius: 'var(--radius-md)', overflow: 'hidden', border: '1px solid var(--border-light)', maxHeight: '420px', marginBottom: '1.5rem' }}>
            <img src={post.image} alt={post.crop} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        )}

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', borderTop: '1px solid var(--border-light)', paddingTop: '1rem', fontSize: '0.88rem', color: 'var(--text-muted)' }}>
          <span>👍 {post.likes} Farmers Found Helpful</span>
          <span>•</span>
          <span>💬 {post.replies?.length || 0} Advisory Recommendations</span>
        </div>
      </div>

      {/* REPLIES & ADVICE */}
      <div style={{ marginBottom: '2.5rem' }}>
        <h3 className="heading-serif" style={{ color: 'var(--dark-green)', marginBottom: '1.25rem' }}>
          Expert & Peer Recommendations ({post.replies?.length || 0})
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {post.replies?.map((rep, idx) => (
            <div
              key={rep.id || idx}
              style={{
                background: rep.isExpert ? '#f0fdf4' : 'var(--bg-white)',
                border: `1px solid ${rep.isExpert ? '#86efac' : 'var(--border-cream)'}`,
                borderRadius: 'var(--radius-md)',
                padding: '1.25rem',
                boxShadow: 'var(--shadow-sm)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <strong>{rep.authorName}</strong>
                  {rep.isExpert && (
                    <span className="badge badge-approved" style={{ fontSize: '0.7rem' }}>
                      ✓ Verified Agronomist
                    </span>
                  )}
                </div>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{rep.createdAt}</span>
              </div>
              <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: '1.6', margin: 0, whiteSpace: 'pre-line' }}>
                {rep.text}
              </p>
            </div>
          ))}

          {(!post.replies || post.replies.length === 0) && (
            <div className="card" style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '2rem' }}>
              No answers posted yet. Be the first experienced farmer or agronomist to help!
            </div>
          )}
        </div>
      </div>

      {/* POST REPLY FORM */}
      <div className="card">
        <h3 style={{ fontSize: '1.15rem', color: 'var(--dark-green)', marginBottom: '1rem' }}>
          Share Crop Guidance / Recommended Remedy
        </h3>

        <form onSubmit={handleSubmitComment}>
          <div className="form-group">
            <label className="form-label">Your Scientific or Practical Advice*</label>
            <textarea
              className="form-control"
              rows={3}
              required
              placeholder="Explain cause (fungal, bacterial, viral, or deficiency) and general handling..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Specific Bio-Remedy or Chemical Dosage (Optional)</label>
            <input
              type="text"
              className="form-control"
              placeholder="e.g. Spray Mancozeb 75% WP @ 2g/L or 5% Neem Seed Kernel Extract (NSKE)"
              value={remedy}
              onChange={(e) => setRemedy(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Submit Advisory Reply
          </button>
        </form>
      </div>
    </div>
  );
};

