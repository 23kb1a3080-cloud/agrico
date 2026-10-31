import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import { Modal } from '../../components/Modal';
import {
  IconSprout,
  IconMessage,
  IconUpload,
  IconLocation,
  IconCheck
} from '../../components/Icons';
import './Community.css';

export const CommunityPage = () => {
  const { communityPosts, addCommunityPost } = useApp();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [filter, setFilter] = useState('ALL');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [newPost, setNewPost] = useState({
    title: '',
    crop: 'Tomato',
    postType: 'DISEASE_DIAGNOSIS',
    content: '',
    image: 'https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?w=700&auto=format&fit=crop&q=80'
  });

  const filteredPosts = communityPosts.filter(p => {
    if (filter === 'ALL') return true;
    return p.postType === filter;
  });

  const handleCreatePost = (e) => {
    e.preventDefault();
    const created = addCommunityPost({
      ...newPost,
      authorName: user?.name || 'Kisan Bandhu',
      authorRole: user?.role || 'FARMER',
      authorLocation: `${user?.city || 'Nashik'}, ${user?.state || 'Maharashtra'}`
    });
    setIsModalOpen(false);
    navigate(`/community/${created.id}`);
  };

  return (
    <div className="container page-wrapper">
      <div className="community-header">
        <div>
          <span className="section-subtitle">Kisan Charcha & Agronomy Support</span>
          <h1 className="heading-serif" style={{ color: 'var(--dark-green)' }}>
            Farmer Community & Crop Advisory Forum
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
            Ask crop questions, share pest/disease photographs, and get advice from agricultural experts and fellow farmers
          </p>
        </div>

        <button className="btn btn-primary btn-lg" onClick={() => setIsModalOpen(true)}>
          + Ask Question / Share Disease Photo
        </button>
      </div>

      {/* FILTER TABS */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div className="community-filters">
          <button
            className={`tab-btn ${filter === 'ALL' ? 'active' : ''}`}
            onClick={() => setFilter('ALL')}
          >
            All Discussions
          </button>
          <button
            className={`tab-btn ${filter === 'DISEASE_DIAGNOSIS' ? 'active' : ''}`}
            onClick={() => setFilter('DISEASE_DIAGNOSIS')}
          >
            🔬 Crop Disease Diagnosis
          </button>
          <button
            className={`tab-btn ${filter === 'PESTICIDE_GUIDANCE' ? 'active' : ''}`}
            onClick={() => setFilter('PESTICIDE_GUIDANCE')}
          >
            🧪 Pesticide & Bio-Remedies
          </button>
          <button
            className={`tab-btn ${filter === 'GENERAL_QUERY' ? 'active' : ''}`}
            onClick={() => setFilter('GENERAL_QUERY')}
          >
            🌾 Cultivation Techniques
          </button>
        </div>

        <Link to="/crop-guidance" style={{ color: 'var(--primary-green)', fontWeight: 700, fontSize: '0.9rem' }}>
          Browse Scientific Crop Disease Directory →
        </Link>
      </div>

      {/* POSTS LIST */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
        {filteredPosts.map(post => (
          <article key={post.id} className="post-card">
            <div className="post-meta-row">
              <div className="post-author-chip">
                <div className="post-author-avatar">
                  {post.authorName.charAt(0)}
                </div>
                <div>
                  <strong>{post.authorName}</strong>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginLeft: '0.5rem' }}>
                    <IconLocation size={12} /> {post.authorLocation}
                  </span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span className="badge" style={{ background: '#e0f2fe', color: '#0369a1' }}>
                  <IconSprout size={12} /> {post.crop}
                </span>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{post.createdAt}</span>
              </div>
            </div>

            <h2 className="post-title">
              <Link to={`/community/${post.id}`}>{post.title}</Link>
            </h2>

            <p className="post-content">{post.content}</p>

            {post.image && (
              <div className="post-disease-image-wrap">
                <img src={post.image} alt={post.crop} />
                <span className="disease-tag-pill">Crop Disease Photo</span>
              </div>
            )}

            <div className="post-footer-actions">
              <div style={{ display: 'flex', gap: '1.25rem' }}>
                <span>👍 {post.likes} Farmers Found Helpful</span>
                <span style={{ color: 'var(--primary-green)', fontWeight: 600 }}>
                  💬 {post.replies?.length || 0} Expert & Peer Answers
                </span>
              </div>

              <Link to={`/community/${post.id}`} className="btn btn-outline btn-sm">
                View Advice & Reply →
              </Link>
            </div>
          </article>
        ))}
      </div>

      {/* ASK QUESTION MODAL */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Ask Crop Advisory Question & Upload Photo"
        maxWidth="640px"
      >
        <form onSubmit={handleCreatePost}>
          <div className="form-group">
            <label className="form-label">Subject / Question Summary*</label>
            <input
              type="text"
              className="form-control"
              required
              placeholder="e.g. Yellow rust spots appearing on wheat leaves after rain"
              value={newPost.title}
              onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-2">
            <div className="form-group">
              <label className="form-label">Affected Crop*</label>
              <select
                className="form-control"
                value={newPost.crop}
                onChange={(e) => setNewPost({ ...newPost, crop: e.target.value })}
              >
                <option value="Tomato">Tomato</option>
                <option value="Chilli / Mirchi">Chilli / Mirchi</option>
                <option value="Wheat">Wheat</option>
                <option value="Paddy / Rice">Paddy / Rice</option>
                <option value="Cotton">Cotton</option>
                <option value="Onion">Onion</option>
                <option value="Mustard">Mustard</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Advisory Category*</label>
              <select
                className="form-control"
                value={newPost.postType}
                onChange={(e) => setNewPost({ ...newPost, postType: e.target.value })}
              >
                <option value="DISEASE_DIAGNOSIS">🔬 Crop Disease Diagnosis</option>
                <option value="PESTICIDE_GUIDANCE">🧪 Pesticide & Bio-Remedy</option>
                <option value="GENERAL_QUERY">🌾 General Cultivation</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Detailed Symptoms & Observations*</label>
            <textarea
              className="form-control"
              rows={4}
              required
              placeholder="Describe leaf symptoms, spots, wilting, soil condition, and how many days since first noticed..."
              value={newPost.content}
              onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Crop Disease Leaf Photo (URL / Simulated Upload)</label>
            <div className="upload-dropzone" style={{ padding: '1rem', marginBottom: '0.5rem' }}>
              <IconUpload size={20} color="var(--primary-green)" />
              <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'block', marginTop: '0.25rem' }}>
                Clear close-up photograph of infected leaf or fruit helps agronomists diagnose accurately
              </span>
            </div>
            <input
              type="url"
              className="form-control"
              value={newPost.image}
              onChange={(e) => setNewPost({ ...newPost, image: e.target.value })}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem' }}>
            <button type="button" className="btn btn-secondary" onClick={() => setIsModalOpen(false)}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Publish to Farmer Community
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

