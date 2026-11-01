import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Sidebar } from '../../components/Sidebar';
import { StatusBadge } from '../../components/StatusBadge';
import {
  IconShield,
  IconTractor,
  IconUser,
  IconBox,
  IconCheck,
  IconArrowRight
} from '../../components/Icons';

export const AdminDashboard = () => {
  const { users, products, communityPosts, verifyFarmer } = useApp();

  const farmers = users.filter(u => u.role === 'FARMER');
  const pendingFarmers = farmers.filter(u => u.verificationStatus === 'PENDING');
  const approvedFarmers = farmers.filter(u => u.verificationStatus === 'APPROVED');

  const handleQuickApprove = (id) => {
    verifyFarmer(id, 'APPROVED', 'Form 1-B verified against State Land Revenue Portal.');
  };

  const handleQuickReject = (id) => {
    const remark = prompt('Reason for rejection (e.g. illegible scan, mismatched survey number):', 'Illegible land document');
    if (remark) {
      verifyFarmer(id, 'REJECTED', remark);
    }
  };

  return (
    <div className="container page-wrapper">
      <div className="dashboard-layout">
        <Sidebar />

        <main className="dashboard-main">
          {/* HEADER BANNER */}
          <div className="card" style={{ background: '#f8fafc', borderLeft: '4px solid var(--dark-green)' }}>
            <h2 className="heading-serif" style={{ color: 'var(--dark-green)', margin: 0 }}>
              Government Agriculture Administrator Console
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.25rem' }}>
              Authentication of farmer land revenue records (1-B), market price regulation, and content moderation
            </p>
          </div>

          {/* KPIS */}
          <div className="admin-kpi-grid">
            <div className="kpi-card">
              <div className="kpi-icon-wrap" style={{ background: '#fef3c7' }}>
                <IconShield size={24} color="#b45309" />
              </div>
              <div>
                <div className="kpi-val">{pendingFarmers.length}</div>
                <div className="kpi-title">Pending 1-B Approvals</div>
              </div>
            </div>

            <div className="kpi-card">
              <div className="kpi-icon-wrap" style={{ background: '#dcfce7' }}>
                <IconTractor size={24} color="#15803d" />
              </div>
              <div>
                <div className="kpi-val">{approvedFarmers.length}</div>
                <div className="kpi-title">Verified Farmers</div>
              </div>
            </div>

            <div className="kpi-card">
              <div className="kpi-icon-wrap" style={{ background: '#e0f2fe' }}>
                <IconBox size={24} color="#0284c7" />
              </div>
              <div>
                <div className="kpi-val">{products.length}</div>
                <div className="kpi-title">Active Produce Listings</div>
              </div>
            </div>

            <div className="kpi-card">
              <div className="kpi-icon-wrap" style={{ background: '#f3e8ff' }}>
                <IconUser size={24} color="#9333ea" />
              </div>
              <div>
                <div className="kpi-val">{users.length}</div>
                <div className="kpi-title">Registered Accounts</div>
              </div>
            </div>
          </div>

          {/* PENDING VERIFICATION QUEUE */}
          <section className="card">
            <div className="dashboard-section-header">
              <div>
                <h3 className="dashboard-section-title">Pending Farmer Verification Queue</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  Aadhaar cards and Form 1-B land revenue records awaiting official sanction
                </p>
              </div>
              <Link to="/admin/verifications" className="btn btn-outline btn-sm">
                Full Verification Desk ({pendingFarmers.length}) <IconArrowRight size={14} />
              </Link>
            </div>

            <div className="table-container">
              <table className="agri-table">
                <thead>
                  <tr>
                    <th>Farmer Name</th>
                    <th>Farm Name & Acreage</th>
                    <th>Aadhaar Number</th>
                    <th>Uploaded Documents</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {pendingFarmers.map(farmer => (
                    <tr key={farmer.id}>
                      <td>
                        <strong>{farmer.name}</strong>
                        <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                          {farmer.city}, {farmer.state}
                        </div>
                      </td>
                      <td>
                        <div>{farmer.farmName || 'Kisan Agro'}</div>
                        <small style={{ color: 'var(--primary-green)', fontWeight: 700 }}>{farmer.farmSize}</small>
                      </td>
                      <td>{farmer.aadhaarNumber}</td>
                      <td>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                          📄 {farmer.landDoc || '1b_extract.pdf'}
                        </div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                          🪪 {farmer.aadhaarDoc || 'aadhaar.pdf'}
                        </div>
                      </td>
                      <td><StatusBadge type="verification" status={farmer.verificationStatus} /></td>
                      <td>
                        <div style={{ display: 'flex', gap: '0.4rem' }}>
                          <button
                            className="btn btn-primary btn-sm"
                            onClick={() => handleQuickApprove(farmer.id)}
                          >
                            Approve
                          </button>
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => handleQuickReject(farmer.id)}
                          >
                            Reject
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {pendingFarmers.length === 0 && (
                    <tr>
                      <td colSpan={6} style={{ textAlign: 'center', padding: '2.5rem', color: '#16a34a' }}>
                        ✓ All farmer verification requests have been cleared and sanctioned!
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>

          {/* QUICK LINKS */}
          <div className="grid grid-cols-2">
            <div className="card">
              <h4 style={{ color: 'var(--dark-green)', marginBottom: '0.5rem' }}>Platform User Directory</h4>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                Review, filter, and lock accounts across Farmers and Customers.
              </p>
              <Link to="/admin/users" className="btn btn-secondary btn-sm">
                Open User Management
              </Link>
            </div>

            <div className="card">
              <h4 style={{ color: 'var(--dark-green)', marginBottom: '0.5rem' }}>Catalog & Forum Moderation</h4>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                Inspect chemical pesticide advice and regulate organic produce pricing.
              </p>
              <Link to="/admin/moderation" className="btn btn-secondary btn-sm">
                Open Moderation Desk
              </Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

