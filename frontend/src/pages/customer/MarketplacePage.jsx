import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { ProductCard } from '../../components/ProductCard';
import {
  IconSearch,
  IconFilter,
  IconLocation,
  IconLeaf,
  IconTractor
} from '../../components/Icons';

export const MarketplacePage = () => {
  const { products } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [farmingType, setFarmingType] = useState('ALL');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [maxPrice, setMaxPrice] = useState(300);
  const [locationFilter, setLocationFilter] = useState('');
  const [sortBy, setSortBy] = useState('featured');

  const filteredProducts = useMemo(() => {
    return products
      .filter(p => {
        // Search Term Filter
        if (searchTerm) {
          const matchTitle = p.title.toLowerCase().includes(searchTerm.toLowerCase());
          const matchFarmer = p.farmerName.toLowerCase().includes(searchTerm.toLowerCase());
          if (!matchTitle && !matchFarmer) return false;
        }

        // Farming Type Filter
        if (farmingType !== 'ALL' && p.farmingType !== farmingType) return false;

        // Category Filter
        if (selectedCategory !== 'ALL' && p.category !== selectedCategory) return false;

        // Price Filter
        if (p.price > maxPrice) return false;

        // Location Filter
        if (locationFilter) {
          const matchLoc = p.farmerLocation.toLowerCase().includes(locationFilter.toLowerCase());
          if (!matchLoc) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        return 0; // Default featured
      });
  }, [products, searchTerm, farmingType, selectedCategory, maxPrice, locationFilter, sortBy]);

  const clearFilters = () => {
    setSearchTerm('');
    setFarmingType('ALL');
    setSelectedCategory('ALL');
    setMaxPrice(300);
    setLocationFilter('');
  };

  return (
    <div className="container page-wrapper">
      <div className="marketplace-layout">
        {/* FILTERS SIDEBAR */}
        <aside className="marketplace-filter-sidebar">
          <div className="filter-title">
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <IconFilter size={18} /> Filters
            </span>
            <button
              onClick={clearFilters}
              style={{ background: 'none', border: 'none', color: 'var(--primary-green)', fontSize: '0.8rem', cursor: 'pointer', fontWeight: 600 }}
            >
              Reset All
            </button>
          </div>

          {/* Classification Filter (Organic vs Conventional) */}
          <div>
            <div className="filter-section-title">Produce Classification</div>
            <div className="radio-group">
              <label className="filter-radio-label">
                <input
                  type="radio"
                  name="farmingType"
                  value="ALL"
                  checked={farmingType === 'ALL'}
                  onChange={() => setFarmingType('ALL')}
                />
                <span>All Farming Practices</span>
              </label>

              <label className="filter-radio-label">
                <input
                  type="radio"
                  name="farmingType"
                  value="ORGANIC"
                  checked={farmingType === 'ORGANIC'}
                  onChange={() => setFarmingType('ORGANIC')}
                />
                <span style={{ color: '#15803d', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <IconLeaf size={14} /> 100% Certified Organic
                </span>
              </label>

              <label className="filter-radio-label">
                <input
                  type="radio"
                  name="farmingType"
                  value="CONVENTIONAL"
                  checked={farmingType === 'CONVENTIONAL'}
                  onChange={() => setFarmingType('CONVENTIONAL')}
                />
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <IconTractor size={14} /> Conventional Farming
                </span>
              </label>
            </div>
          </div>

          {/* Category Filter */}
          <div>
            <div className="filter-section-title">Crop Category</div>
            <div className="radio-group">
              {['ALL', 'Vegetables', 'Fruits', 'Grains', 'Spices', 'Oilseeds'].map(cat => (
                <label key={cat} className="filter-radio-label">
                  <input
                    type="radio"
                    name="category"
                    value={cat}
                    checked={selectedCategory === cat}
                    onChange={() => setSelectedCategory(cat)}
                  />
                  <span>{cat === 'ALL' ? 'All Categories' : cat}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Price Range Slider */}
          <div>
            <div className="filter-section-title">Max Price (₹ / unit)</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.35rem', color: 'var(--text-secondary)' }}>
              <span>₹10</span>
              <strong style={{ color: 'var(--dark-green)' }}>Up to ₹{maxPrice}</strong>
            </div>
            <input
              type="range"
              min="20"
              max="300"
              step="5"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              style={{ width: '100%', accentColor: 'var(--primary-green)' }}
            />
          </div>

          {/* Farm Location Filter */}
          <div>
            <div className="filter-section-title">Filter by Mandi / Location</div>
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                className="form-control"
                placeholder="e.g. Nashik, Ludhiana..."
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                style={{ paddingLeft: '2rem', fontSize: '0.85rem' }}
              />
              <IconLocation
                size={14}
                style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}
              />
            </div>
          </div>
        </aside>

        {/* MAIN RESULTS AREA */}
        <main className="marketplace-main">
          {/* SEARCH & SORT HEADER */}
          <div className="marketplace-search-bar">
            <div className="search-input-wrap">
              <IconSearch size={18} color="var(--text-muted)" />
              <input
                type="text"
                placeholder="Search fresh tomatoes, sharbati wheat, organic turmeric, or farmer name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <select
              className="search-sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="featured">Sort by: Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Customer Rating</option>
            </select>
          </div>

          {/* RESULT METRICS */}
          <div className="marketplace-results-info">
            <span>Showing <strong>{filteredProducts.length}</strong> farm-fresh produce listings</span>
            {(farmingType !== 'ALL' || selectedCategory !== 'ALL' || locationFilter) && (
              <span style={{ color: 'var(--primary-green)', fontWeight: 600 }}>Active filters applied</span>
            )}
          </div>

          {/* PRODUCT CARDS GRID */}
          <div className="grid grid-cols-3">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div style={{ textAlign: 'center', background: 'var(--bg-white)', padding: '4rem 2rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-cream)' }}>
              <IconLeaf size={40} color="var(--sprout-green)" />
              <h3 style={{ marginTop: '1rem', color: 'var(--dark-green)' }}>No agricultural produce found</h3>
              <p style={{ color: 'var(--text-muted)', maxWidth: '420px', margin: '0.5rem auto 1.5rem' }}>
                We couldn't find any harvest matching your filters. Try adjusting price thresholds or clearing location filters.
              </p>
              <button className="btn btn-outline" onClick={clearFilters}>
                Clear All Filters
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

