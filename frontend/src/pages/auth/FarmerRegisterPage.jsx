import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { IconTractor, IconUpload, IconCheck, IconShield } from '../../components/Icons';
import './Auth.css';

export const FarmerRegisterPage = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    farmName: '',
    state: 'Maharashtra',
    city: '',
    farmSize: '5.0',
    aadhaarNumber: '',
    aadhaarDoc: 'aadhaar_card_scanned.pdf',
    landDoc: 'land_record_1b_patwari.pdf'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    register({
      ...formData,
      role: 'FARMER',
      verificationStatus: 'PENDING',
      submittedAt: new Date().toISOString().split('T')[0]
    });
    navigate('/farmer/verification');
  };

  return (
    <div className="auth-page-root">
      <div className="auth-card" style={{ maxWidth: '640px' }}>
        <div className="auth-header">
          <div className="auth-logo-badge">
            <IconTractor size={30} color="#15803d" />
          </div>
          <h2 className="auth-title heading-serif">Farmer Onboarding & Registration</h2>
          <p className="auth-subtitle">
            Upload your land records (1-B) & Aadhaar to start selling directly to consumers
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* PERSONAL INFO */}
          <h4 style={{ color: 'var(--dark-green)', marginBottom: '1rem', borderBottom: '1px solid var(--border-light)', paddingBottom: '0.4rem' }}>
            1. Personal Credentials
          </h4>
          <div className="grid grid-cols-2">
            <div className="form-group">
              <label className="form-label">Full Name (As per Land Records)*</label>
              <input
                type="text"
                name="name"
                className="form-control"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Ramesh Shankar Patel"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Active Mobile Number (For OTP/Buyer)*</label>
              <input
                type="tel"
                name="phone"
                className="form-control"
                required
                value={formData.phone}
                onChange={handleChange}
                placeholder="e.g. +91 98765 43210"
              />
            </div>
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
                placeholder="kisan@gmail.com"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Create Password*</label>
              <input
                type="password"
                name="password"
                className="form-control"
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="Minimum 6 characters"
              />
            </div>
          </div>

          {/* FARM INFO */}
          <h4 style={{ color: 'var(--dark-green)', margin: '1.25rem 0 1rem', borderBottom: '1px solid var(--border-light)', paddingBottom: '0.4rem' }}>
            2. Farm Details
          </h4>
          <div className="grid grid-cols-2">
            <div className="form-group">
              <label className="form-label">Farm / Krishi Kendra Name</label>
              <input
                type="text"
                name="farmName"
                className="form-control"
                value={formData.farmName}
                onChange={handleChange}
                placeholder="e.g. Shri Krishna Agro Farm"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Total Land Holding (Acres)*</label>
              <input
                type="number"
                step="0.1"
                name="farmSize"
                className="form-control"
                required
                value={formData.farmSize}
                onChange={handleChange}
                placeholder="e.g. 8.5"
              />
            </div>
          </div>

          <div className="grid grid-cols-2">
            <div className="form-group">
              <label className="form-label">State*</label>
              <select name="state" className="form-control" value={formData.state} onChange={handleChange}>
                <option value="Maharashtra">Maharashtra</option>
                <option value="Punjab">Punjab</option>
                <option value="Andhra Pradesh">Andhra Pradesh</option>
                <option value="Madhya Pradesh">Madhya Pradesh</option>
                <option value="Karnataka">Karnataka</option>
                <option value="Gujarat">Gujarat</option>
                <option value="Uttar Pradesh">Uttar Pradesh</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">District / Tehsil / City*</label>
              <input
                type="text"
                name="city"
                className="form-control"
                required
                value={formData.city}
                onChange={handleChange}
                placeholder="e.g. Nashik"
              />
            </div>
          </div>

          {/* VERIFICATION DOCUMENTS */}
          <h4 style={{ color: 'var(--dark-green)', margin: '1.25rem 0 1rem', borderBottom: '1px solid var(--border-light)', paddingBottom: '0.4rem' }}>
            3. Verification & Compliance Documents
          </h4>
          <div className="form-group">
            <label className="form-label">12-Digit Aadhaar Number*</label>
            <input
              type="text"
              name="aadhaarNumber"
              className="form-control"
              required
              maxLength={14}
              value={formData.aadhaarNumber}
              onChange={handleChange}
              placeholder="e.g. 5489-3210-9874"
            />
          </div>

          <div className="grid grid-cols-2">
            <div className="form-group">
              <label className="form-label">Aadhaar Card Copy (PDF/JPG)*</label>
              <div className="upload-dropzone">
                <IconUpload size={22} color="var(--primary-green)" />
                <div className="upload-file-info">
                  <IconCheck size={16} color="#16a34a" /> {formData.aadhaarDoc}
                </div>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Form 1-B Land Revenue Record*</label>
              <div className="upload-dropzone">
                <IconUpload size={22} color="var(--primary-green)" />
                <div className="upload-file-info">
                  <IconCheck size={16} color="#16a34a" /> {formData.landDoc}
                </div>
              </div>
            </div>
          </div>

          <div style={{ background: '#f8fafc', padding: '0.85rem', borderRadius: 'var(--radius-md)', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '1.5rem', display: 'flex', gap: '0.5rem' }}>
            <IconShield size={18} color="var(--primary-green)" />
            <span>
              By registering, you confirm that documents submitted correspond to genuine agricultural land. Listing produce requires administrative approval.
            </span>
          </div>

          <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%' }}>
            Submit Documents & Create Farmer Account
          </button>
        </form>

        <div className="auth-footer">
          <p>Already have an approved account? <Link to="/login">Sign In</Link></p>
        </div>
      </div>
    </div>
  );
};

