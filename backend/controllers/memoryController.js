import asyncHandler from 'express-async-handler';
import Memories from '../models/memories.js';
import User from '../models/userModel.js';

// @description: Get All the Memories
// @route: GET /api/memories
// @access: Public
const getAllMemories = asyncHandler(async (req, res) => {
  const memories = await Memories.find({ user: req.user._id });
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

  if (req.body.tags.length > 0) {
    const tag = {
      tagName: req.body.tags,
    };
    const memory = await Memories.create({
      title: req.body.title,
      memory: req.body.memory,
      dueDate: req.body.dueDate,
      rating: req.body.rating,
      user: req.user._id,
      tags: tag,
    });

    res.status(200).json(memory);
  } else {
    const memory = await Memories.create({
      title: req.body.title,
      memory: req.body.memory,
      dueDate: req.body.dueDate,
      rating: req.body.rating,
      user: req.user._id,
    });

    res.status(200).json(memory);
  }
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

  const user = await User.findById(req.user._id);
  // check for logged in user
  if (!user) {
    res.status(401);
    throw new Error('User not found');
  }
  if (memory.user.toString() !== user.id) {
    res.status(401);
    throw new Error('User not authorised');
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
  const user = await User.findById(req.user._id);
  // check for logged in user
  if (!user) {
    res.status(401);
    throw new Error('User not found');
  }
  if (memory.user.toString() !== user.id) {
    res.status(401);
    throw new Error('User not authorised');
  }
  await memory.remove();
  res.status(200).json({ id: `Memory ${req.params.id} deleted` });
});

export { getAllMemories, createMemory, updateMemory, deleteMemory };
