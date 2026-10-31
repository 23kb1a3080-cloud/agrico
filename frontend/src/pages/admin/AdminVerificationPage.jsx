import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Sidebar } from '../../components/Sidebar';
import { StatusBadge } from '../../components/StatusBadge';
import { Modal } from '../../components/Modal';
import { IconShield, IconCheck, IconCross, IconUpload } from '../../components/Icons';

export const AdminVerificationPage = () => {
  const { users, verifyFarmer } = useApp();
  const [selectedFarmer, setSelectedFarmer] = useState(null);
  const [docModalOpen, setDocModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('ALL');

  const farmers = users.filter(u => u.role === 'FARMER');

  const filteredFarmers = farmers.filter(f => {
    if (activeTab === 'ALL') return true;
    return f.verificationStatus === activeTab;
  });

  const handleInspect = (farmer) => {
    setSelectedFarmer(farmer);
    setDocModalOpen(true);
  };

  const handleApprove = (id) => {
    verifyFarmer(id, 'APPROVED', 'Form 1-B verified against State Land Revenue Record portal.');
    setDocModalOpen(false);
  };

  const handleReject = (id) => {
    const reason = prompt('State rejection reason for farmer notice:', 'Form 1-B scan is blurred / illegible');
    if (reason) {
      verifyFarmer(id, 'REJECTED', reason);
      setDocModalOpen(false);
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
                  State Land Revenue (1-B) & Aadhaar Verifications
                </h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                  Cross-check farmer ownership claims against official revenue records before granting seller access
                </p>
              </div>

              <div className="filter-tab-buttons">
                {['ALL', 'PENDING', 'APPROVED', 'REJECTED'].map(tab => (
                  <button
                    key={tab}
                    className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            <div className="table-container">
              <table className="agri-table">
                <thead>
                  <tr>
                    <th>Farmer Identity</th>
                    <th>Holding / Farm Location</th>
                    <th>Aadhaar Number</th>
                    <th>Documents On Record</th>
                    <th>Verification Status</th>
                    <th>Review Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredFarmers.map(farmer => (
                    <tr key={farmer.id}>
                      <td>
                        <strong>{farmer.name}</strong>
                        <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{farmer.phone}</div>
                      </td>
                      <td>
                        <div>{farmer.farmName}</div>
                        <span style={{ fontSize: '0.8rem', color: 'var(--primary-green)', fontWeight: 700 }}>
                          {farmer.farmSize} • {farmer.city}, {farmer.state}
                        </span>
                      </td>
                      <td>{farmer.aadhaarNumber}</td>
                      <td>
                        <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                          📄 {farmer.landDoc || '1b_extract.pdf'}
                        </div>
                        <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                          🪪 {farmer.aadhaarDoc || 'aadhaar.pdf'}
                        </div>
                      </td>
                      <td><StatusBadge type="verification" status={farmer.verificationStatus} /></td>
                      <td>
                        <button
                          className="btn btn-secondary btn-sm"
                          onClick={() => handleInspect(farmer)}
                        >
                          Inspect & Decide
                        </button>
                      </td>
                    </tr>
                  ))}
                  {filteredFarmers.length === 0 && (
                    <tr>
                      <td colSpan={6} style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
                        No records found for the selected verification filter.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>

      {/* INSPECT MODAL */}
      <Modal
        isOpen={docModalOpen}
        onClose={() => setDocModalOpen(false)}
        title={`Inspect Land Records - ${selectedFarmer?.name}`}
        maxWidth="600px"
      >
        {selectedFarmer && (
          <div>
            <div style={{ background: 'var(--surface-cream)', padding: '1.25rem', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.9rem' }}>
              <div><strong>Farmer Name:</strong> {selectedFarmer.name}</div>
              <div><strong>Registered Mobile:</strong> {selectedFarmer.phone}</div>
              <div><strong>Claimed Farm Acreage:</strong> {selectedFarmer.farmSize}</div>
              <div><strong>Location:</strong> {selectedFarmer.city}, {selectedFarmer.state}</div>
              <div><strong>Aadhaar Number:</strong> {selectedFarmer.aadhaarNumber}</div>
            </div>

            <h4 style={{ color: 'var(--dark-green)', marginBottom: '0.75rem' }}>Submitted Files</h4>
            <div className="grid grid-cols-2" style={{ marginBottom: '1.5rem' }}>
              <div style={{ border: '1px solid var(--border-cream)', padding: '1rem', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
                <IconShield size={24} color="var(--primary-green)" />
                <strong style={{ display: 'block', fontSize: '0.85rem', marginTop: '0.5rem' }}>
                  {selectedFarmer.landDoc || '1b_extract.pdf'}
                </strong>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Form 1-B Land Revenue RoR</span>
              </div>

              <div style={{ border: '1px solid var(--border-cream)', padding: '1rem', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
                <IconShield size={24} color="#0284c7" />
                <strong style={{ display: 'block', fontSize: '0.85rem', marginTop: '0.5rem' }}>
                  {selectedFarmer.aadhaarDoc || 'aadhaar.pdf'}
                </strong>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>UIDAI Aadhaar Copy</span>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', borderTop: '1px solid var(--border-light)', paddingTop: '1.25rem' }}>
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => handleReject(selectedFarmer.id)}
              >
                Reject Documents
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => handleApprove(selectedFarmer.id)}
              >
                ✓ Sanction & Approve Seller
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

