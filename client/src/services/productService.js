import axios from 'axios';

// Get the API URL from the environment variables
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

const api = axios.create({
  baseURL: API_URL,
});

// Use an interceptor to add the auth token to every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// --- Product (Warranty) Functions ---

export const getProducts = async () => {
  try {
    const res = await api.get('/api/products');
    return res.data.data;
  } catch (error) {
    console.error('Error fetching products:', error.response?.data || error.message);
    throw error;
  }
};

export const getProductById = async (id) => {
  try {
    const res = await api.get(`/api/products/${id}`);
    return res.data.data;
  } catch (error) {
    console.error('Error fetching product by ID:', error.response?.data || error.message);
    throw error;
  }
};

export const createProduct = async (productData) => {
  try {
    const res = await api.post('/api/products', productData);
    return res.data.data;
  } catch (error) {
    console.error('Error creating product:', error.response?.data || error.message);
    throw error;
  }
};

export const updateProduct = async (id, productData) => {
  try {
    const res = await api.put(`/api/products/${id}`, productData);
    return res.data.data;
  } catch (error) {
    console.error('Error updating product:', error.response?.data || error.message);
    throw error;
  }
};

export const deleteProduct = async (id) => {
  try {
    const res = await api.delete(`/api/products/${id}`);
    return res.data.data;
  } catch (error) {
    console.error('Error deleting product:', error.response?.data || error.message);
    throw error;
  }
};


// --- Document Functions ---

export const getDocuments = async () => {
  try {
    const res = await api.get('/api/documents');
    return res.data.data;
  } catch (error) {
    console.error('Error fetching documents:', error.response?.data || error.message);
    throw error;
  }
};

export const createDocument = async (documentData) => {
    try {
        const res = await api.post('/api/documents', documentData);
        return res.data.data;
    } catch (error) {
        console.error('Error creating document record:', error.response?.data || error.message);
        throw error;
    }
};

export const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    try {
        const res = await api.post('/api/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return res.data; // The upload route returns { success: true, data: { url: '...' } }
    } catch (error) {
        console.error('Error uploading file:', error.response?.data || error.message);
        throw error;
    }
};

export const deleteDocument = async (id) => {
  try {
    const res = await api.delete(`/api/documents/${id}`);
    return res.data.data;
  } catch (error) {
    console.error('Error deleting document:', error.response?.data || error.message);
    throw error;
  }
};
