import User from '../models/User.js';
import jwt from 'jsonwebtoken';

// Helper function to sign a token
const signToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }

    // Create new user (password is automatically hashed by model middleware)
    const newUser = await User.create({
      name,
      email,
      password,
    });

    // Generate a token
    const token = signToken(newUser._id);

    // Send back the token and user data
    res.status(201).json({
      success: true,
      token,
      data: {
        user: newUser,
      },
    });

  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1) Check if email and password were provided
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide email and password' });
    }

    // 2) Find user and check if password is correct
    // We must explicitly select the password field since we set `select: false` in the schema
    const user = await User.findOne({ email }).select('+password');

    // Use the `matchPassword` method we added to the User model
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ success: false, message: 'Incorrect email or password' });
    }

    // 3) If everything is correct, send token to client
    const token = signToken(user._id);

    res.status(200).json({
      success: true,
      token,
    });

  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};

// Add this function to server/controllers/authController.js

// @desc    Get current logged in user
// @route   GET /api/auth/me
// @access  Private
export const getMe = async (req, res) => {
  // Because our `protect` middleware runs first,
  // the user's data is already attached to the request object as `req.user`.
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    data: user,
  });
};