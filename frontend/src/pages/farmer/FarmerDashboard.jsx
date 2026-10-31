import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import { Sidebar } from '../../components/Sidebar';
import { StatusBadge } from '../../components/StatusBadge';
import {
  IconBox,
  IconCart,
  IconShield,
  IconStar,
  IconArrowRight,
  IconCheck,
  IconClock
} from '../../components/Icons';
import './FarmerDashboard.css';

export const FarmerDashboard = () => {
  const { user } = useAuth();
  const { products, orders } = useApp();

  const isApproved = user?.verificationStatus === 'APPROVED';
  const myProducts = products.filter(p => p.farmerId === user?.id || p.farmerName?.includes(user?.name?.split(' ')[0]));
  const myOrders = orders.filter(o => o.farmerId === user?.id || o.farmerName?.includes(user?.name?.split(' ')[0]));

  const totalRevenue = myOrders.reduce((sum, o) => sum + (o.status !== 'CANCELLED' ? o.totalAmount : 0), 0);
  const pendingOrders = myOrders.filter(o => o.status === 'PLACED' || o.status === 'CONFIRMED');

  return (
    <div className="container page-wrapper">
      <div className="dashboard-layout">
        <Sidebar />

        <main className="dashboard-main">
          {/* VERIFICATION ALERT BANNER */}
          {isApproved ? (
            <div className="verification-status-banner banner-approved">
              <div className="banner-content">
                <IconCheck size={28} color="#15803d" />
                <div>
                  <h4>1-B Land & Aadhaar Identity Verified</h4>
                  <p>Your agricultural credentials are authenticated. You have full privileges to list and sell farm produce.</p>
                </div>
              </div>
              <Link to="/farmer/products" className="btn btn-primary btn-sm">
                + Add New Harvest
              </Link>
            </div>
          ) : (
            <div className="verification-status-banner banner-pending">
              <div className="banner-content">
                <IconClock size={28} color="#b45309" />
                <div>
                  <h4>Verification Under Administrative Review</h4>
                  <p>Your Aadhaar and 1-B Land records are in the verification queue. Listing produce will unlock once approved.</p>
                </div>
              </div>
              <Link to="/farmer/verification" className="btn btn-secondary btn-sm">
                Check Status
              </Link>
            </div>
          )}

          {/* KPI STATS */}
          <div className="dashboard-stats-grid">
            <div className="kpi-card">
              <div className="kpi-icon-wrap" style={{ background: '#dcfce7' }}>
                <IconBox size={24} color="#15803d" />
              </div>
              <div>
                <div className="kpi-val">{myProducts.length}</div>
                <div className="kpi-title">Listed Harvests</div>
              </div>
            </div>

            <div className="kpi-card">
              <div className="kpi-icon-wrap" style={{ background: '#e0f2fe' }}>
                <IconCart size={24} color="#0284c7" />
              </div>
              <div>
                <div className="kpi-val">{pendingOrders.length}</div>
                <div className="kpi-title">Active Orders</div>
              </div>
            </div>

            <div className="kpi-card">
              <div className="kpi-icon-wrap" style={{ background: '#fef3c7' }}>
                <span style={{ fontSize: '1.4rem' }}>₹</span>
              </div>
              <div>
                <div className="kpi-val">₹{totalRevenue.toLocaleString()}</div>
                <div className="kpi-title">Total Sales</div>
              </div>
            </div>

            <div className="kpi-card">
              <div className="kpi-icon-wrap" style={{ background: '#f3e8ff' }}>
                <IconStar size={24} color="#9333ea" />
              </div>
              <div>
                <div className="kpi-val">4.9 / 5.0</div>
                <div className="kpi-title">Customer Trust</div>
              </div>
            </div>
          </div>

          {/* ACTIVE INVENTORY SECTION */}
          <section className="card">
            <div className="dashboard-section-header">
              <div>
                <h3 className="dashboard-section-title">My Farm Produce Catalog</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  Manage stock levels, organic classifications, and unit prices
                </p>
              </div>
              <Link to="/farmer/products" className="btn btn-outline btn-sm">
                Manage Inventory ({myProducts.length}) <IconArrowRight size={14} />
              </Link>
            </div>

            <div className="table-container">
              <table className="agri-table">
                <thead>
                  <tr>
                    <th>Harvest Item</th>
                    <th>Category</th>
                    <th>Farming Type</th>
                    <th>Unit Price</th>
                    <th>Available Stock</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {myProducts.slice(0, 4).map(p => (
                    <tr key={p.id}>
                      <td style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                          <img
                            src={p.image}
                            alt=""
                            style={{ width: '36px', height: '36px', borderRadius: '4px', objectFit: 'cover' }}
                          />
                          <span>{p.title}</span>
                        </div>
                      </td>
                      <td>{p.category}</td>
                      <td><StatusBadge type="farming" status={p.farmingType} /></td>
                      <td style={{ fontWeight: 700, color: 'var(--dark-green)' }}>₹{p.price}/{p.unit}</td>
                      <td>{p.stock} {p.unit}</td>
                      <td>
                        <span className="badge badge-approved">Active</span>
                      </td>
                    </tr>
                  ))}
                  {myProducts.length === 0 && (
                    <tr>
                      <td colSpan={6} style={{ textAlign: 'center', padding: '2rem' }}>
                        No agricultural items listed yet. Click "+ Add New Harvest" to begin.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>

          {/* RECENT ORDERS SECTION */}
          <section className="card">
            <div className="dashboard-section-header">
              <div>
                <h3 className="dashboard-section-title">Recent Customer Orders</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  Orders placed directly by consumers and retail stores
                </p>
              </div>
              <Link to="/farmer/orders" className="btn btn-outline btn-sm">
                View All Orders <IconArrowRight size={14} />
              </Link>
            </div>

            <div className="table-container">
              <table className="agri-table">
                <thead>
                  <tr>
                    <th>Order #</th>
                    <th>Customer</th>
                    <th>Items Summary</th>
                    <th>Amount</th>
                    <th>Current Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {myOrders.slice(0, 3).map(order => (
                    <tr key={order.id}>
                      <td style={{ fontWeight: 700, color: 'var(--dark-green)' }}>{order.id}</td>
                      <td>
                        <div style={{ fontWeight: 600 }}>{order.customerName}</div>
                        <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{order.customerPhone}</div>
                      </td>
                      <td>{order.items.map(i => `${i.title} (${i.quantity} ${i.unit})`).join(', ')}</td>
                      <td style={{ fontWeight: 700 }}>₹{order.totalAmount}</td>
                      <td><StatusBadge type="order" status={order.status} /></td>
                      <td>
                        <Link to="/farmer/orders" className="btn btn-secondary btn-sm">
                          Manage
                        </Link>
                      </td>
                    </tr>
                  ))}
                  {myOrders.length === 0 && (
                    <tr>
                      <td colSpan={6} style={{ textAlign: 'center', padding: '2rem' }}>
                        No orders received yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

