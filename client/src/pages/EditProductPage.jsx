// src/pages/EditProductPage.jsx

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import productService from '../services/productService';

const EditProductPage = () => {
  const { id } = useParams(); // Get the product ID from the URL
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    productName: '',
    category: '',
    purchaseDate: '',
    warrantyEndDate: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const product = await productService.getProductById(id);
        // Format dates for the input[type=date] fields
        const formattedProduct = {
          ...product,
          purchaseDate: new Date(product.purchaseDate).toISOString().split('T')[0],
          warrantyEndDate: new Date(product.warrantyEndDate).toISOString().split('T')[0],
        };
        setFormData(formattedProduct);
      } catch (err) {
        setError('Failed to fetch product data.');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    try {
      await productService.updateProduct(id, formData);
      navigate('/dashboard'); // Redirect to dashboard after successful update
    } catch (err) {
      setError('Failed to update product. Please try again.');
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="bg-white p-8 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">Edit Warranty</h1>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <input type="text" name="productName" value={formData.productName} onChange={onChange} placeholder="Product Name" required className="px-3 py-2 border border-gray-300 rounded-md" />
        <input type="text" name="category" value={formData.category} onChange={onChange} placeholder="Category" required className="px-3 py-2 border border-gray-300 rounded-md" />
        <div>
          <label className="block text-sm font-medium text-gray-500">Purchase Date</label>
          <input type="date" name="purchaseDate" value={formData.purchaseDate} onChange={onChange} required className="mt-1 px-3 py-2 border border-gray-300 rounded-md w-full" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-500">Warranty End Date</label>
          <input type="date" name="warrantyEndDate" value={formData.warrantyEndDate} onChange={onChange} required className="mt-1 px-3 py-2 border border-gray-300 rounded-md w-full" />
        </div>
        <button type="submit" className="md:col-span-2 w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditProductPage;
