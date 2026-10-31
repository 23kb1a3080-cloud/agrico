import React from 'react';
import { Link } from 'react-router-dom';
import { IconLeaf, IconPhone, IconShield, IconSprout } from './Icons';
import './Footer.css';

export const Footer = () => {
  return (
    <footer className="footer-root">
      <div className="container footer-container">
        <div className="footer-grid">
          {/* Brand Info */}
          <div className="footer-col brand-col">
            <div className="footer-brand">
              <div className="footer-logo">
                <IconLeaf size={22} color="#ffffff" />
              </div>
              <span className="footer-title">AgriConnect</span>
            </div>
            <p className="footer-desc">
              Empowering Indian farmers by bridging local mandis and customers through verified identity, transparent pricing, organic certification, and peer-to-peer crop advisory.
            </p>
            <div className="kisan-helpline-card">
              <IconPhone size={20} color="#15803d" />
              <div>
                <span className="helpline-title">Kisan Call Centre (24x7)</span>
                <strong className="helpline-number">1800-180-1551</strong>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-col">
            <h4 className="footer-heading">Marketplace</h4>
            <ul className="footer-links">
              <li><Link to="/marketplace?farming_type=ORGANIC">Certified Organic Produce</Link></li>
              <li><Link to="/marketplace?category=Grains">Grains & Pulses</Link></li>
              <li><Link to="/marketplace?category=Vegetables">Fresh Seasonal Vegetables</Link></li>
              <li><Link to="/marketplace?category=Spices">Farm Fresh Spices</Link></li>
              <li><Link to="/marketplace">Bulk Mandi Inquiries</Link></li>
            </ul>
          </div>

          {/* Farmer Corner */}
          <div className="footer-col">
            <h4 className="footer-heading">Farmer Corner</h4>
            <ul className="footer-links">
              <li><Link to="/register/farmer">Register as Verified Farmer</Link></li>
              <li><Link to="/farmer/verification">1-B Land & Aadhaar Verification</Link></li>
              <li><Link to="/community">Crop Disease Community Forum</Link></li>
              <li><Link to="/crop-guidance">Pesticide & Bio-remedy Guide</Link></li>
              <li><Link to="/farmer/products">List Agricultural Produce</Link></li>
            </ul>
          </div>

          {/* Security & Verification Notice */}
          <div className="footer-col">
            <h4 className="footer-heading">Trust & Compliance</h4>
            <p className="footer-compliance-text">
              <IconShield size={16} color="#4caf50" />
              Every registered seller undergoes manual verification of State Land Revenue Records (1-B) and Aadhaar identity.
            </p>
            <ul className="footer-links">
              <li><Link to="/admin/verifications">Government & Admin Portal</Link></li>
              <li><a href="#terms">Fair Mandi Pricing Policy</a></li>
              <li><a href="#privacy">Organic Integrity Standards</a></li>
              <li><a href="#disclaimer">Pesticide Safety Disclaimers</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} AgriConnect. All rights reserved. Built with standard HTML, CSS, and React JS.</p>
          <div className="footer-bottom-links">
            <span className="badge badge-organic">
              <IconSprout size={12} /> Desi & Organic Agriculture First
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

