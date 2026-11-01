import express from 'express';
import { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct } from '../controllers/productController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { requireApprovedFarmer } from '../middlewares/roleMiddleware.js';

const router = express.Router();

router.get('/', getAllProducts);
router.get('/:id', getProductById);

router.post('/', authMiddleware, requireApprovedFarmer, createProduct);
router.put('/:id', authMiddleware, updateProduct);
router.delete('/:id', authMiddleware, deleteProduct);

export default router;
