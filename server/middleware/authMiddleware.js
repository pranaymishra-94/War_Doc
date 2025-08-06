// server/middleware/authMiddleware.js

import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// Middleware to protect routes
export const protect = async (req, res, next) => {
  let token;

  // 1) Check if the authorization header exists and starts with 'Bearer'
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // 2) Get token from header (format is "Bearer TOKEN")
      token = req.headers.authorization.split(' ')[1];

      // 3) Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // 4) Find the user by the ID from the token's payload
      // Attach the user to the request object, excluding the password
      req.user = await User.findById(decoded.id).select('-password');
      
      // 5) Move to the next middleware or route handler
      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ success: false, message: 'Not authorized, token failed' });
    }
  }

  // If no token is found at all
  if (!token) {
    res.status(401).json({ success: false, message: 'Not authorized, no token' });
  }
};
