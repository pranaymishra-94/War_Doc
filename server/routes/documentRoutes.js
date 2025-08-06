// server/routes/documentRoutes.js

import express from 'express';
// Import all controller functions
import { 
  getDocuments, 
  createDocument, 
  deleteDocument 
} from '../controllers/documentController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect);

router.route('/')
  .get(getDocuments)
  .post(createDocument);

// --- ADD THIS NEW ROUTE ---
router.route('/:id')
  .delete(deleteDocument); // DELETE /api/documents/some_id

export default router;
