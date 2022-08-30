import asyncHandler from 'express-async-handler';
import Memories from '../models/memoriesModel.js';
import User from '../models/userModel.js';
import MemoryImages from '../models/memoryImageModel.js';

// @description: Get All the Memories
// @route: GET /api/memories
// @access: Public
const getAllMemories = asyncHandler(async (req, res) => {
  const memories = await Memories.find({ user: req.user._id }).sort({
    createdAt: -1,
  });
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
    const tag = [
      {
        tagName: req.body.tags,
      },
    ];
    const memory = await Memories.create({
      title: req.body.title,
      memory: req.body.memory,
      setDueDate: req.body.setDueDate,
      dueDate: req.body.dueDate,
      priority: req.body.priority,
      isComplete: req.body.isComplete,
      user: req.user._id,
      tags: tag,
    });

    res.status(200).json(memory);
  } else {
    const memory = await Memories.create({
      title: req.body.title,
      memory: req.body.memory,
      setDueDate: req.body.setDueDate,
      dueDate: req.body.dueDate,
      priority: req.body.priority,
      isComplete: req.body.isComplete,
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

  const tags = req.body.tags;
  const updatedData = {
    title: req.body.title,
    memory: req.body.memory,
    priority: req.body.priority,
    setDueDate: req.body.setDueDate,
    dueDate: req.body.dueDate,
    isComplete: req.body.isComplete,
    tags: tags,
  };

  const undatedMemory = await Memories.findByIdAndUpdate(
    req.params.id,
    updatedData,
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

// @description: Delete a Memory TAG
// @route: DELETE /api/memory/tag:id
// @access: Private
const deleteMemoryTag = asyncHandler(async (req, res) => {
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

  // Remove object for array
  memory.tags.shift();
  await memory.save();
  res.status(200).json(memory);
});

// @description: Delete a Memory Image
// @route: DELETE /api/memory-image/delete/:id
// @access: Private
const deleteMemoryImage = asyncHandler(async (req, res) => {
  // Find a memory
  const memory = await Memories.findById(req.params.id);

  console.log(memory);

  if (memory) {
    // Associate it with memory image
    const image = await MemoryImages.findOne({
      cloudinaryId: memory.cloudinaryId,
    });
    await image.remove();

    const tags = req.body.tags;
    const updatedData = {
      title: req.body.title,
      memory: req.body.memory,
      priority: req.body.priority,
      setDueDate: req.body.setDueDate,
      dueDate: req.body.dueDate,
      isComplete: req.body.isComplete,
      tags: tags,
      cloudinaryId: null,
      memoryImage: null,
    };

    const undatedMemory = await Memories.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true },
    );

    res.status(200).json(undatedMemory);

    res.status(200).json({ id: `Memory ${req.params.id} deleted` });
  }

  // if (!memory) {
  //   res.status(400);
  //   throw new Error('Memory not found');
  // }
  // const user = await User.findById(req.user._id);
  // // check for logged in user
  // if (!user) {
  //   res.status(401);
  //   throw new Error('User not found');
  // }
  // if (memory.user.toString() !== user.id) {
  //   res.status(401);
  //   throw new Error('User not authorised');
  // }
  // await memory.remove();
  // res.status(200).json({ id: `Memory ${req.params.id} deleted` });
});

export {
  getAllMemories,
  createMemory,
  updateMemory,
  deleteMemory,
  deleteMemoryTag,
  deleteMemoryImage,
};
