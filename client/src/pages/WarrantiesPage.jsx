// src/pages/WarrantiesPage.jsx

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import productService from '../services/productService.js';
import AddProductForm from '../components/product/AddProductForm.jsx';

const WarrantiesPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(''); // Add state for user-facing errors

  useEffect(() => {
    const fetchProducts = async () => {
      setError(''); // Reset error on each fetch
      try {
        const data = await productService.getProducts();
        // Defensive check: Ensure data is an array before setting state
        if (Array.isArray(data)) {
          setProducts(data);
        } else {
          // If data is not an array, log an error and set products to empty array
          console.error("API did not return an array for products:", data);
          setProducts([]);
          setError('Could not load warranties. Please try again later.');
        }
      } catch (error) {
        console.error("Failed to fetch products", error);
        setError('Could not load warranties. Please try again later.');
        setProducts([]); // Ensure products is an empty array on error
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleProductAdded = (newProduct) => {
    setProducts(prevProducts => [newProduct, ...prevProducts]);
  };

  const handleDeleteProduct = async (productId) => {
    if (window.confirm('Are you sure you want to delete this warranty?')) {
      try {
        await productService.deleteProduct(productId);
        setProducts(products.filter(p => p._id !== productId));
      } catch (error) {
        console.error('Failed to delete product', error);
        alert('Could not delete the product. Please try again.');
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div>
      <AddProductForm onProductAdded={handleProductAdded} />
      
      <div className="mt-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Manage Your Warranties</h1>
        
        {/* Display a user-friendly error message if something went wrong */}
        {error && <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg">{error}</div>}

        <div className="bg-white p-6 rounded-lg shadow-md">
          {products.length === 0 && !error ? (
            <p className="text-center text-gray-500 py-4">You haven't added any warranties yet. Add one using the form above!</p>
          ) : (
            !error && <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Warranty Ends</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {products.map((product) => (
                    <tr key={product._id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product.productName}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.category}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(product.warrantyEndDate).toLocaleDateString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Link to={`/product/edit/${product._id}`} className="text-indigo-600 hover:text-indigo-900 mr-4">
                          Edit
                        </Link>
                        <button onClick={() => handleDeleteProduct(product._id)} className="text-red-600 hover:text-red-900">
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WarrantiesPage;
