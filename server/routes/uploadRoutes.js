// server/routes/uploadRoutes.js

import express from 'express';
import upload from '../config/cloudinary.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// @desc    Upload a file to Cloudinary
// @route   POST /api/upload
// @access  Private
router.post('/', protect, upload.single('file'), (req, res) => {
  // This controller function only runs if the `upload.single('file')` middleware succeeds.
  // The middleware handles the entire upload process to Cloudinary.
  
  // If `req.file` exists, the upload was successful.
  if (req.file) {
    res.status(200).json({
      message: 'File uploaded successfully',
      // The secure URL of the uploaded file is in `req.file.path`
      url: req.file.path, 
    });
  } else {
    // This case would typically be caught by multer's error handling,
    // but it's good practice to have a fallback.
    res.status(400).json({ message: 'File upload failed. No file received.' });
  }
});

export default router;
