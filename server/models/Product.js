
import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  // Link this product to a specific user
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User', // This creates a reference to the User model
  },
  productName: {
    type: String,
    required: [true, 'Please add a product name'],
    trim: true, // Removes whitespace from both ends
  },
  category: {
    type: String,
    required: [true, 'Please add a category (e.g., Electronics, Appliance)'],
  },
  purchaseDate: {
    type: Date,
    required: [true, 'Please add a purchase date'],
  },
  warrantyEndDate: {
    type: Date,
    required: [true, 'Please add a warranty end date'],
  },
  // We will store URLs to the uploaded receipt and document files
  receiptUrl: {
    type: String,
  },
  documentUrl: {
    type: String,
  },
}, {
  timestamps: true,
});

const Product = mongoose.model('Product', productSchema);

export default Product;
