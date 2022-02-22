import express from 'express';
import {
  registerUser,
  loginUser,
  getMyUserData,
  updateUser,
} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Add a user
router.route('/').post(registerUser);
router.route('/login').post(loginUser);
router.route('/user').get(protect, getMyUserData);
router.route('/:id').put(protect, updateUser);

export default router;
