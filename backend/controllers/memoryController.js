import asyncHandler from 'express-async-handler';
import Memories from '../models/memories.js';

// @description: Get All the Memories
// @route: GET /api/memories
// @access: Public
const getAllMemories = asyncHandler(async (req, res) => {
  const memories = await Memories.find({ user: req.user.id });

  res.status(200).json(memories);
});
// @description: Create a Memory
// @route: POST /api/memories
// @access: Private
const createMemory = asyncHandler(async (req, res) => {
  if (!req.body.memory) {
    res.status(400);
    throw new Error('No message included');
  }

  const memory = new Memories({
    user: req.user.id,
    memory: req.body.memory,
    rating: req.body.rating,
  });

  console.log('DDD', memory);

  const createMemory = await memory.save();
  res.status(201).json(createMemory);
});
// @description: Update a Memory
// @route: PUT /api/memory/:id
// @access: Private
const updateMemory = asyncHandler(async (req, res) => {
  const memory = await Memories.findById(req.params.id);

  if (!memory) {
    res.status(400);
    throw new Error('Memory not found');
  }

  const undatedMemory = await Memories.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
  );

  res.status(200).json(undatedMemory);
});
// @description: Delete a Memory
// @route: DELETE /api/memory/:id
// @access: Private
const deleteMemory = asyncHandler(async (req, res) => {
  const memory = await Memories.findById(req.params.id);
  if (!memory) {
    res.status(400);
    throw new Error('Memory not found');
  }
  await memory.remove();
  res.status(200).json({ id: `Memory ${req.params.id} deleted` });
});

export { getAllMemories, createMemory, updateMemory, deleteMemory };
