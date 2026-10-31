import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import { Sidebar } from '../../components/Sidebar';
import { StatusBadge } from '../../components/StatusBadge';
import { IconCart, IconPhone, IconLocation } from '../../components/Icons';

export const FarmerOrdersPage = () => {
  const { user } = useAuth();
  const { orders, updateOrderStatus } = useApp();
  const [filter, setFilter] = useState('ALL');

  const myOrders = orders.filter(o => o.farmerId === user?.id || o.farmerName?.includes(user?.name?.split(' ')[0]));

  const filteredOrders = myOrders.filter(o => {
    if (filter === 'ALL') return true;
    return o.status === filter;
  });

  const handleStatusChange = (orderId, newStatus) => {
    let note = '';
    if (newStatus === 'CONFIRMED') {
      note = 'Farmer confirmed crop harvest is ready for dispatch.';
    } else if (newStatus === 'DISPATCHED') {
      const vehicle = prompt('Enter transport vehicle number or dispatch note (e.g. MH-15-KR-9021 / Krishi Van):', 'Krishi Logistics Van');
      note = `Dispatched: ${vehicle || 'Dispatched via local mandi transport'}`;
    } else if (newStatus === 'DELIVERED') {
      note = 'Handed over and confirmed delivered to customer.';
    }
    updateOrderStatus(orderId, newStatus, note);
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
                  Customer Orders & Fulfillment
                </h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                  Manage and advance the delivery lifecycle of produce purchased by customers
                </p>
              </div>

              {/* Status Filter Tabs */}
              <div className="filter-tab-buttons">
                {['ALL', 'PLACED', 'CONFIRMED', 'DISPATCHED', 'DELIVERED'].map(status => (
                  <button
                    key={status}
                    className={`tab-btn ${filter === status ? 'active' : ''}`}
                    onClick={() => setFilter(status)}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {filteredOrders.map(order => (
                <div
                  key={order.id}
                  style={{
                    background: '#ffffff',
                    border: '1px solid var(--border-cream)',
                    borderRadius: 'var(--radius-md)',
                    padding: '1.5rem',
                    boxShadow: 'var(--shadow-sm)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-light)', paddingBottom: '0.75rem', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                    <div>
                      <strong style={{ fontSize: '1.1rem', color: 'var(--dark-green)' }}>{order.id}</strong>
                      <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginLeft: '0.75rem' }}>
                        Placed on {order.placedAt}
                      </span>
                    </div>
                    <StatusBadge type="order" status={order.status} />
                  </div>

                  <div className="grid grid-cols-2" style={{ marginBottom: '1rem' }}>
                    <div>
                      <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em', fontWeight: 700 }}>
                        Customer Contact & Destination
                      </div>
                      <div style={{ fontWeight: 700, marginTop: '0.2rem' }}>{order.customerName}</div>
                      <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.35rem', marginTop: '0.2rem' }}>
                        <IconPhone size={14} /> {order.customerPhone}
                      </div>
                      <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'flex-start', gap: '0.35rem', marginTop: '0.2rem' }}>
                        <IconLocation size={14} style={{ flexShrink: 0, marginTop: '2px' }} /> {order.shippingAddress}
                      </div>
                    </div>

                    <div>
                      <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em', fontWeight: 700 }}>
                        Order Items & Total
                      </div>
                      <ul style={{ listStyle: 'none', marginTop: '0.2rem' }}>
                        {order.items.map((it, idx) => (
                          <li key={idx} style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', display: 'flex', justifyContent: 'space-between', padding: '0.2rem 0' }}>
                            <span>{it.title} × {it.quantity} {it.unit}</span>
                            <strong>₹{it.price * it.quantity}</strong>
                          </li>
                        ))}
                      </ul>
                      <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--border-light)', paddingTop: '0.5rem', marginTop: '0.5rem', fontWeight: 800, fontSize: '1.05rem', color: 'var(--dark-green)' }}>
                        <span>Order Total:</span>
                        <span>₹{order.totalAmount}</span>
                      </div>
                    </div>
                  </div>

                  {/* ORDER TIMELINE TRAIL */}
                  <div style={{ background: 'var(--surface-cream)', padding: '0.85rem', borderRadius: 'var(--radius-sm)', marginBottom: '1.25rem', fontSize: '0.82rem' }}>
                    <strong>Tracking Log:</strong>
                    {order.trackingTimeline?.map((t, idx) => (
                      <div key={idx} style={{ marginTop: '0.25rem', color: 'var(--text-secondary)' }}>
                        • <strong>{t.stage}</strong> ({t.time}): {t.note}
                      </div>
                    ))}
                  </div>

                  {/* ACTION CONTROLS */}
                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', borderTop: '1px solid var(--border-light)', paddingTop: '1rem' }}>
                    {order.status === 'PLACED' && (
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() => handleStatusChange(order.id, 'CONFIRMED')}
                      >
                        ✓ Confirm Produce Availability
                      </button>
                    )}
                    {order.status === 'CONFIRMED' && (
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() => handleStatusChange(order.id, 'DISPATCHED')}
                      >
                        🚚 Dispatch Order
                      </button>
                    )}
                    {order.status === 'DISPATCHED' && (
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() => handleStatusChange(order.id, 'DELIVERED')}
                      >
                        📦 Mark as Delivered
                      </button>
                    )}
                    {order.status === 'DELIVERED' && (
                      <span style={{ fontSize: '0.85rem', color: '#16a34a', fontWeight: 700 }}>
                        ✓ Order Successfully Completed & Delivered
                      </span>
                    )}
                  </div>
                </div>
              ))}

              {filteredOrders.length === 0 && (
                <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
                  No orders found for the selected status.
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

