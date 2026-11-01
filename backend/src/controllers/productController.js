import { memoryDb } from '../utils/memoryDb.js';
import { FARMING_TYPES } from '../config/constants.js';

export const getAllProducts = (req, res) => {
  const { farmingType, category, search, minPrice, maxPrice, location } = req.query;

  let results = [...memoryDb.products].filter(p => p.isActive);

  if (farmingType && farmingType !== 'ALL') {
    results = results.filter(p => p.farmingType === farmingType);
  }

  if (category && category !== 'ALL') {
    results = results.filter(p => p.category.toLowerCase() === category.toLowerCase());
  }

  if (search) {
    const s = search.toLowerCase();
    results = results.filter(p => p.title.toLowerCase().includes(s) || p.farmerName.toLowerCase().includes(s));
  }

  if (minPrice) {
    results = results.filter(p => p.price >= Number(minPrice));
  }

  if (maxPrice) {
    results = results.filter(p => p.price <= Number(maxPrice));
  }

  if (location) {
    const loc = location.toLowerCase();
    results = results.filter(p => p.farmerLocation.toLowerCase().includes(loc));
  }

  res.json({
    success: true,
    count: results.length,
    products: results
  });
};

export const getProductById = (req, res) => {
  const product = memoryDb.products.find(p => p.id === Number(req.params.id));
  if (!product || !product.isActive) {
    return res.status(404).json({ success: false, message: 'Product listing not found.' });
  }

  res.json({
    success: true,
    product
  });
};

export const createProduct = (req, res, next) => {
  try {
    const { title, category, farmingType = FARMING_TYPES.CONVENTIONAL, price, unit = 'KG', stock, description, image, harvestDate } = req.body;
    const user = req.user;

    if (!title || !price || !stock) {
      return res.status(400).json({ success: false, message: 'Title, price, and stock are required.' });
    }

    const newProduct = {
      id: Date.now(),
      farmerId: user.id,
      farmerName: user.fullName || user.name,
      farmerLocation: `${user.city || 'Nashik'}, ${user.state || 'Maharashtra'}`,
      title,
      category: category || 'Vegetables',
      farmingType,
      price: Number(price),
      unit,
      stock: Number(stock),
      harvestDate: harvestDate || new Date().toISOString().split('T')[0],
      rating: 5.0,
      reviewCount: 0,
      image: image || 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&auto=format&fit=crop&q=80',
      description: description || '',
      isActive: true,
      createdAt: new Date().toISOString()
    };

    memoryDb.products.unshift(newProduct);

    res.status(201).json({
      success: true,
      message: 'Agricultural produce listed successfully.',
      product: newProduct
    });
  } catch (error) {
    next(error);
  }
};

export const updateProduct = (req, res) => {
  const product = memoryDb.products.find(p => p.id === Number(req.params.id));
  if (!product) {
    return res.status(404).json({ success: false, message: 'Product listing not found.' });
  }

  if (product.farmerId !== req.user.id && req.user.role !== 'ADMIN') {
    return res.status(403).json({ success: false, message: 'Unauthorized to modify this listing.' });
  }

  Object.assign(product, req.body);
  if (req.body.price) product.price = Number(req.body.price);
  if (req.body.stock) product.stock = Number(req.body.stock);

  res.json({
    success: true,
    message: 'Product updated successfully.',
    product
  });
};

export const deleteProduct = (req, res) => {
  const index = memoryDb.products.findIndex(p => p.id === Number(req.params.id));
  if (index === -1) {
    return res.status(404).json({ success: false, message: 'Product listing not found.' });
  }

  const product = memoryDb.products[index];
  if (product.farmerId !== req.user.id && req.user.role !== 'ADMIN') {
    return res.status(403).json({ success: false, message: 'Unauthorized to delete this listing.' });
  }

  memoryDb.products.splice(index, 1);
  res.json({
    success: true,
    message: 'Product listing removed from marketplace.'
  });
};
