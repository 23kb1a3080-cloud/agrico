import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import { Sidebar } from '../../components/Sidebar';
import { StatusBadge } from '../../components/StatusBadge';
import { Modal } from '../../components/Modal';
import { IconBox, IconLeaf, IconCheck, IconUpload } from '../../components/Icons';

export const FarmerProductsPage = () => {
  const { user } = useAuth();
  const { products, addProduct, updateProduct, deleteProduct } = useApp();

  const isApproved = user?.verificationStatus === 'APPROVED';
  const myProducts = products.filter(p => p.farmerId === user?.id || p.farmerName?.includes(user?.name?.split(' ')[0]));

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const initialFormState = {
    title: '',
    category: 'Vegetables',
    farmingType: 'ORGANIC',
    price: '',
    unit: 'KG',
    stock: '',
    harvestDate: new Date().toISOString().split('T')[0],
    description: '',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&auto=format&fit=crop&q=80'
  };

  const [formData, setFormData] = useState(initialFormState);

  const handleOpenAdd = () => {
    if (!isApproved) {
      alert("⚠️ Document Verification Required: You must be approved by the admin with valid 1-B land records before adding products to the marketplace.");
      return;
    }
    setEditingProduct(null);
    setFormData(initialFormState);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (prod) => {
    setEditingProduct(prod);
    setFormData({
      title: prod.title,
      category: prod.category,
      farmingType: prod.farmingType,
      price: prod.price,
      unit: prod.unit,
      stock: prod.stock,
      harvestDate: prod.harvestDate || new Date().toISOString().split('T')[0],
      description: prod.description || '',
      image: prod.image
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to remove this harvest listing?")) {
      deleteProduct(id);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingProduct) {
      updateProduct(editingProduct.id, {
        ...formData,
        price: Number(formData.price),
        stock: Number(formData.stock)
      });
    } else {
      addProduct({
        ...formData,
        farmerId: user.id,
        farmerName: user.name,
        farmerLocation: `${user.city || 'Nashik'}, ${user.state || 'Maharashtra'}`,
        price: Number(formData.price),
        stock: Number(formData.stock)
      });
    }
    setIsModalOpen(false);
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
                  Agricultural Inventory Management
                </h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                  List, price, and classify your farm harvest for direct consumer purchase
                </p>
              </div>
              <button className="btn btn-primary" onClick={handleOpenAdd}>
                + Add New Harvest
              </button>
            </div>

            {!isApproved && (
              <div style={{ background: '#fef3c7', border: '1px solid #fde047', color: '#92400e', padding: '0.85rem 1.25rem', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem', fontSize: '0.88rem' }}>
                <strong>Account Pending Verification:</strong> New listings can only be created after an administrator verifies your Form 1-B land record and Aadhaar copy.
              </div>
            )}

            <div className="table-container">
              <table className="agri-table">
                <thead>
                  <tr>
                    <th>Harvest Item</th>
                    <th>Category</th>
                    <th>Classification</th>
                    <th>Price / Unit</th>
                    <th>Stock Available</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {myProducts.map(prod => (
                    <tr key={prod.id}>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                          <img
                            src={prod.image}
                            alt=""
                            style={{ width: '44px', height: '44px', borderRadius: 'var(--radius-sm)', objectFit: 'cover' }}
                          />
                          <div>
                            <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{prod.title}</div>
                            <small style={{ color: 'var(--text-muted)' }}>Harvested: {prod.harvestDate || 'Recently'}</small>
                          </div>
                        </div>
                      </td>
                      <td>{prod.category}</td>
                      <td><StatusBadge type="farming" status={prod.farmingType} /></td>
                      <td style={{ fontWeight: 700, color: 'var(--dark-green)' }}>₹{prod.price} / {prod.unit}</td>
                      <td>
                        <strong style={{ color: prod.stock > 0 ? '#15803d' : '#dc2626' }}>
                          {prod.stock} {prod.unit}
                        </strong>
                      </td>
                      <td>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                          <button className="btn btn-secondary btn-sm" onClick={() => handleOpenEdit(prod)}>
                            Edit
                          </button>
                          <button className="btn btn-danger btn-sm" onClick={() => handleDelete(prod.id)}>
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {myProducts.length === 0 && (
                    <tr>
                      <td colSpan={6} style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
                        No agricultural produce listed yet. Click "+ Add New Harvest" to add your first crop.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>

      {/* ADD / EDIT MODAL */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingProduct ? "Edit Harvest Listing" : "List New Agricultural Produce"}
        maxWidth="620px"
      >
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Harvest Title / Variety Name*</label>
            <input
              type="text"
              className="form-control"
              required
              placeholder="e.g. Certified Organic Alphonso Mangoes (Devgad)"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-2">
            <div className="form-group">
              <label className="form-label">Category*</label>
              <select
                className="form-control"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              >
                <option value="Vegetables">Vegetables</option>
                <option value="Fruits">Fruits</option>
                <option value="Grains">Grains & Pulses</option>
                <option value="Spices">Spices & Herbs</option>
                <option value="Oilseeds">Oilseeds</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Farming Classification*</label>
              <select
                className="form-control"
                value={formData.farmingType}
                onChange={(e) => setFormData({ ...formData, farmingType: e.target.value })}
              >
                <option value="ORGANIC">🌿 100% Certified Organic</option>
                <option value="CONVENTIONAL">🚜 Conventional Farming</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-3">
            <div className="form-group">
              <label className="form-label">Price in ₹*</label>
              <input
                type="number"
                step="0.5"
                className="form-control"
                required
                placeholder="45"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Unit*</label>
              <select
                className="form-control"
                value={formData.unit}
                onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
              >
                <option value="KG">Kilogram (KG)</option>
                <option value="QUINTAL">Quintal (100 KG)</option>
                <option value="CRATE">Crate / Box</option>
                <option value="TON">Metric Ton</option>
                <option value="LITRE">Litre</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Stock Available*</label>
              <input
                type="number"
                className="form-control"
                required
                placeholder="500"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Harvest Date</label>
            <input
              type="date"
              className="form-control"
              value={formData.harvestDate}
              onChange={(e) => setFormData({ ...formData, harvestDate: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Produce Description & Cultivation Details</label>
            <textarea
              className="form-control"
              rows={3}
              placeholder="Describe farming practices, soil nutrition, irrigation (e.g., drip-irrigated with Jeevamrutha)..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Product Image URL (Simulated Upload)</label>
            <input
              type="url"
              className="form-control"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem' }}>
            <button type="button" className="btn btn-secondary" onClick={() => setIsModalOpen(false)}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              {editingProduct ? 'Save Changes' : 'Publish Produce Listing'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

