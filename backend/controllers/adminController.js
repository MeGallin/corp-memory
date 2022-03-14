import asyncHandler from 'express-async-handler';
import Memories from '../models/memoriesModel.js';
import User from '../models/userModel.js';

// @description: Get All the Users and Memories
// @route: GET /api/admin/user-memories
// @access: Admin and Private
const getAllUsersMemories = asyncHandler(async (req, res) => {
  const memories = await Memories.find({});
  const users = await User.find({});
  const all = { ...memories, ...users };
  res.status(200).json(all);
});

export { getAllUsersMemories };
