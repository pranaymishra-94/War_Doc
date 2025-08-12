
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';
import dotenv from 'dotenv';

// to use process.env (environment variables)
dotenv.config();

const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env;

// ensure all required environment variables are present
if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
  console.error('Error: Cloudinary environment variables are not set. Please check your .env file.');
  // Exit the process if configuration is missing
  process.exit(1);
}

// Configure Cloudinary with credentials
cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

// Configure multer storage engine for Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'warranty-tracker', // name of the folder in cloudinary
    allowed_formats: ['jpg', 'jpeg', 'png', 'pdf'], // supported files
    // public_id transformation to make filenames unique
    public_id: (req, file) => `${file.fieldname}-${Date.now()}`,
  },
});

// multer upload instance that will handle the file upload
const upload = multer({ storage: storage });

export default upload;
