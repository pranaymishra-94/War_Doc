// server/routes/productRoutes.js

import express from 'express';
// Import all controller functions
import { 
  getProducts, 
  createProduct, 
  updateProduct, 
  deleteProduct 
} from '../controllers/productController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect);

router.route('/')
  .get(getProducts)
  .post(createProduct);

// --- UPDATE THIS ROUTE ---
// Add the PUT method for updating
router.route('/:id')
  .put(updateProduct) // PUT /api/products/some_id
  .delete(deleteProduct);

export default router;
