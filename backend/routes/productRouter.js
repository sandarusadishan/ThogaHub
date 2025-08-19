import express from 'express';
import { createProduct, getPendingProducts, approveProduct, getApprovedProducts } from '../controllers/productController.js';
const router = express.Router();

const authMiddleware = (req, res, next) => {
  if (!req.user) { return res.status(401).json({ msg: 'No token, authorization denied' }); }
  next();
};

router.post('/', authMiddleware, createProduct);
router.get('/pending', authMiddleware, getPendingProducts);
router.put('/approve/:id', authMiddleware, approveProduct);
router.get('/', getApprovedProducts);

export default router;