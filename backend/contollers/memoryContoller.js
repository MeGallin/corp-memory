import asyncHandler from 'express-async-handler';

// @description: Get All the Memories
// @route: GET /api/memories
// @access: Public
const getAllMemories = asyncHandler(async (req, res) => {
  res.status(200).json({ memories: 'All memories listed here' });
});
// @description: Create a Memory
// @route: POST /api/memories
// @access: Private
const createMemory = asyncHandler(async (req, res) => {
  if (!req.body.memory) {
    res.status(400);
    throw new Error('No message included');
  } else {
    res.status(200).json({ Memory: 'New Memory created now' });
  }
});
// @description: Update a Memory
// @route: PUT /api/memory/:id
// @access: Private
const updateMemory = asyncHandler(async (req, res) => {
  res.status(200).json({ Memory: `Update memory ${req.params.id}` });
});
// @description: Update a Memory
// @route: PUT /api/memory/:id
// @access: Private
const deleteMemory = asyncHandler(async (req, res) => {
  res.status(200).json({ Memory: `Memory ${req.params.id} deleted` });
});

export { getAllMemories, createMemory, updateMemory, deleteMemory };
