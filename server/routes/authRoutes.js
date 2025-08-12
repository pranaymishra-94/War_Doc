
import express from 'express';
import { register, login, getMe } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// --- Public Routes ---
router.post('/register', register);
router.post('/login', login);

// --- Private/Protected Route ---
// When a GET request is made to /me, it first runs the `protect` middleware.
// If the middleware successfully verifies the user's token, it will then
// call the `getMe` controller function. Otherwise, it will return an error.
router.get('/me', protect, getMe);

export default router;
