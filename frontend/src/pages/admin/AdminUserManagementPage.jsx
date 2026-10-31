import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Sidebar } from '../../components/Sidebar';
import { StatusBadge } from '../../components/StatusBadge';
import { IconUser } from '../../components/Icons';

export const AdminUserManagementPage = () => {
  const { users, toggleUserStatus } = useApp();
  const [roleFilter, setRoleFilter] = useState('ALL');

  const filteredUsers = users.filter(u => {
    if (roleFilter === 'ALL') return true;
    return u.role === roleFilter;
  });

  return (
    <div className="container page-wrapper">
      <div className="dashboard-layout">
        <Sidebar />

        <main className="dashboard-main">
          <div className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <h2 className="heading-serif" style={{ color: 'var(--dark-green)' }}>
                  Platform User Directory & Access Control
                </h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                  Manage registered farmers, customers, and administrative staff accounts
                </p>
              </div>

              <div className="filter-tab-buttons">
                {['ALL', 'FARMER', 'CUSTOMER', 'ADMIN'].map(r => (
                  <button
                    key={r}
                    className={`tab-btn ${roleFilter === r ? 'active' : ''}`}
                    onClick={() => setRoleFilter(r)}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            <div className="table-container">
              <table className="agri-table">
                <thead>
                  <tr>
                    <th>User / Name</th>
                    <th>Email Address</th>
                    <th>Role</th>
                    <th>Location</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map(user => (
                    <tr key={user.id}>
                      <td>
                        <strong>{user.name}</strong>
                        <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{user.phone}</div>
                      </td>
                      <td>{user.email}</td>
                      <td>
                        <span className="badge" style={{ background: '#f1f5f9', color: '#334155' }}>
                          {user.role}
                        </span>
                      </td>
                      <td>{user.city || 'N/A'}, {user.state || ''}</td>
                      <td>
                        {user.isBlocked ? (
                          <span className="badge badge-rejected">Suspended</span>
                        ) : (
                          <span className="badge badge-approved">Active</span>
                        )}
                      </td>
                      <td>
                        <button
                          className={`btn btn-sm ${user.isBlocked ? 'btn-primary' : 'btn-danger'}`}
                          onClick={() => toggleUserStatus(user.id)}
                        >
                          {user.isBlocked ? 'Reactivate' : 'Suspend'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

