import express from 'express';
import {
  getAllMemories,
  createMemory,
  updateMemory,
  deleteMemory,
} from '../contollers/memoryContoller.js';

const router = express.Router();

router.route('/').get(getAllMemories);
router.route('/').post(createMemory);
router.route('/:id').put(updateMemory).delete(deleteMemory);

export default router;
