    import React, { useState } from 'react';
    import * as productService from '../../services/productService';

    // Accept the onProductAdded function as a prop
    const AddProductForm = ({ onProductAdded }) => {
      const [formData, setFormData] = useState({
        productName: '',
        category: '',
        purchaseDate: '',
        warrantyEndDate: '',
      });
      const [error, setError] = useState('');
      const [success, setSuccess] = useState('');

      const { productName, category, purchaseDate, warrantyEndDate } = formData;

      const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

      const onSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        try {
          await productService.createProduct(formData);
          setSuccess('Warranty added successfully!');
          // Clear the form
          setFormData({
            productName: '',
            category: '',
            purchaseDate: '',
            warrantyEndDate: '',
          });
          // Call the refresh function passed from the parent
          onProductAdded();
        } catch (err) {
          setError('Failed to add warranty. Please try again.');
          console.error(err);
        }
      };

      return (
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Add New Warranty</h2>
          <form onSubmit={onSubmit} className="space-y-4">
            {error && <div className="rounded-md bg-red-50 p-4 text-sm text-red-700">{error}</div>}
            {success && <div className="rounded-md bg-green-50 p-4 text-sm text-green-700">{success}</div>}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="productName" className="block text-sm font-medium text-gray-700">Product Name</label>
                <input
                  type="text"
                  name="productName"
                  id="productName"
                  value={productName}
                  onChange={onChange}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="e.g., Laptop"
                />
              </div>
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
                <input
                  type="text"
                  name="category"
                  id="category"
                  value={category}
                  onChange={onChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="e.g., Electronics"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="purchaseDate" className="block text-sm font-medium text-gray-700">Purchase Date</label>
                <input
                  type="date"
                  name="purchaseDate"
                  id="purchaseDate"
                  value={purchaseDate}
                  onChange={onChange}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="warrantyEndDate" className="block text-sm font-medium text-gray-700">Warranty End Date</label>
                <input
                  type="date"
                  name="warrantyEndDate"
                  id="warrantyEndDate"
                  value={warrantyEndDate}
                  onChange={onChange}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Add Product
              </button>
            </div>
          </form>
        </div>
      );
    };

    export default AddProductForm;
    
