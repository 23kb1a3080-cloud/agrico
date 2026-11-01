import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  IconTractor,
  IconShield,
  IconBox,
  IconCart,
  IconMessage,
  IconSprout,
  IconUser,
  IconCheck
} from './Icons';

export const Sidebar = () => {
  const { user } = useAuth();
  const role = user?.role || 'CUSTOMER';

  return (
    <aside className="dashboard-sidebar">
      <div className="sidebar-user-header">
        <div className="sidebar-avatar">
          {role === 'FARMER' ? '🧑‍🌾' : role === 'ADMIN' ? '🛡️' : '🛒'}
        </div>
        <div className="sidebar-user-info">
          <h4 className="sidebar-user-name">{user?.name || 'Welcome User'}</h4>
          <span className="sidebar-user-role">
            {role === 'FARMER' ? 'Verified Farmer' : role === 'ADMIN' ? 'Platform Administrator' : 'Valued Customer'}
          </span>
        </div>
      </div>

      <nav className="sidebar-nav">
        {role === 'FARMER' && (
          <>
            <div className="sidebar-section-title">Farmer Portal</div>
            <NavLink to="/farmer/dashboard" end className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
              <IconTractor size={18} />
              <span>Dashboard Overview</span>
            </NavLink>
            <NavLink to="/farmer/verification" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
              <IconShield size={18} />
              <span>1-B Land & ID Verification</span>
              {user?.verificationStatus === 'APPROVED' ? (
                <span className="badge badge-approved" style={{ fontSize: '0.65rem', padding: '0.1rem 0.4rem' }}>Verified</span>
              ) : (
                <span className="badge badge-pending" style={{ fontSize: '0.65rem', padding: '0.1rem 0.4rem' }}>Pending</span>
              )}
            </NavLink>
            <NavLink to="/farmer/products" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
              <IconBox size={18} />
              <span>Manage Products</span>
            </NavLink>
            <NavLink to="/farmer/orders" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
              <IconCart size={18} />
              <span>Customer Orders</span>
            </NavLink>
            <NavLink to="/community" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
              <IconSprout size={18} />
              <span>Crop Community Forum</span>
            </NavLink>
            <NavLink to="/messages" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
              <IconMessage size={18} />
              <span>Customer Inquiries</span>
            </NavLink>
          </>
        )}

        {role === 'CUSTOMER' && (
          <>
            <div className="sidebar-section-title">Customer Portal</div>
            <NavLink to="/customer/dashboard" end className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
              <IconUser size={18} />
              <span>Account Overview</span>
            </NavLink>
            <NavLink to="/marketplace" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
              <IconBox size={18} />
              <span>Browse Farm Products</span>
            </NavLink>
            <NavLink to="/customer/orders" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
              <IconCart size={18} />
              <span>My Orders & Tracking</span>
            </NavLink>
            <NavLink to="/messages" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
              <IconMessage size={18} />
              <span>Chat with Farmers</span>
            </NavLink>
          </>
        )}

        {role === 'ADMIN' && (
          <>
            <div className="sidebar-section-title">Government & Admin Portal</div>
            <NavLink to="/admin/dashboard" end className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
              <IconShield size={18} />
              <span>Admin KPIs Overview</span>
            </NavLink>
            <NavLink to="/admin/verifications" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
              <IconCheck size={18} />
              <span>Farmer Land Verifications</span>
            </NavLink>
            <NavLink to="/admin/users" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
              <IconUser size={18} />
              <span>Manage Users</span>
            </NavLink>
            <NavLink to="/admin/moderation" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
              <IconBox size={18} />
              <span>Content & Product Moderation</span>
            </NavLink>
          </>
        )}
      </nav>
    </aside>
  );
};

