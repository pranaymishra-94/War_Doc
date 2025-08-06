// server/models/Document.js

import mongoose from 'mongoose';

const documentSchema = new mongoose.Schema({
  // Link this document to a specific user
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  // The name of the uploaded file
  fileName: {
    type: String,
    required: true,
  },
  // The URL of the file stored on Cloudinary
  fileUrl: {
    type: String,
    required: true,
  },
  // The file type (e.g., 'image/png', 'application/pdf')
  fileType: {
    type: String,
  },
}, {
  timestamps: true, // Adds createdAt and updatedAt fields
});

const Document = mongoose.model('Document', documentSchema);

export default Document;
