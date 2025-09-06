import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
// Corrected import statement
import * as productService from '../services/productService.js';
import { Link } from 'react-router-dom';

const DashboardPage = () => {
    const [productCount, setProductCount] = useState(0);
    const [documentCount, setDocumentCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        const fetchData = async () => {
            if (!user) return;
            try {
                setLoading(true);
                // Fetch both counts in parallel for better performance
                const [products, documents] = await Promise.all([
                    productService.getProducts(),
                    productService.getDocuments()
                ]);

                if (Array.isArray(products)) {
                    setProductCount(products.length);
                }
                if (Array.isArray(documents)) {
                    setDocumentCount(documents.length);
                }
            } catch (error) {
                console.error("Failed to fetch dashboard data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [user]);

    if (loading) {
        return <div className="p-8"><p>Loading dashboard...</p></div>;
    }

    return (
        <div className="p-4 sm:p-6 lg:p-8">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">Dashboard Overview</h1>
            <p className="mt-1 text-sm text-gray-600">
                Here's a quick summary of your saved items.
            </p>

            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {/* Warranties Card */}
                <div className="overflow-hidden rounded-lg bg-white shadow">
                    <div className="p-5">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.471l-2.064 2.064-1.414-1.414 2.064-2.064a1.5 1.5 0 012.121 2.121zM12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4z" />
                                </svg>
                            </div>
                            <div className="ml-5 w-0 flex-1">
                                <dl>
                                    <dt className="truncate text-sm font-medium text-gray-500">Total Warranties</dt>
                                    <dd>
                                        <div className="text-lg font-medium text-gray-900">{productCount}</div>
                                    </dd>
                                </dl>
                            </div>
                        </div>
                    </div>
                    <div className="bg-gray-50 px-5 py-3">
                        <div className="text-sm">
                            <Link to="/warranties" className="font-medium text-indigo-700 hover:text-indigo-900">
                                View all
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Documents Card */}
                <div className="overflow-hidden rounded-lg bg-white shadow">
                    <div className="p-5">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <div className="ml-5 w-0 flex-1">
                                <dl>
                                    <dt className="truncate text-sm font-medium text-gray-500">Total Documents</dt>
                                    <dd>
                                        <div className="text-lg font-medium text-gray-900">{documentCount}</div>
                                    </dd>
                                </dl>
                            </div>
                        </div>
                    </div>
                    <div className="bg-gray-50 px-5 py-3">
                        <div className="text-sm">
                            <Link to="/documents" className="font-medium text-indigo-700 hover:text-indigo-900">
                                View all
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
