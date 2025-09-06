// src/components/product/AddProductForm.jsx

import React, { useState } from 'react';
// This path is critical and must go up two levels.
import productService from '../../services/productService.js';

const AddProductForm = ({ onProductAdded }) => {
  const [formData, setFormData] = useState({
    productName: '',
    category: '',
    purchaseDate: '',
    warrantyEndDate: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { productName, category, purchaseDate, warrantyEndDate } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const newProduct = await productService.createProduct(formData);
      onProductAdded(newProduct); // Pass the new product back to the parent
      // Reset form
      setFormData({
        productName: '',
        category: '',
        purchaseDate: '',
        warrantyEndDate: '',
      });
    } catch (err) {
      setError('Failed to add product. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-8">
      <h2 className="text-2xl font-bold mb-4">Add New Warranty</h2>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <input
          type="text"
          name="productName"
          value={productName}
          onChange={onChange}
          placeholder="Product Name"
          required
          className="px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
        />
        <input
          type="text"
          name="category"
          value={category}
          onChange={onChange}
          placeholder="Category (e.g., Electronics)"
          required
          className="px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
        />
        <div>
          <label className="block text-sm font-medium text-gray-500">Purchase Date</label>
          <input
            type="date"
            name="purchaseDate"
            value={purchaseDate}
            onChange={onChange}
            required
            className="mt-1 px-3 py-2 border border-gray-300 rounded-md w-full focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-500">Warranty End Date</label>
          <input
            type="date"
            name="warrantyEndDate"
            value={warrantyEndDate}
            onChange={onChange}
            required
            className="mt-1 px-3 py-2 border border-gray-300 rounded-md w-full focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <button type="submit" disabled={loading} className="md:col-span-2 w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 disabled:opacity-50">
          {loading ? 'Adding...' : 'Add Product'}
        </button>
      </form>
    </div>
  );
};

export default AddProductForm;
