// src/pages/DashboardPage.jsx

import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext.jsx';
import productService from '../services/productService.js';

const DashboardPage = () => {
  const { user } = useContext(AuthContext);
  const [productCount, setProductCount] = useState(0);
  const [documentCount, setDocumentCount] = useState(0); // New state for document count
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fetch both products and documents at the same time
        const [productsData, documentsData] = await Promise.all([
          productService.getProducts(),
          productService.getDocuments()
        ]);

        if (Array.isArray(productsData)) {
          setProductCount(productsData.length);
        }
        if (Array.isArray(documentsData)) {
          setDocumentCount(documentsData.length);
        }
      } catch (error) {
        console.error("Failed to fetch dashboard data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800">Dashboard Overview</h1>
      <p className="mt-2 text-gray-600">Welcome back, {user?.name}!</p>
      
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-700">Total Warranties</h2>
          <p className="mt-2 text-4xl font-bold text-indigo-600">{productCount}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-700">Total Documents</h2>
          {/* Display the correct document count */}
          <p className="mt-2 text-4xl font-bold text-green-500">{documentCount}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-700">Expiring Soon</h2>
          <p className="mt-2 text-4xl font-bold text-yellow-500">0</p>
           <p className="text-xs text-gray-400 mt-1">Coming soon</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
