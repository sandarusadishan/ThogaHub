import express from 'express';
import { sendMessage } from '../controllers/messagingController.js';
const router = express.Router();

const authMiddleware = (req, res, next) => {
  if (!req.user) { return res.status(401).json({ msg: 'No token, authorization denied' }); }
  next();
};

router.post('/', authMiddleware, sendMessage);

export default router;