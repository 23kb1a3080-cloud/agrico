import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import { Sidebar } from '../../components/Sidebar';
import { StatusBadge } from '../../components/StatusBadge';
import { Modal } from '../../components/Modal';
import {
  IconCart,
  IconCheck,
  IconClock,
  IconStar,
  IconMessage,
  IconLocation
} from '../../components/Icons';

export const CustomerOrdersPage = () => {
  const { user } = useAuth();
  const { orders } = useApp();

  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [rating, setRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [reviewSuccess, setReviewSuccess] = useState(false);

  const customerId = user?.id || 4;
  const myOrders = orders.filter(o => o.customerId === customerId || o.customerName === user?.name);

  const handleOpenReview = (order) => {
    setSelectedOrder(order);
    setRating(5);
    setReviewComment('');
    setReviewSuccess(false);
    setReviewModalOpen(true);
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    setReviewSuccess(true);
    setTimeout(() => {
      setReviewModalOpen(false);
      setReviewSuccess(false);
    }, 1500);
  };

  const getStepProgressIndex = (status) => {
    if (status === 'PLACED') return 1;
    if (status === 'CONFIRMED') return 2;
    if (status === 'DISPATCHED') return 3;
    if (status === 'DELIVERED') return 4;
    return 0;
  };

  return (
    <div className="container page-wrapper">
      <div className="dashboard-layout">
        <Sidebar />

        <main className="dashboard-main">
          <div className="card">
            <h2 className="heading-serif" style={{ color: 'var(--dark-green)', marginBottom: '0.25rem' }}>
              My Farm Orders & Live Dispatch Tracking
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.75rem' }}>
              Track the exact transit lifecycle of produce arriving from verified agricultural farms
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {myOrders.map(order => {
                const step = getStepProgressIndex(order.status);
                return (
                  <div
                    key={order.id}
                    style={{
                      background: '#ffffff',
                      border: '1px solid var(--border-cream)',
                      borderRadius: 'var(--radius-lg)',
                      padding: '1.75rem',
                      boxShadow: 'var(--shadow-sm)'
                    }}
                  >
                    {/* ORDER HEADER */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-light)', paddingBottom: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '0.75rem' }}>
                      <div>
                        <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 700 }}>
                          Order Reference
                        </span>
                        <h3 style={{ color: 'var(--dark-green)', margin: 0 }}>{order.id}</h3>
                        <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                          Placed on {order.placedAt} • From <strong>{order.farmerName}</strong>
                        </span>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <StatusBadge type="order" status={order.status} />
                        <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--dark-green)', marginTop: '0.25rem' }}>
                          ₹{order.totalAmount}
                        </div>
                      </div>
                    </div>

                    {/* STEPPER PROGRESS BAR */}
                    <div style={{ margin: '1.5rem 0 2rem' }}>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem', position: 'relative' }}>
                        {[
                          { num: 1, label: 'Order Placed' },
                          { num: 2, label: 'Farmer Confirmed' },
                          { num: 3, label: 'In Transit / Dispatched' },
                          { num: 4, label: 'Delivered' }
                        ].map(s => {
                          const isDone = step >= s.num;
                          const isCurrent = step === s.num;
                          return (
                            <div key={s.num} style={{ textAlign: 'center' }}>
                              <div
                                style={{
                                  width: '36px',
                                  height: '36px',
                                  borderRadius: '50%',
                                  background: isDone ? 'var(--primary-green)' : '#e2e8f0',
                                  color: isDone ? '#ffffff' : '#64748b',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  margin: '0 auto 0.5rem',
                                  fontWeight: 700,
                                  fontSize: '0.9rem',
                                  boxShadow: isCurrent ? '0 0 0 4px #dcfce7' : 'none'
                                }}
                              >
                                {isDone ? '✓' : s.num}
                              </div>
                              <div style={{ fontSize: '0.8rem', fontWeight: isDone ? 700 : 500, color: isDone ? 'var(--dark-green)' : 'var(--text-muted)' }}>
                                {s.label}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* ITEMS & DISPATCH DETAILS */}
                    <div className="grid grid-cols-2" style={{ background: 'var(--surface-cream)', padding: '1.25rem', borderRadius: 'var(--radius-md)', marginBottom: '1.25rem' }}>
                      <div>
                        <strong style={{ fontSize: '0.88rem', color: 'var(--dark-green)', display: 'block', marginBottom: '0.5rem' }}>
                          Produce Items in Parcel
                        </strong>
                        <ul style={{ listStyle: 'none', fontSize: '0.88rem' }}>
                          {order.items.map((it, idx) => (
                            <li key={idx} style={{ padding: '0.2rem 0', color: 'var(--text-secondary)' }}>
                              • {it.title} × {it.quantity} {it.unit} (₹{it.price * it.quantity})
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <strong style={{ fontSize: '0.88rem', color: 'var(--dark-green)', display: 'block', marginBottom: '0.5rem' }}>
                          Delivery Destination
                        </strong>
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0 }}>
                          {order.shippingAddress}
                        </p>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.35rem' }}>
                          Recipient Contact: {order.customerPhone}
                        </div>
                      </div>
                    </div>

                    {/* TRACKING TIMELINE LOG */}
                    <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                      {order.trackingTimeline?.map((t, idx) => (
                        <div key={idx} style={{ marginTop: '0.2rem' }}>
                          • <strong>{t.stage}</strong> ({t.time}): {t.note}
                        </div>
                      ))}
                    </div>

                    {/* ACTION BUTTONS */}
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', borderTop: '1px solid var(--border-light)', paddingTop: '1rem' }}>
                      <button
                        className="btn btn-secondary btn-sm"
                        onClick={() => alert(`Connecting you to ${order.farmerName}... You can message them on the Messages tab!`)}
                      >
                        <IconMessage size={15} /> Message Farmer
                      </button>

                      {order.status === 'DELIVERED' && (
                        <button
                          className="btn btn-primary btn-sm"
                          onClick={() => handleOpenReview(order)}
                        >
                          <IconStar size={15} fill="#ffffff" color="#ffffff" /> Write Quality Review
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}

              {myOrders.length === 0 && (
                <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
                  You haven't placed any farm orders yet.
                </div>
              )}
            </div>
          </div>
        </main>
      </div>

      {/* WRITE REVIEW MODAL */}
      <Modal
        isOpen={reviewModalOpen}
        onClose={() => setReviewModalOpen(false)}
        title="Submit Quality Review & Farmer Rating"
      >
        <form onSubmit={handleReviewSubmit}>
          {reviewSuccess ? (
            <div style={{ textAlign: 'center', padding: '2rem' }}>
              <div style={{ width: '48px', height: '48px', background: '#dcfce7', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
                <IconCheck size={28} color="#16a34a" />
              </div>
              <h3 style={{ color: 'var(--dark-green)' }}>Thank You for Supporting Direct Farmers!</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.5rem' }}>
                Your review has been verified and published to the farmer's marketplace profile.
              </p>
            </div>
          ) : (
            <>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
                How was the freshness, taste, and packaging of produce received from <strong>{selectedOrder?.farmerName}</strong>?
              </p>

              <div className="form-group">
                <label className="form-label">Star Rating (1 to 5 Stars)</label>
                <div style={{ display: 'flex', gap: '0.5rem', cursor: 'pointer' }}>
                  {[1, 2, 3, 4, 5].map((s) => (
                    <button
                      type="button"
                      key={s}
                      onClick={() => setRating(s)}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0.2rem' }}
                    >
                      <IconStar
                        size={28}
                        color="#f59e0b"
                        fill={s <= rating ? "#f59e0b" : "transparent"}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Feedback Comments</label>
                <textarea
                  className="form-control"
                  rows={4}
                  required
                  placeholder="Describe produce aroma, freshness, chemical-free taste, and delivery timeliness..."
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem' }}>
                <button type="button" className="btn btn-secondary" onClick={() => setReviewModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Publish Review
                </button>
              </div>
            </>
          )}
        </form>
      </Modal>
    </div>
  );
};

