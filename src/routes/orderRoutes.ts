import { Router } from 'express';
import { createOrder, getOrder, updateOrder } from '../controllers/orderController';

const router = Router();

// POST /api/order - Create a new order
router.post('/order', createOrder);

// GET /api/order/:orderId - Get order by ID
router.get('/order/:orderId', getOrder);

// PATCH /api/order/:orderId - Update order
router.patch('/order/:orderId', updateOrder);

export default router;
