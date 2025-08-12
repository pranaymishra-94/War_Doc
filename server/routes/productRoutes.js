
import express from 'express';
import { 
  getProducts, 
  createProduct, 
  updateProduct, 
  deleteProduct 
} from '../controllers/productController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect);
// CRUD Operations
router.route('/')
  .get(getProducts)
  .post(createProduct);

router.route('/:id')
  .put(updateProduct) // PUT /api/products/some_id
  .delete(deleteProduct);

export default router;
