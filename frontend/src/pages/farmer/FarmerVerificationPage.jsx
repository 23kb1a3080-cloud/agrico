import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import { Sidebar } from '../../components/Sidebar';
import { StatusBadge } from '../../components/StatusBadge';
import {
  IconShield,
  IconCheck,
  IconClock,
  IconUpload,
  IconBox
} from '../../components/Icons';

export const FarmerVerificationPage = () => {
  const { user } = useAuth();
  const { submitFarmerDocuments } = useApp();

  const [resubmitOpen, setResubmitOpen] = useState(false);
  const [aadhaarNumber, setAadhaarNumber] = useState(user?.aadhaarNumber || '5489-3210-9874');
  const [farmSize, setFarmSize] = useState(user?.farmSize || '10.5');
  const [message, setMessage] = useState('');

  const status = user?.verificationStatus || 'PENDING';
  const isApproved = status === 'APPROVED';

  const handleResubmit = (e) => {
    e.preventDefault();
    submitFarmerDocuments(user.id, {
      aadhaarNumber,
      farmSize: `${farmSize} Acres`,
      aadhaarDoc: 'reuploaded_aadhaar_card.pdf',
      landDoc: 'reuploaded_1b_patwari_extract.pdf'
    });
    setMessage('Your updated land records and Aadhaar documents have been re-submitted to the Admin queue.');
    setResubmitOpen(false);
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
                  Farmer Verification & Land Compliance
                </h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                  Statutory verification using State Revenue Land Records (Form 1-B) & UIDAI Aadhaar
                </p>
              </div>
              <StatusBadge type="verification" status={status} />
            </div>

            {message && (
              <div style={{ background: '#dcfce7', border: '1px solid #86efac', color: '#166534', padding: '0.85rem 1rem', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
                <IconCheck size={16} /> {message}
              </div>
            )}

            {/* PROGRESS TIMELINE */}
            <div style={{ background: 'var(--surface-cream)', border: '1px solid var(--border-cream)', borderRadius: 'var(--radius-md)', padding: '1.5rem', marginBottom: '2rem' }}>
              <h4 style={{ color: 'var(--dark-green)', marginBottom: '1rem' }}>Verification Milestones</h4>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', textAlign: 'center' }}>
                <div style={{ background: '#ffffff', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
                  <div style={{ color: '#16a34a', fontWeight: 800, marginBottom: '0.25rem' }}>✓ Step 1</div>
                  <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>Document Submission</div>
                  <small style={{ color: 'var(--text-muted)' }}>Aadhaar & Form 1-B Uploaded</small>
                </div>

                <div style={{ background: '#ffffff', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
                  <div style={{ color: isApproved ? '#16a34a' : '#b45309', fontWeight: 800, marginBottom: '0.25rem' }}>
                    {isApproved ? '✓ Step 2' : '⏳ Step 2'}
                  </div>
                  <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>Revenue Department Match</div>
                  <small style={{ color: 'var(--text-muted)' }}>Survey & Khatauni Crosscheck</small>
                </div>

                <div style={{ background: '#ffffff', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
                  <div style={{ color: isApproved ? '#16a34a' : '#64748b', fontWeight: 800, marginBottom: '0.25rem' }}>
                    {isApproved ? '✓ Step 3' : '3'}
                  </div>
                  <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>Marketplace Authorization</div>
                  <small style={{ color: 'var(--text-muted)' }}>Verified Seller Badge Awarded</small>
                </div>
              </div>
            </div>

            {/* DOCUMENTS ON FILE */}
            <div className="grid grid-cols-2" style={{ marginBottom: '2rem' }}>
              <div style={{ border: '1px solid var(--border-cream)', padding: '1.25rem', borderRadius: 'var(--radius-md)', background: '#ffffff' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                  <div style={{ width: '40px', height: '40px', background: 'var(--pale-green)', borderRadius: 'var(--radius-sm)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <IconShield size={20} color="var(--primary-green)" />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '0.95rem' }}>Form 1-B Land Revenue Record</h4>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>State RoR (Record of Rights)</span>
                  </div>
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                  <strong>File:</strong> {user?.landDoc || '1b_land_record_patwari.pdf'}
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  <strong>Registered Acreage:</strong> {user?.farmSize || '10.5 Acres'}
                </div>
              </div>

              <div style={{ border: '1px solid var(--border-cream)', padding: '1.25rem', borderRadius: 'var(--radius-md)', background: '#ffffff' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                  <div style={{ width: '40px', height: '40px', background: '#e0f2fe', borderRadius: 'var(--radius-sm)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <IconShield size={20} color="#0284c7" />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '0.95rem' }}>Government Aadhaar Card</h4>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Identity & Biometric Reference</span>
                  </div>
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                  <strong>Aadhaar Number:</strong> {user?.aadhaarNumber || 'XXXX-XXXX-4589'}
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  <strong>File:</strong> {user?.aadhaarDoc || 'aadhaar_scanned_copy.pdf'}
                </div>
              </div>
            </div>

            {/* ACTION FOOTER */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-light)', paddingTop: '1.25rem', flexWrap: 'wrap', gap: '1rem' }}>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                {isApproved
                  ? 'Your land records are verified until Oct 2027. No further action needed.'
                  : 'Administrators process verification requests within 24–48 working hours.'}
              </div>
              <button
                className="btn btn-secondary btn-sm"
                onClick={() => setResubmitOpen(!resubmitOpen)}
              >
                {resubmitOpen ? 'Cancel' : 'Update / Re-submit Land Records'}
              </button>
            </div>

            {/* RESUBMIT FORM */}
            {resubmitOpen && (
              <form onSubmit={handleResubmit} style={{ marginTop: '1.5rem', background: 'var(--surface-cream)', padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-cream)' }}>
                <h4 style={{ color: 'var(--dark-green)', marginBottom: '1rem' }}>Update Document Uploads</h4>
                <div className="grid grid-cols-2">
                  <div className="form-group">
                    <label className="form-label">Aadhaar Number</label>
                    <input
                      type="text"
                      className="form-control"
                      value={aadhaarNumber}
                      onChange={(e) => setAadhaarNumber(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Land Size in Acres</label>
                    <input
                      type="number"
                      step="0.1"
                      className="form-control"
                      value={farmSize}
                      onChange={(e) => setFarmSize(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Select Fresh Form 1-B / RoR Document (PDF)</label>
                  <div className="upload-dropzone" style={{ padding: '1rem' }}>
                    <IconUpload size={20} color="var(--primary-green)" />
                    <span style={{ fontSize: '0.85rem', color: 'var(--primary-green)', fontWeight: 600, display: 'block', marginTop: '0.25rem' }}>
                      reuploaded_1b_patwari_extract.pdf
                    </span>
                  </div>
                </div>
                <button type="submit" className="btn btn-primary btn-sm">
                  Save and Resubmit to Admin
                </button>
              </form>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

