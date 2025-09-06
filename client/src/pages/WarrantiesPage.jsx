    import React, { useState, useEffect, useContext } from 'react';
    import { Link } from 'react-router-dom';
    import { AuthContext } from '../context/AuthContext';
    import * as productService from '../services/productService';
    import AddProductForm from '../components/product/AddProductForm';

    const WarrantiesPage = () => {
      const [products, setProducts] = useState([]);
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState('');
      const { user } = useContext(AuthContext);

      // Moved fetchProducts to be a standalone function
      const fetchProducts = async () => {
        if (!user) return;
        setLoading(true);
        try {
          const fetchedProducts = await productService.getProducts();
          if (Array.isArray(fetchedProducts)) {
            setProducts(fetchedProducts);
          } else {
            console.error('API did not return an array for products:', fetchedProducts);
            setProducts([]); // Ensure products is always an array
            setError('Could not load warranties. Please try again later.');
          }
        } catch (err) {
          setError('Failed to fetch warranties.');
          console.error(err);
        } finally {
          setLoading(false);
        }
      };

      useEffect(() => {
        fetchProducts();
      }, [user]);

      const handleDeleteProduct = async (productId) => {
        if (window.confirm('Are you sure you want to delete this warranty?')) {
          try {
            await productService.deleteProduct(productId);
            // After deleting, call fetchProducts again to refresh the list
            fetchProducts();
          } catch (err) {
            setError('Failed to delete warranty.');
            console.error(err);
          }
        }
      };

      if (loading) {
        return <div className="p-8"><p>Loading warranties...</p></div>;
      }

      return (
        <div className="p-4 sm:p-6 lg:p-8 space-y-8">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">
              Manage Your Warranties
            </h1>
            <p className="mt-1 text-sm text-gray-600">
              Add, edit, or delete your product warranties here.
            </p>
          </div>

          <AddProductForm onProductAdded={fetchProducts} />

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Your Warranties</h2>
            {error && <div className="my-4 rounded-md bg-red-50 p-4 text-sm text-red-700">{error}</div>}
            <div className="overflow-x-auto">
              {products.length > 0 ? (
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product Name</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Warranty Ends</th>
                      <th scope="col" className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {products.map((product) => (
                      <tr key={product._id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product.productName}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.category}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(product.warrantyEndDate).toLocaleDateString()}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-4">
                          <Link to={`/product/edit/${product._id}`} className="text-indigo-600 hover:text-indigo-900">Edit</Link>
                          <button onClick={() => handleDeleteProduct(product._id)} className="text-red-600 hover:text-red-900">Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="text-center text-gray-500 py-4">You have not added any warranties yet.</p>
              )}
            </div>
          </div>
        </div>
      );
    };

    export default WarrantiesPage;
    
