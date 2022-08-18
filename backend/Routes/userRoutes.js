import express from 'express';
import {
  registerUser,
  loginUser,
  getMyUserData,
  updateUser,
  userForgotPassword,
} from '../controllers/userController.js';

import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Add a user
router.route('/').post(registerUser);
router.route('/login').post(loginUser);
router.route('/user').get(protect, getMyUserData);
router.route('/:id').put(protect, updateUser);

//Forgotten password Routes
router.route('/user_forgot_password').post(userForgotPassword);

export default router;
