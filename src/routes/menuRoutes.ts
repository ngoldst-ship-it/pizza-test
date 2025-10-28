import { Router } from 'express';
import { getMenu } from '../controllers/menuController';

const router = Router();

// GET /api/menu - Get all pizzas
router.get('/menu', getMenu);

export default router;
