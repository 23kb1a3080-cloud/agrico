import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import { Sidebar } from '../../components/Sidebar';
import { StatusBadge } from '../../components/StatusBadge';
import {
  IconCart,
  IconLeaf,
  IconArrowRight,
  IconBox
} from '../../components/Icons';

export const CustomerDashboard = () => {
  const { user } = useAuth();
  const { orders } = useApp();

  const customerId = user?.id || 4;
  const myOrders = orders.filter(o => o.customerId === customerId || o.customerName === user?.name);
  const activeOrders = myOrders.filter(o => o.status !== 'DELIVERED' && o.status !== 'CANCELLED');

  return (
    <div className="container page-wrapper">
      <div className="dashboard-layout">
        <Sidebar />

        <main className="dashboard-main">
          {/* WELCOME BANNER */}
          <div className="card" style={{ background: 'linear-gradient(135deg, #f0fdf4 0%, var(--surface-cream) 100%)', borderColor: '#bbf7d0' }}>
            <h2 className="heading-serif" style={{ color: 'var(--dark-green)', marginBottom: '0.5rem' }}>
              Welcome back, {user?.name || 'Valued Customer'}!
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', maxWidth: '650px', margin: 0 }}>
              You are supporting local Indian farmers directly. Browse farm-fresh harvests, track live dispatches, and consult directly with cultivators.
            </p>
          </div>

          {/* KPIS */}
          <div className="dashboard-stats-grid">
            <div className="kpi-card">
              <div className="kpi-icon-wrap" style={{ background: '#dcfce7' }}>
                <IconCart size={24} color="#15803d" />
              </div>
              <div>
                <div className="kpi-val">{myOrders.length}</div>
                <div className="kpi-title">Total Orders</div>
              </div>
            </div>

            <div className="kpi-card">
              <div className="kpi-icon-wrap" style={{ background: '#e0f2fe' }}>
                <IconBox size={24} color="#0284c7" />
              </div>
              <div>
                <div className="kpi-val">{activeOrders.length}</div>
                <div className="kpi-title">In-Transit Deliveries</div>
              </div>
            </div>

            <div className="kpi-card">
              <div className="kpi-icon-wrap" style={{ background: '#fef3c7' }}>
                <IconLeaf size={24} color="#b45309" />
              </div>
              <div>
                <div className="kpi-val">100%</div>
                <div className="kpi-title">Farm Traceability</div>
              </div>
            </div>

            <div className="kpi-card">
              <div className="kpi-icon-wrap" style={{ background: '#f3e8ff' }}>
                <span style={{ fontSize: '1.4rem' }}>₹</span>
              </div>
              <div>
                <div className="kpi-val">
                  ₹{myOrders.reduce((sum, o) => sum + o.totalAmount, 0).toLocaleString()}
                </div>
                <div className="kpi-title">Direct Farmer Spend</div>
              </div>
            </div>
          </div>

          {/* ACTIVE DISPATCHES PREVIEW */}
          <div className="card">
            <div className="dashboard-section-header">
              <div>
                <h3 className="dashboard-section-title">Active Orders & Dispatches</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  Produce currently being packed or in-transit
                </p>
              </div>
              <Link to="/customer/orders" className="btn btn-outline btn-sm">
                View Full Tracking ({myOrders.length}) <IconArrowRight size={14} />
              </Link>
            </div>

            <div className="table-container">
              <table className="agri-table">
                <thead>
                  <tr>
                    <th>Order #</th>
                    <th>Farmer</th>
                    <th>Produce Items</th>
                    <th>Total</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {myOrders.slice(0, 3).map(order => (
                    <tr key={order.id}>
                      <td style={{ fontWeight: 700, color: 'var(--dark-green)' }}>{order.id}</td>
                      <td style={{ fontWeight: 600 }}>{order.farmerName}</td>
                      <td>{order.items.map(i => `${i.title} (${i.quantity} ${i.unit})`).join(', ')}</td>
                      <td style={{ fontWeight: 800 }}>₹{order.totalAmount}</td>
                      <td><StatusBadge type="order" status={order.status} /></td>
                      <td>
                        <Link to="/customer/orders" className="btn btn-secondary btn-sm">
                          Track Live
                        </Link>
                      </td>
                    </tr>
                  ))}
                  {myOrders.length === 0 && (
                    <tr>
                      <td colSpan={6} style={{ textAlign: 'center', padding: '2.5rem' }}>
                        No orders yet. <Link to="/marketplace" style={{ color: 'var(--primary-green)', fontWeight: 700 }}>Browse Farm Harvests →</Link>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

