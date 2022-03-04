import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/userModel.js';

// @description: Register new user
// @route: POST /api/users
// @access: Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  if (
    !name ||
    !email ||
    !password ||
    (!confirmPassword && password === confirmPassword)
  ) {
    res.status(400);
    throw new Error('Please add all fields');
  }
  // Check if user already exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error('That email is already in use.');
  }
  // hash the Password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  // Create the user
  const user = await User.create({ name, email, password: hashedPassword });

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id, user.email),
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});
// @description: Authenticate a user
// @route: POST /api/users/login
// @access: Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  // Check for user email first
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id, user.email),
    });
  } else {
    res.status(400);
    throw new Error('Invalid credentials');
  }
});
// @description: Update a USER
// @route: PUT /api/user/:id
// @access: Private
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    // hash the Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = hashedPassword;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      profileImage: updatedUser.profileImage,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error('No user found');
  }
});
// @description: Get user data of logged in in user
// @route: GET /api/users/user
// @access: PRIVATE
const getMyUserData = asyncHandler(async (req, res) => {
  const { _id, name, email, isAdmin, isConfirmed } = await User.findById(
    req.user.id,
  );
  res.status(200).json({
    id: _id,
    name,
    email,
    isAdmin,
    isConfirmed,
  });
});

// Generate a secret token for the user
const generateToken = (id, email) => {
  return jwt.sign({ id, email }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

export { registerUser, loginUser, getMyUserData, updateUser };
