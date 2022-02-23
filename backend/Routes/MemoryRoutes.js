import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import {
  getAllMemories,
  createMemory,
  updateMemory,
  deleteMemory,
  deleteMemoryTag,
} from '../controllers/memoryController.js';

const router = express.Router();

router.route('/').get(protect, getAllMemories);
router.route('/').post(protect, createMemory);
router.route('/:id').put(protect, updateMemory).delete(protect, deleteMemory);
router.route('/tag/:id').delete(protect, deleteMemoryTag);

export default router;
