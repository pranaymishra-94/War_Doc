// server/config/cloudinary.js

import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env;

// --- ADDED THIS CHECK ---
// Defensive check to ensure all required environment variables are present.
if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
  console.error('Error: Cloudinary environment variables are not set. Please check your .env file.');
  // Exit the process if configuration is missing, as the app cannot function without it.
  process.exit(1);
}

// Configure Cloudinary with credentials from your .env file
cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

// Configure multer storage engine for Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'warranty-tracker', // The name of the folder in your Cloudinary account
    allowed_formats: ['jpg', 'jpeg', 'png', 'pdf'], // Allowed file formats
    // You can add a public_id transformation to make filenames unique
    public_id: (req, file) => `${file.fieldname}-${Date.now()}`,
  },
});

// Create the multer upload instance that will handle the file upload
const upload = multer({ storage: storage });

export default upload;
