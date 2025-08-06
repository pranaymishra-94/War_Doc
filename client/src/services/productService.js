// src/services/productService.js

import axios from 'axios';

// Define the base URLs for our different API endpoints
const API_URL_PRODUCTS = 'http://localhost:5001/api/products';
const API_URL_DOCUMENTS = 'http://localhost:5001/api/documents';
const UPLOAD_URL = 'http://localhost:5001/api/upload';

// --- Product Functions ---

const getProducts = async () => {
  try {
    const response = await axios.get(API_URL_PRODUCTS);
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

const createProduct = async (productData) => {
  try {
    const response = await axios.post(API_URL_PRODUCTS, productData);
    return response.data;
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
};

const deleteProduct = async (productId) => {
  try {
    const response = await axios.delete(`${API_URL_PRODUCTS}/${productId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
};

const getProductById = async (productId) => {
  try {
    const response = await axios.get(`${API_URL_PRODUCTS}/${productId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching product by ID:', error);
    throw error;
  }
};

const updateProduct = async (productId, productData) => {
  try {
    const response = await axios.put(`${API_URL_PRODUCTS}/${productId}`, productData);
    return response.data;
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  }
};

// --- Document Functions ---

const getDocuments = async () => {
  try {
    const response = await axios.get(API_URL_DOCUMENTS);
    return response.data;
  } catch (error) {
    console.error('Error fetching documents:', error);
    throw error;
  }
};

const createDocument = async (documentData) => {
  try {
    const response = await axios.post(API_URL_DOCUMENTS, documentData);
    return response.data;
  } catch (error) {
    console.error('Error creating document record:', error);
    throw error;
  }
};

// --- ADD THIS NEW FUNCTION ---
const deleteDocument = async (documentId) => {
  try {
    const response = await axios.delete(`${API_URL_DOCUMENTS}/${documentId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting document record:', error);
    throw error;
  }
};

// --- Upload Function ---

const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await axios.post(UPLOAD_URL, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
};

// Export all functions
const productService = {
  getProducts,
  createProduct,
  deleteProduct,
  getProductById,
  updateProduct,
  getDocuments,
  createDocument,
  deleteDocument, // <-- Export the new function
  uploadFile,
};

export default productService;
