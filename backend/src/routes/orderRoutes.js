import express from 'express';
import { createOrder, getCustomerOrders, getFarmerOrders, updateOrderStatus } from '../controllers/orderController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.use(authMiddleware);

router.post('/', createOrder);
router.get('/customer', getCustomerOrders);
router.get('/farmer', getFarmerOrders);
router.patch('/:id/status', updateOrderStatus);

export default router;
