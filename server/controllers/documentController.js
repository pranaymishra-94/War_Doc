// server/controllers/documentController.js

import Document from '../models/Document.js';

// getDocuments and createDocument functions remain the same...
export const getDocuments = async (req, res) => {
  try {
    const documents = await Document.find({ user: req.user.id });
    res.json(documents);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

export const createDocument = async (req, res) => {
  const { fileName, fileUrl, fileType } = req.body;
  try {
    const newDocument = new Document({
      fileName,
      fileUrl,
      fileType,
      user: req.user.id,
    });
    const document = await newDocument.save();
    res.status(201).json(document);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// --- ADD THIS NEW FUNCTION ---
// @desc    Delete a document
// @route   DELETE /api/documents/:id
// @access  Private
export const deleteDocument = async (req, res) => {
  try {
    const document = await Document.findById(req.params.id);

    if (!document) {
      return res.status(404).json({ msg: 'Document not found' });
    }

    // Check if the user owns the document
    if (document.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await document.deleteOne();

    // Note: This only deletes the record from our database.
    // For a full implementation, you would also add code here to
    // delete the file from Cloudinary to save space.

    res.json({ msg: 'Document record removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
