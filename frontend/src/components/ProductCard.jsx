import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { StatusBadge } from './StatusBadge';
import { useCart } from '../context/CartContext';
import { IconCart, IconLocation, IconStar, IconMessage } from './Icons';

export const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product, 1);
  };

  const handleContactFarmer = (e) => {
    e.stopPropagation();
    navigate(`/messages?farmerId=${product.farmerId}&farmerName=${encodeURIComponent(product.farmerName)}`);
  };

  return (
    <div className="product-card" onClick={() => navigate(`/marketplace/${product.id}`)}>
      <div className="product-image-wrapper">
        <img src={product.image} alt={product.title} className="product-image" loading="lazy" />
        <div className="product-badge-overlay">
          <StatusBadge type="farming" status={product.farmingType} />
        </div>
      </div>

      <div className="product-content">
        <div className="product-meta">
          <span className="product-category">{product.category}</span>
          <div className="product-rating">
            <IconStar size={14} />
            <span>{product.rating}</span>
            <small>({product.reviewCount})</small>
          </div>
        </div>

        <h3 className="product-title" title={product.title}>{product.title}</h3>

        <div className="product-farmer-info">
          <span className="farmer-name">By {product.farmerName}</span>
          <span className="farmer-loc">
            <IconLocation size={13} /> {product.farmerLocation}
          </span>
        </div>

        <div className="product-footer">
          <div className="product-pricing">
            <span className="price-symbol">₹</span>
            <span className="price-amount">{product.price}</span>
            <span className="price-unit">/{product.unit}</span>
          </div>

          <div className="product-stock-tag">
            {product.stock > 0 ? `${product.stock} ${product.unit} left` : 'Out of stock'}
          </div>
        </div>

        <div className="product-card-actions">
          <button
            className="btn btn-primary btn-sm add-cart-btn"
            onClick={handleAddToCart}
            disabled={product.stock <= 0}
          >
            <IconCart size={16} /> Add to Cart
          </button>
          <button
            className="btn btn-secondary btn-sm contact-farmer-btn"
            onClick={handleContactFarmer}
            title="Chat with farmer"
          >
            <IconMessage size={16} /> Contact
          </button>
        </div>
      </div>
    </div>
  );
};

