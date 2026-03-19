import express from 'express';
import {
  register,
  login,
  getProfile,
  logout,
  getSessionStatus
} from '../controllers/authController.js';
import { requireAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', requireAuth, logout);
router.get('/profile', requireAuth, getProfile);
router.get('/session', getSessionStatus);

export default router;
