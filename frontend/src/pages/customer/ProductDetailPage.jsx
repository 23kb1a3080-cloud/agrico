import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { useCart } from '../../context/CartContext';
import { StatusBadge } from '../../components/StatusBadge';
import {
  IconCart,
  IconLocation,
  IconStar,
  IconShield,
  IconMessage,
  IconCheck,
  IconArrowRight
} from '../../components/Icons';
import './ProductDetail.css';

export const ProductDetailPage = () => {
  const { id } = useParams();
  const { products } = useApp();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const [quantity, setQuantity] = useState(1);
  const [addedMessage, setAddedMessage] = useState(false);

  const product = products.find(p => p.id === Number(id)) || products[0];

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAddedMessage(true);
    setTimeout(() => setAddedMessage(false), 3000);
  };

  const handleContactFarmer = () => {
    navigate(`/messages?farmerId=${product.farmerId}&farmerName=${encodeURIComponent(product.farmerName)}`);
  };

  return (
    <div className="container page-wrapper">
      <div style={{ marginBottom: '1.25rem' }}>
        <Link to="/marketplace" style={{ fontSize: '0.88rem', color: 'var(--primary-green)', fontWeight: 600 }}>
          ← Back to Marketplace
        </Link>
      </div>

      <div className="product-detail-layout">
        {/* IMAGE GALLERY */}
        <div className="detail-gallery">
          <img src={product.image} alt={product.title} className="detail-main-img" />
          <div style={{ position: 'absolute', top: '15px', left: '15px' }}>
            <StatusBadge type="farming" status={product.farmingType} />
          </div>
        </div>

        {/* DETAILS INFO */}
        <div className="detail-info">
          <div className="detail-header">
            <div className="detail-category-row">
              <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--warm-earth)', fontWeight: 700 }}>
                {product.category}
              </span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontWeight: 700 }}>
                <IconStar size={16} /> {product.rating} <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>({product.reviewCount} Reviews)</span>
              </div>
            </div>
            <h1 className="detail-title heading-serif">{product.title}</h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              <IconLocation size={16} color="var(--primary-green)" />
              <span>Grown in <strong>{product.farmerLocation}</strong></span>
              <span>•</span>
              <span>Harvested: <strong>{product.harvestDate || 'Fresh Season'}</strong></span>
            </div>
          </div>

          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>
            {product.description}
          </p>

          {/* PRICING & STOCK */}
          <div className="detail-price-box">
            <div>
              <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 700, display: 'block' }}>
                Direct Mandi Price
              </span>
              <div style={{ display: 'flex', alignItems: 'baseline' }}>
                <span style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--dark-green)' }}>₹</span>
                <span style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--dark-green)' }}>{product.price}</span>
                <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginLeft: '4px' }}>/ {product.unit}</span>
              </div>
            </div>

            <div style={{ textAlign: 'right' }}>
              <span className="badge badge-approved" style={{ fontSize: '0.8rem' }}>
                {product.stock > 0 ? `${product.stock} ${product.unit} In Stock` : 'Out of Stock'}
              </span>
              <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                Zero commission direct farmer pricing
              </span>
            </div>
          </div>

          {/* FARMER PROFILE SNIPPET */}
          <div className="detail-farmer-card">
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', marginBottom: '0.2rem' }}>
                <IconShield size={16} color="#16a34a" />
                <span style={{ fontSize: '0.75rem', color: '#16a34a', fontWeight: 700, textTransform: 'uppercase' }}>
                  1-B Land Record Verified Farmer
                </span>
              </div>
              <h4 style={{ color: 'var(--dark-green)', margin: 0 }}>{product.farmerName}</h4>
              <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                Certified Agriculture Producer • {product.farmerLocation}
              </span>
            </div>

            <button className="btn btn-secondary btn-sm" onClick={handleContactFarmer}>
              <IconMessage size={16} /> Contact Farmer
            </button>
          </div>

          {/* QUANTITY & ACTIONS */}
          <div className="detail-purchase-row">
            <div className="quantity-control">
              <button
                type="button"
                className="qty-btn"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                -
              </button>
              <span className="qty-val">{quantity}</span>
              <button
                type="button"
                className="qty-btn"
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </button>
            </div>

            <button
              className="btn btn-primary btn-lg"
              style={{ flexGrow: 1 }}
              onClick={handleAddToCart}
            >
              <IconCart size={20} /> Add to Cart (₹{product.price * quantity})
            </button>
          </div>

          {addedMessage && (
            <div style={{ marginTop: '1rem', background: '#dcfce7', border: '1px solid #86efac', color: '#166534', padding: '0.65rem 1rem', borderRadius: 'var(--radius-md)', fontSize: '0.88rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span>✓ Added {quantity} {product.unit} to your basket!</span>
              <Link to="/cart" style={{ fontWeight: 700, textDecoration: 'underline' }}>View Cart →</Link>
            </div>
          )}
        </div>
      </div>

      {/* VERIFICATION & REVIEWS SECTION */}
      <div className="grid grid-cols-2">
        <div className="card">
          <h3 className="heading-serif" style={{ color: 'var(--dark-green)', marginBottom: '1rem' }}>
            Organic Quality & Compliance Notes
          </h3>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
            <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
              <IconCheck size={18} color="#16a34a" style={{ flexShrink: 0, marginTop: '2px' }} />
              <span>Form 1-B Land revenue authentication confirmed by local agricultural revenue officer.</span>
            </li>
            <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
              <IconCheck size={18} color="#16a34a" style={{ flexShrink: 0, marginTop: '2px' }} />
              <span>{product.farmingType === 'ORGANIC' ? 'Cultivated using Jeevamrutha, cow dung compost, and neem bio-extracts without synthetic chemicals.' : 'Standard GAP (Good Agricultural Practices) compliant cultivation.'}</span>
            </li>
            <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
              <IconCheck size={18} color="#16a34a" style={{ flexShrink: 0, marginTop: '2px' }} />
              <span>Freshly packed and sorted at farmer source directly upon order confirmation.</span>
            </li>
          </ul>
        </div>

        <div className="card">
          <h3 className="heading-serif" style={{ color: 'var(--dark-green)', marginBottom: '1rem' }}>
            Recent Customer Reviews
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ borderBottom: '1px solid var(--border-light)', paddingBottom: '0.75rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <strong>Pooja Sharma (Mumbai)</strong>
                <div style={{ display: 'flex', gap: '2px' }}>
                  {[...Array(5)].map((_, i) => <IconStar key={i} size={14} />)}
                </div>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
                "Exceptional quality. Arrived fresh from Nashik within 24 hours of harvest. Taste is completely different from city cold-storage produce!"
              </p>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <strong>Anil Mehta (Pune)</strong>
                <div style={{ display: 'flex', gap: '2px' }}>
                  {[...Array(5)].map((_, i) => <IconStar key={i} size={14} />)}
                </div>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
                "Direct contact with farmer gave full confidence on zero pesticide claims. Very fair pricing."
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

