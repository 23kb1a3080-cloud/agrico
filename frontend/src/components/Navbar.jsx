import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import {
  IconLeaf,
  IconTractor,
  IconCart,
  IconUser,
  IconShield,
  IconMessage,
  IconMenu,
  IconClose,
  IconSprout
} from './Icons';
import './Navbar.css';

export const Navbar = () => {
  const { user, isAuthenticated, logout, switchRole } = useAuth();
  const { getCartCount } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleRoleChange = (e) => {
    const role = e.target.value;
    switchRole(role);
    if (role === 'FARMER') navigate('/farmer/dashboard');
    else if (role === 'CUSTOMER') navigate('/customer/dashboard');
    else if (role === 'ADMIN') navigate('/admin/dashboard');
  };

  const getDashboardPath = () => {
    if (!user) return '/login';
    if (user.role === 'FARMER') return '/farmer/dashboard';
    if (user.role === 'ADMIN') return '/admin/dashboard';
    return '/customer/dashboard';
  };

  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <header className="navbar-header">
      {/* Top Notification / Role Switcher Strip */}
      <div className="navbar-topbar">
        <div className="container topbar-content">
          <div className="topbar-left">
            <span className="topbar-badge">
              <IconSprout size={14} /> Direct Farmer-to-Consumer Platform
            </span>
            <span className="topbar-phone">Kisan Sahayata: 1800-180-1551 (Toll-Free)</span>
          </div>

          <div className="topbar-right">
            <label className="role-switch-label">
              <span>View Mode:</span>
              <select
                className="role-switch-select"
                value={user?.role || 'GUEST'}
                onChange={handleRoleChange}
              >
                <option value="FARMER">🧑‍🌾 Farmer View</option>
                <option value="CUSTOMER">🛒 Customer View</option>
                <option value="ADMIN">🛡️ Admin View</option>
              </select>
            </label>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="navbar-main">
        <div className="container navbar-container">
          {/* Logo */}
          <Link to="/" className="navbar-brand" onClick={closeMenu}>
            <div className="brand-logo-icon">
              <IconLeaf size={24} color="#ffffff" />
            </div>
            <div className="brand-text">
              <span className="brand-title">Agri<span className="brand-title-accent">Connect</span></span>
              <span className="brand-subtitle">Krishi Vikas & Bazaar</span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="navbar-links">
            <Link
              to="/marketplace"
              className={`nav-link ${location.pathname === '/marketplace' ? 'active' : ''}`}
            >
              Marketplace
            </Link>
            <Link
              to="/community"
              className={`nav-link ${location.pathname.startsWith('/community') ? 'active' : ''}`}
            >
              Farmer Community
            </Link>
            <Link
              to="/crop-guidance"
              className={`nav-link ${location.pathname === '/crop-guidance' ? 'active' : ''}`}
            >
              Crop & Pest Guidance
            </Link>
            {isAuthenticated && (
              <Link
                to="/messages"
                className={`nav-link ${location.pathname === '/messages' ? 'active' : ''}`}
              >
                Messages
              </Link>
            )}
          </div>

          {/* Actions & Profile */}
          <div className="navbar-actions">
            {/* Cart Icon (Customer) */}
            <Link to="/cart" className="action-btn cart-btn" title="View Cart">
              <IconCart size={20} />
              {getCartCount() > 0 && <span className="cart-badge">{getCartCount()}</span>}
            </Link>

            {isAuthenticated ? (
              <div className="user-profile-menu">
                <Link to={getDashboardPath()} className="btn btn-outline btn-sm">
                  {user.role === 'FARMER' && <IconTractor size={16} />}
                  {user.role === 'ADMIN' && <IconShield size={16} />}
                  {user.role === 'CUSTOMER' && <IconUser size={16} />}
                  <span>{user.name.split(' ')[0]} ({user.role})</span>
                </Link>
                <button
                  onClick={() => { logout(); navigate('/'); }}
                  className="btn btn-secondary btn-sm"
                  title="Logout"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="auth-buttons">
                <Link to="/login" className="btn btn-outline btn-sm">Login</Link>
                <Link to="/register/customer" className="btn btn-primary btn-sm">Join Us</Link>
              </div>
            )}

            {/* Mobile Hamburger Button */}
            <button
              className="mobile-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <IconClose size={24} /> : <IconMenu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Slide-out Menu */}
        {mobileMenuOpen && (
          <div className="mobile-menu">
            <Link to="/marketplace" className="mobile-nav-link" onClick={closeMenu}>
              🛒 Browse Marketplace
            </Link>
            <Link to="/community" className="mobile-nav-link" onClick={closeMenu}>
              🌾 Farmer Community & Questions
            </Link>
            <Link to="/crop-guidance" className="mobile-nav-link" onClick={closeMenu}>
              🧪 Crop Disease & Pesticide Advisory
            </Link>
            <Link to="/messages" className="mobile-nav-link" onClick={closeMenu}>
              💬 Direct Inquiries
            </Link>
            <Link to={getDashboardPath()} className="mobile-nav-link" onClick={closeMenu}>
              📊 My Dashboard ({user?.role || 'Guest'})
            </Link>
            <div className="mobile-menu-divider" />
            {!isAuthenticated ? (
              <div className="mobile-auth-actions">
                <Link to="/login" className="btn btn-outline" onClick={closeMenu}>Login</Link>
                <Link to="/register/farmer" className="btn btn-primary" onClick={closeMenu}>Register as Farmer</Link>
                <Link to="/register/customer" className="btn btn-secondary" onClick={closeMenu}>Register as Customer</Link>
              </div>
            ) : (
              <button
                onClick={() => { logout(); closeMenu(); navigate('/'); }}
                className="btn btn-danger"
              >
                Sign Out
              </button>
            )}
          </div>
        )}
      </nav>
    </header>
  );
};

