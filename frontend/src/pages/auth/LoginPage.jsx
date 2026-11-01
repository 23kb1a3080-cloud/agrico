import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { IconLeaf, IconTractor, IconUser, IconShield } from '../../components/Icons';

export const LoginPage = () => {
  const [role, setRole] = useState('FARMER');
  const [email, setEmail] = useState('ramesh@kisan.com');
  const [password, setPassword] = useState('kisan123');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleRoleTab = (selectedRole) => {
    setRole(selectedRole);
    if (selectedRole === 'FARMER') {
      setEmail('ramesh@kisan.com');
      setPassword('kisan123');
    } else if (selectedRole === 'CUSTOMER') {
      setEmail('pooja@gmail.com');
      setPassword('pooja123');
    } else if (selectedRole === 'ADMIN') {
      setEmail('admin@agriconnect.gov.in');
      setPassword('admin123');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login(role, email, password);
    if (role === 'FARMER') navigate('/farmer/dashboard');
    else if (role === 'ADMIN') navigate('/admin/dashboard');
    else navigate('/customer/dashboard');
  };

  return (
    <div className="auth-page-root">
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-logo-badge">
            <IconLeaf size={28} color="#15803d" />
          </div>
          <h2 className="auth-title heading-serif">Welcome Back to AgriConnect</h2>
          <p className="auth-subtitle">Select your account role to sign in to your portal</p>
        </div>

        {/* ROLE TABS */}
        <div className="auth-role-tabs">
          <button
            type="button"
            className={`role-tab-btn ${role === 'FARMER' ? 'active' : ''}`}
            onClick={() => handleRoleTab('FARMER')}
          >
            <IconTractor size={16} /> Farmer
          </button>
          <button
            type="button"
            className={`role-tab-btn ${role === 'CUSTOMER' ? 'active' : ''}`}
            onClick={() => handleRoleTab('CUSTOMER')}
          >
            <IconUser size={16} /> Customer
          </button>
          <button
            type="button"
            className={`role-tab-btn ${role === 'ADMIN' ? 'active' : ''}`}
            onClick={() => handleRoleTab('ADMIN')}
          >
            <IconShield size={16} /> Admin
          </button>
        </div>

        {/* DEMO AUTOFILL BANNER */}
        <div className="demo-credentials-pill">
          <div className="demo-credentials-text">
            <strong>Demo {role} Access:</strong>
            <span>{email} / {password}</span>
          </div>
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={() => handleRoleTab(role)}
          >
            Autofill
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Registered Email Address</label>
            <input
              type="email"
              className="form-control"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. kisan@agriconnect.com"
            />
          </div>

          <div className="form-group">
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
              <label className="form-label" style={{ margin: 0 }}>Password</label>
              <a href="#forgot" style={{ fontSize: '0.8rem', color: 'var(--primary-green)' }}>Forgot?</a>
            </div>
            <input
              type="password"
              className="form-control"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your secret password"
            />
          </div>

          <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%', marginTop: '0.5rem' }}>
            Sign In as {role === 'FARMER' ? 'Farmer' : role === 'ADMIN' ? 'Administrator' : 'Customer'}
          </button>
        </form>

        <div className="auth-footer">
          {role === 'FARMER' ? (
            <p>New farmer without an account? <Link to="/register/farmer">Register with Land Record</Link></p>
          ) : role === 'CUSTOMER' ? (
            <p>Don't have a customer account? <Link to="/register/customer">Sign up for Fresh Harvest</Link></p>
          ) : (
            <p>Official Government Admin Portal. Authorized agricultural officers only.</p>
          )}
        </div>
      </div>
    </div>
  );
};

