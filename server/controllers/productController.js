// server/controllers/productController.js

import Product from '../models/Product.js';

// getProducts and createProduct functions remain the same...
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({ user: req.user.id });
    res.json(products);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

export const createProduct = async (req, res) => {
  const { productName, category, purchaseDate, warrantyEndDate } = req.body;
  try {
    const newProduct = new Product({
      productName,
      category,
      purchaseDate,
      warrantyEndDate,
      user: req.user.id,
    });
    const product = await newProduct.save();
    res.status(201).json(product);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};


// --- ADD THIS UPDATE FUNCTION ---
// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private
export const updateProduct = async (req, res) => {
  const { productName, category, purchaseDate, warrantyEndDate } = req.body;

  try {
    let product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ msg: 'Product not found' });
    }

    // Make sure user owns the product
    if (product.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    product = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: { productName, category, purchaseDate, warrantyEndDate } },
      { new: true } // Return the modified document
    );

    res.json(product);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};


// deleteProduct function remains the same...
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ msg: 'Product not found' });
    }
    if (product.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }
    await product.deleteOne();
    res.json({ msg: 'Product removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
        return res.status(404).json({ msg: 'Product not found' });
    }
    res.status(500).send('Server Error');
  }
};
