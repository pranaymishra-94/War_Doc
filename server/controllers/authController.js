// server/controllers/authController.js

import User from '../models/User.js';
import jwt from 'jsonwebtoken';

// Helper function to sign a token
const signToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '90d',
  });
};

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Defensive check: Ensure required fields are provided
    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide name, email, and password' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'User with this email already exists' });
    }

    // Create a new user
    const newUser = await User.create({
      name,
      email,
      password,
    });

    // Generate a token
    const token = signToken(newUser._id);

    // Send back a clean user object without the password
    const userResponse = {
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
    };

    res.status(201).json({
      success: true,
      token,
      data: {
        user: userResponse
      }
    });

  } catch (error) {
    // Log the detailed error on the server for debugging
    console.error('REGISTER ERROR:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// Login and getMe functions remain the same...
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide email and password' });
    }
    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ success: false, message: 'Incorrect email or password' });
    }
    const token = signToken(user._id);
    res.status(200).json({
      success: true,
      token,
    });
  } catch (error) {
    console.error('LOGIN ERROR:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.error('GETME ERROR:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};
