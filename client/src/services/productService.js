
import axios from 'axios';

// environment variable for the base URL.
// Vite requires the prefix VITE_ for environment variables to be exposed to the client.
const API_BASE_URL = import.meta.env.VITE_API_URL;

// URLs for each endpoint
const API_URL_PRODUCTS = `${API_BASE_URL}/api/products`;
const API_URL_DOCUMENTS = `${API_BASE_URL}/api/documents`;
const UPLOAD_URL = `${API_BASE_URL}/api/upload`;

// Product Functions
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

// Document Functions

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

const deleteDocument = async (documentId) => {
  try {
    const response = await axios.delete(`${API_URL_DOCUMENTS}/${documentId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting document record:', error);
    throw error;
  }
};

//Upload Function

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

const productService = {
  getProducts,
  createProduct,
  deleteProduct,
  getProductById,
  updateProduct,
  getDocuments,
  createDocument,
  deleteDocument,
  uploadFile,
};

export default productService;
