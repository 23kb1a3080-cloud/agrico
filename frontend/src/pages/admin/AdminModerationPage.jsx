import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Sidebar } from '../../components/Sidebar';
import { StatusBadge } from '../../components/StatusBadge';
import { IconBox, IconSprout } from '../../components/Icons';

export const AdminModerationPage = () => {
  const { products, deleteProduct, communityPosts } = useApp();
  const [activeTab, setActiveTab] = useState('PRODUCTS');

  const handleDeleteListing = (id) => {
    if (window.confirm("Remove this agricultural listing from the marketplace for regulatory non-compliance?")) {
      deleteProduct(id);
    }
  };

  return (
    <div className="container page-wrapper">
      <div className="dashboard-layout">
        <Sidebar />

        <main className="dashboard-main">
          <div className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <h2 className="heading-serif" style={{ color: 'var(--dark-green)' }}>
                  Marketplace & Community Content Moderation
                </h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                  Ensure organic genuineness, fair pricing caps, and prevent harmful chemical pesticide recommendations
                </p>
              </div>

              <div className="filter-tab-buttons">
                <button
                  className={`tab-btn ${activeTab === 'PRODUCTS' ? 'active' : ''}`}
                  onClick={() => setActiveTab('PRODUCTS')}
                >
                  <IconBox size={14} /> Marketplace Produce ({products.length})
                </button>
                <button
                  className={`tab-btn ${activeTab === 'COMMUNITY' ? 'active' : ''}`}
                  onClick={() => setActiveTab('COMMUNITY')}
                >
                  <IconSprout size={14} /> Community Threads ({communityPosts.length})
                </button>
              </div>
            </div>

            {activeTab === 'PRODUCTS' ? (
              <div className="table-container">
                <table className="agri-table">
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Farmer</th>
                      <th>Classification</th>
                      <th>Price</th>
                      <th>Stock</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map(p => (
                      <tr key={p.id}>
                        <td>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <img src={p.image} alt="" style={{ width: '32px', height: '32px', borderRadius: '4px', objectFit: 'cover' }} />
                            <strong>{p.title}</strong>
                          </div>
                        </td>
                        <td>{p.farmerName}</td>
                        <td><StatusBadge type="farming" status={p.farmingType} /></td>
                        <td>₹{p.price}/{p.unit}</td>
                        <td>{p.stock} {p.unit}</td>
                        <td>
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => handleDeleteListing(p.id)}
                          >
                            Remove Listing
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {communityPosts.map(post => (
                  <div key={post.id} style={{ border: '1px solid var(--border-cream)', padding: '1.25rem', borderRadius: 'var(--radius-md)', background: '#ffffff' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                      <strong style={{ color: 'var(--dark-green)', fontSize: '1.05rem' }}>{post.title}</strong>
                      <span className="badge" style={{ background: '#e0f2fe', color: '#0369a1' }}>
                        Crop: {post.crop}
                      </span>
                    </div>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>
                      {post.content}
                    </p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      <span>Posted by {post.authorName} ({post.authorLocation})</span>
                      <button
                        className="btn btn-secondary btn-sm"
                        onClick={() => alert(`Discussion thread ID ${post.id} verified as compliant with agricultural safety standards.`)}
                      >
                        Flag / Review Comments ({post.replies?.length || 0})
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

