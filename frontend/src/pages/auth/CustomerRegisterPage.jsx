import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { IconUser, IconLeaf } from '../../components/Icons';
import './Auth.css';

export const CustomerRegisterPage = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    address: '',
    city: '',
    state: 'Maharashtra',
    pincode: '',
    prefersOrganic: true
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    register({
      ...formData,
      role: 'CUSTOMER'
    });
    navigate('/marketplace');
  };

  return (
    <div className="auth-page-root">
      <div className="auth-card" style={{ maxWidth: '560px' }}>
        <div className="auth-header">
          <div className="auth-logo-badge">
            <IconUser size={28} color="#15803d" />
          </div>
          <h2 className="auth-title heading-serif">Create Customer Account</h2>
          <p className="auth-subtitle">
            Order fresh produce straight from verified farms with zero middleman markups
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Full Name*</label>
            <input
              type="text"
              name="name"
              className="form-control"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Pooja Sharma"
            />
          </div>

          <div className="grid grid-cols-2">
            <div className="form-group">
              <label className="form-label">Email Address*</label>
              <input
                type="email"
                name="email"
                className="form-control"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="pooja@gmail.com"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Mobile Number*</label>
              <input
                type="tel"
                name="phone"
                className="form-control"
                required
                value={formData.phone}
                onChange={handleChange}
                placeholder="+91 99887 76655"
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Password*</label>
            <input
              type="password"
              name="password"
              className="form-control"
              required
              value={formData.password}
              onChange={handleChange}
              placeholder="At least 6 characters"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Delivery Address / Flat / Street*</label>
            <textarea
              name="address"
              className="form-control"
              rows={2}
              required
              value={formData.address}
              onChange={handleChange}
              placeholder="e.g. B-402, Green Meadows, Andheri West"
            />
          </div>

          <div className="grid grid-cols-3">
            <div className="form-group">
              <label className="form-label">City*</label>
              <input
                type="text"
                name="city"
                className="form-control"
                required
                value={formData.city}
                onChange={handleChange}
                placeholder="Mumbai"
              />
            </div>
            <div className="form-group">
              <label className="form-label">State*</label>
              <input
                type="text"
                name="state"
                className="form-control"
                required
                value={formData.state}
                onChange={handleChange}
                placeholder="Maharashtra"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Pincode*</label>
              <input
                type="text"
                name="pincode"
                className="form-control"
                required
                value={formData.pincode}
                onChange={handleChange}
                placeholder="400053"
              />
            </div>
          </div>

          <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginTop: '0.5rem' }}>
            <input
              type="checkbox"
              id="prefersOrganic"
              name="prefersOrganic"
              checked={formData.prefersOrganic}
              onChange={handleChange}
              style={{ width: '18px', height: '18px', accentColor: 'var(--primary-green)' }}
            />
            <label htmlFor="prefersOrganic" style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', cursor: 'pointer' }}>
              Notify me about certified organic harvests in my state
            </label>
          </div>

          <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%', marginTop: '0.75rem' }}>
            Register & Start Shopping
          </button>
        </form>

        <div className="auth-footer">
          <p>Already a registered customer? <Link to="/login">Log In</Link></p>
        </div>
      </div>
    </div>
  );
};

