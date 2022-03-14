import express from 'express';
import { protect, admin } from '../middleware/authMiddleware.js';
import { getAllUsersMemories } from '../controllers/adminController.js';

const router = express.Router();

router.route('/').get(protect, admin, getAllUsersMemories);

export default router;
