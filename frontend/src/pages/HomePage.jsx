import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { ProductCard } from '../components/ProductCard';
import {
  IconLeaf,
  IconTractor,
  IconShield,
  IconSprout,
  IconArrowRight,
  IconCheck,
  IconCart,
  IconMessage
} from '../components/Icons';
import './HomePage.css';

export const HomePage = () => {
  const { products, communityPosts } = useApp();
  const [activeTab, setActiveTab] = useState('ALL');
  const navigate = useNavigate();

  const filteredProducts = products.filter(p => {
    if (activeTab === 'ORGANIC') return p.farmingType === 'ORGANIC';
    if (activeTab === 'CONVENTIONAL') return p.farmingType === 'CONVENTIONAL';
    return true;
  }).slice(0, 4);

  return (
    <div className="home-root">
      {/* HERO SECTION */}
      <section className="hero-section">
        <div className="container hero-container">
          <div className="hero-content">
            <div className="hero-pill">
              <IconLeaf size={14} color="#15803d" />
              <span>Direct Kisan-to-Consumer Agricultural Platform</span>
            </div>
            <h1 className="hero-title heading-serif">
              Connecting India's Farmers Directly to Wholesale & Retail Buyers.
            </h1>
            <p className="hero-subtitle">
              Fair mandi prices, 100% verified 1-B land records, organic produce certification, and a vibrant community for instant crop disease guidance.
            </p>

            <div className="hero-cta-group">
              <Link to="/marketplace" className="btn btn-primary btn-lg">
                <IconCart size={20} /> Browse Fresh Produce
              </Link>
              <Link to="/register/farmer" className="btn btn-secondary btn-lg">
                <IconTractor size={20} /> Sell Your Harvest
              </Link>
            </div>

            <div className="hero-trust-row">
              <div className="trust-item">
                <IconCheck size={18} color="#16a34a" />
                <span>1-B Land Verified Sellers</span>
              </div>
              <div className="trust-item">
                <IconCheck size={18} color="#16a34a" />
                <span>Zero Middleman Markups</span>
              </div>
              <div className="trust-item">
                <IconCheck size={18} color="#16a34a" />
                <span>Community Agronomist Advice</span>
              </div>
            </div>
          </div>

          <div className="hero-image-card">
            <img
              src="https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?w=800&auto=format&fit=crop&q=80"
              alt="Indian Farmer harvesting fresh crop"
              className="hero-main-img"
            />
            <div className="hero-floating-card">
              <div className="floating-icon">
                <IconSprout size={24} color="#15803d" />
              </div>
              <div>
                <strong>Desi & Certified Organic</strong>
                <p>Over 850 Quintals verified chemical-free harvest available today</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS TICKER BAR */}
      <section className="stats-ticker-section">
        <div className="container stats-grid">
          <div className="stat-card">
            <div className="stat-num">4,850+</div>
            <div className="stat-label">Verified Farmers</div>
          </div>
          <div className="stat-card">
            <div className="stat-num">28,000+</div>
            <div className="stat-label">Quintals Produce Traded</div>
          </div>
          <div className="stat-card">
            <div className="stat-num">100%</div>
            <div className="stat-label">Land Record Authenticated</div>
          </div>
          <div className="stat-card">
            <div className="stat-num">24 Hrs</div>
            <div className="stat-label">Avg. Crop Advisory Response</div>
          </div>
        </div>
      </section>

      {/* MARKETPLACE HIGHLIGHTS */}
      <section className="section-padding marketplace-preview">
        <div className="container">
          <div className="section-header">
            <div>
              <span className="section-subtitle">Fresh From The Mandi</span>
              <h2 className="section-title heading-serif">Explore Season's Best Harvest</h2>
            </div>
            <div className="filter-tab-buttons">
              <button
                className={`tab-btn ${activeTab === 'ALL' ? 'active' : ''}`}
                onClick={() => setActiveTab('ALL')}
              >
                All Produce
              </button>
              <button
                className={`tab-btn ${activeTab === 'ORGANIC' ? 'active' : ''}`}
                onClick={() => setActiveTab('ORGANIC')}
              >
                🌿 100% Organic
              </button>
              <button
                className={`tab-btn ${activeTab === 'CONVENTIONAL' ? 'active' : ''}`}
                onClick={() => setActiveTab('CONVENTIONAL')}
              >
                🚜 Conventional
              </button>
            </div>
          </div>

          <div className="grid grid-cols-4">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="center-cta-wrap">
            <Link to="/marketplace" className="btn btn-outline btn-lg">
              View All Farm Listings <IconArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* WHY AGRICONNECT / THREE PILLARS */}
      <section className="section-padding why-agriconnect-section">
        <div className="container">
          <div className="text-center-heading">
            <span className="section-subtitle">A Transparent Ecosystem</span>
            <h2 className="section-title heading-serif">Designed for Farmers, Built for Consumers</h2>
          </div>

          <div className="grid grid-cols-3 features-grid">
            <div className="feature-card">
              <div className="feature-icon bg-green-light">
                <IconShield size={28} color="#1b5e20" />
              </div>
              <h3>1-B Land & Identity Verification</h3>
              <p>
                Every farmer profile is validated using genuine Patwari land ownership records (Form 1-B) and Aadhaar, protecting buyers against impersonation.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon bg-gold-light">
                <IconLeaf size={28} color="#b45309" />
              </div>
              <h3>Organic & Conventional Categorization</h3>
              <p>
                Customers can easily filter between zero-chemical Desi farming and high-yield conventional crops with transparent lab test & harvest documentation.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon bg-blue-light">
                <IconMessage size={28} color="#0369a1" />
              </div>
              <h3>Crop Disease & Pesticide Advisory</h3>
              <p>
                Farmers can snap photos of pest damage, upload them to our farmer community, and receive instant scientific pesticide dosages and bio-remedies.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CROP ADVISORY SPOTLIGHT */}
      <section className="section-padding community-spotlight">
        <div className="container">
          <div className="section-header">
            <div>
              <span className="section-subtitle">Farmer Community Forum</span>
              <h2 className="section-title heading-serif">Recent Crop Disease Diagnoses</h2>
            </div>
            <Link to="/community" className="btn btn-secondary">
              Go to Community Forum <IconArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-2">
            {communityPosts.slice(0, 2).map(post => (
              <div key={post.id} className="home-post-card card">
                <div className="home-post-header">
                  <div className="home-post-crop-badge">
                    <IconSprout size={14} /> {post.crop}
                  </div>
                  <span className="home-post-date">{post.createdAt}</span>
                </div>
                <h3 className="home-post-title">{post.title}</h3>
                <p className="home-post-snippet">{post.content}</p>
                {post.image && (
                  <div className="home-post-img-preview">
                    <img src={post.image} alt={post.crop} />
                    <span className="home-post-img-label">Crop Disease Photo</span>
                  </div>
                )}
                <div className="home-post-footer">
                  <span>By <strong>{post.authorName}</strong> ({post.authorLocation})</span>
                  <Link to={`/community/${post.id}`} className="view-replies-link">
                    {post.replies.length} Advisory Answers →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BOTTOM CTA BANNER */}
      <section className="bottom-cta-section">
        <div className="container bottom-cta-card">
          <div className="bottom-cta-text">
            <h2 className="heading-serif">Ready to trade agricultural produce with complete confidence?</h2>
            <p>Join thousands of farmers enjoying direct market access and customers relishing farm-fresh produce.</p>
          </div>
          <div className="bottom-cta-actions">
            <Link to="/register/farmer" className="btn btn-primary btn-lg">Farmer Registration</Link>
            <Link to="/register/customer" className="btn btn-secondary btn-lg">Customer Registration</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

