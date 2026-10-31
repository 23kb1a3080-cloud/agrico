import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  IconLeaf,
  IconSprout,
  IconSearch,
  IconCheck,
  IconArrowRight
} from '../../components/Icons';
import './CropGuidance.css';

export const CropGuidancePage = () => {
  const { cropGuides } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCrop, setActiveCrop] = useState('ALL');

  const filteredGuides = cropGuides.filter(g => {
    if (activeCrop !== 'ALL' && !g.crop.toLowerCase().includes(activeCrop.toLowerCase())) {
      return false;
    }
    if (searchTerm) {
      const matchSearch = g.disease.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          g.crop.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          g.symptoms.toLowerCase().includes(searchTerm.toLowerCase());
      if (!matchSearch) return false;
    }
    return true;
  });

  return (
    <div className="container page-wrapper">
      <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 2.5rem' }}>
        <span className="section-subtitle">Plant Pathology & Organic Agronomy</span>
        <h1 className="heading-serif" style={{ color: 'var(--dark-green)', fontSize: '2.4rem', marginBottom: '0.75rem' }}>
          Crop Disease & Integrated Pest Management
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: '1.6' }}>
          Access verified biological solutions, organic preparations (Jeevamrutha / Neem Oil), and scientific chemical dosages for major Indian crops.
        </p>
      </div>

      {/* SEARCH AND FILTERS */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ flexGrow: 1, minWidth: '280px', position: 'relative' }}>
          <input
            type="text"
            className="form-control"
            placeholder="Search symptoms or disease (e.g. Blight, Rust, Leaf curl, Aphids)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ paddingLeft: '2.4rem', height: '46px' }}
          />
          <IconSearch
            size={18}
            style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}
          />
        </div>

        <div className="filter-tab-buttons">
          {['ALL', 'Tomato', 'Paddy', 'Cotton', 'Vegetables'].map(c => (
            <button
              key={c}
              className={`tab-btn ${activeCrop === c ? 'active' : ''}`}
              onClick={() => setActiveCrop(c)}
            >
              {c === 'ALL' ? 'All Crops' : c}
            </button>
          ))}
        </div>
      </div>

      {/* GUIDANCE CARDS */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {filteredGuides.map(guide => (
          <div key={guide.id} className="advisory-card">
            <div className="advisory-header">
              <div>
                <span className="advisory-crop-tag">
                  <IconSprout size={13} /> {guide.crop}
                </span>
                <h3 className="advisory-title">{guide.disease}</h3>
              </div>
              <span className="badge badge-organic">
                GAP & ICAR Standards
              </span>
            </div>

            {/* SYMPTOMS */}
            <div>
              <strong style={{ fontSize: '0.88rem', textTransform: 'uppercase', color: 'var(--warm-earth)', letterSpacing: '0.04em', display: 'block', marginBottom: '0.25rem' }}>
                Field Symptoms & Diagnostic Clues
              </strong>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', margin: 0 }}>
                {guide.symptoms}
              </p>
            </div>

            {/* REMEDY 2-COL GRID */}
            <div className="remedy-grid">
              <div className="remedy-box remedy-organic">
                <div className="remedy-title" style={{ color: '#15803d' }}>
                  <IconLeaf size={16} /> 1. Certified Bio / Organic Remedy
                </div>
                <p style={{ margin: 0 }}>{guide.organicRemedy}</p>
              </div>

              <div className="remedy-box remedy-chemical">
                <div className="remedy-title" style={{ color: '#b45309' }}>
                  🧪 2. Recommended Chemical Spray (Emergency)
                </div>
                <p style={{ margin: 0 }}>{guide.chemicalRemedy}</p>
              </div>
            </div>

            {/* PREVENTIVE PRACTICES */}
            <div style={{ background: 'var(--surface-cream)', padding: '0.85rem 1.15rem', borderRadius: 'var(--radius-md)', fontSize: '0.88rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <IconCheck size={18} color="#15803d" style={{ flexShrink: 0 }} />
              <span><strong>Preventive Cultural Practice:</strong> {guide.preventiveTips}</span>
            </div>
          </div>
        ))}

        {filteredGuides.length === 0 && (
          <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
            <p style={{ color: 'var(--text-muted)' }}>No disease guide found matching "{searchTerm}".</p>
            <Link to="/community" className="btn btn-outline btn-sm" style={{ marginTop: '0.5rem' }}>
              Ask the Farmer Community Directly
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

