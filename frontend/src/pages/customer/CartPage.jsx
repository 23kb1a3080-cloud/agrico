import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import { IconCart, IconLeaf, IconCheck } from '../../components/Icons';

export const CartPage = () => {
  const { cartItems, updateQuantity, removeFromCart, clearCart, getCartTotal } = useCart();
  const { user } = useAuth();
  const { placeOrder } = useApp();
  const navigate = useNavigate();

  const [deliveryData, setDeliveryData] = useState({
    name: user?.name || 'Pooja Sharma',
    phone: user?.phone || '+91 99887 76655',
    address: user?.address || 'B-402, Green Meadows, Andheri West, Mumbai 400053',
    notes: 'Please call before arriving.'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const subtotal = getCartTotal();
  const mandiLogisticsFee = subtotal > 0 ? 50 : 0;
  const total = subtotal + mandiLogisticsFee;

  const handleCheckout = (e) => {
    e.preventDefault();
    if (cartItems.length === 0) return;

    setIsSubmitting(true);

    // Group items by farmer or place order
    const newOrder = placeOrder({
      customerId: user?.id || 4,
      customerName: deliveryData.name,
      customerPhone: deliveryData.phone,
      farmerId: cartItems[0]?.farmerId || 1,
      farmerName: cartItems[0]?.farmerName || 'Ramesh Patel',
      totalAmount: total,
      items: cartItems.map(item => ({
        productId: item.id,
        title: item.title,
        price: item.price,
        quantity: item.quantity,
        unit: item.unit
      })),
      shippingAddress: deliveryData.address,
      deliveryNotes: deliveryData.notes
    });

    clearCart();
    setTimeout(() => {
      setIsSubmitting(false);
      navigate('/customer/orders');
    }, 600);
  };

  if (cartItems.length === 0) {
    return (
      <div className="container page-wrapper">
        <div className="card" style={{ textAlign: 'center', padding: '4rem 2rem', maxWidth: '600px', margin: '2rem auto' }}>
          <div style={{ width: '64px', height: '64px', background: 'var(--surface-cream)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
            <IconCart size={32} color="var(--primary-green)" />
          </div>
          <h2 className="heading-serif" style={{ color: 'var(--dark-green)' }}>Your Produce Basket is Empty</h2>
          <p style={{ color: 'var(--text-secondary)', margin: '0.75rem 0 2rem' }}>
            Explore directly sourced organic fruits, vegetables, grains, and spices directly from verified Indian farmers.
          </p>
          <Link to="/marketplace" className="btn btn-primary btn-lg">
            Explore Farm Marketplace
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container page-wrapper">
      <h1 className="heading-serif" style={{ color: 'var(--dark-green)', marginBottom: '1.5rem' }}>
        Review Farm Basket & Checkout
      </h1>

      <div className="grid grid-cols-3" style={{ alignItems: 'flex-start' }}>
        {/* BASKET ITEMS LIST */}
        <div style={{ gridColumn: 'span 2' }}>
          <div className="card">
            <h3 style={{ fontSize: '1.15rem', color: 'var(--dark-green)', marginBottom: '1.25rem' }}>
              Direct Farm Produce ({cartItems.length} items)
            </h3>

            <div className="table-container">
              <table className="agri-table">
                <thead>
                  <tr>
                    <th>Harvest Item</th>
                    <th>Unit Price</th>
                    <th>Quantity</th>
                    <th>Subtotal</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map(item => (
                    <tr key={item.id}>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                          <img
                            src={item.image}
                            alt=""
                            style={{ width: '48px', height: '48px', borderRadius: 'var(--radius-sm)', objectFit: 'cover' }}
                          />
                          <div>
                            <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{item.title}</div>
                            <small style={{ color: 'var(--text-muted)' }}>From {item.farmerName}</small>
                          </div>
                        </div>
                      </td>
                      <td>₹{item.price} / {item.unit}</td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                          <button
                            type="button"
                            className="btn btn-secondary btn-sm"
                            style={{ padding: '0.2rem 0.6rem' }}
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            -
                          </button>
                          <span style={{ fontWeight: 700, minWidth: '28px', textAlign: 'center' }}>
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            className="btn btn-secondary btn-sm"
                            style={{ padding: '0.2rem 0.6rem' }}
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            +
                          </button>
                          <small style={{ color: 'var(--text-muted)', marginLeft: '2px' }}>{item.unit}</small>
                        </div>
                      </td>
                      <td style={{ fontWeight: 800, color: 'var(--dark-green)' }}>
                        ₹{item.price * item.quantity}
                      </td>
                      <td>
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.id)}
                          style={{ background: 'none', border: 'none', color: '#dc2626', cursor: 'pointer', fontWeight: 600, fontSize: '0.82rem' }}
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1.25rem' }}>
              <Link to="/marketplace" style={{ color: 'var(--primary-green)', fontWeight: 600, fontSize: '0.9rem' }}>
                + Add More Produce
              </Link>
              <button
                type="button"
                onClick={clearCart}
                className="btn btn-secondary btn-sm"
              >
                Clear Basket
              </button>
            </div>
          </div>
        </div>

        {/* CHECKOUT / DELIVERY ADDRESS PANEL */}
        <div>
          <div className="card">
            <h3 style={{ fontSize: '1.15rem', color: 'var(--dark-green)', marginBottom: '1.25rem' }}>
              Delivery Destination & Order Summary
            </h3>

            <form onSubmit={handleCheckout}>
              <div className="form-group">
                <label className="form-label">Recipient Name</label>
                <input
                  type="text"
                  className="form-control"
                  required
                  value={deliveryData.name}
                  onChange={(e) => setDeliveryData({ ...deliveryData, name: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Recipient Phone Number</label>
                <input
                  type="tel"
                  className="form-control"
                  required
                  value={deliveryData.phone}
                  onChange={(e) => setDeliveryData({ ...deliveryData, phone: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Full Shipping Address</label>
                <textarea
                  className="form-control"
                  rows={2}
                  required
                  value={deliveryData.address}
                  onChange={(e) => setDeliveryData({ ...deliveryData, address: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Special Delivery / Packaging Notes</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="e.g. Leave with security guard"
                  value={deliveryData.notes}
                  onChange={(e) => setDeliveryData({ ...deliveryData, notes: e.target.value })}
                />
              </div>

              {/* PRICE BREAKDOWN */}
              <div style={{ background: 'var(--surface-cream)', padding: '1rem', borderRadius: 'var(--radius-md)', margin: '1.25rem 0', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.9rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
                  <span>Produce Subtotal:</span>
                  <span>₹{subtotal}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
                  <span>Direct Farm Logistics Fee:</span>
                  <span>₹{mandiLogisticsFee}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--border-cream)', paddingTop: '0.5rem', fontWeight: 800, fontSize: '1.15rem', color: 'var(--dark-green)' }}>
                  <span>Grand Total:</span>
                  <span>₹{total}</span>
                </div>
              </div>

              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1.25rem', display: 'flex', gap: '0.35rem' }}>
                <IconCheck size={16} color="#16a34a" />
                <span>Pay via UPI or Cash on Delivery directly to the farmer/transporter.</span>
              </div>

              <button
                type="submit"
                className="btn btn-primary btn-lg"
                style={{ width: '100%' }}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Placing Order...' : `Confirm & Place Order (₹${total})`}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

