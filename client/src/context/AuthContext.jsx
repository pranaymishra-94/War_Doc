// src/context/AuthContext.jsx

import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [loading, setLoading] = useState(true);

  // Use the environment variable for the base URL
  const API_BASE_URL = import.meta.env.VITE_API_URL;

  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

  const loadUser = async () => {
    if (token) {
      try {
        // Update the URL here
        const res = await axios.get(`${API_BASE_URL}/api/auth/me`);
        setUser(res.data.data);
      } catch (err) {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
      }
    }
    setLoading(false);
  };

  useEffect(() => { loadUser(); }, [token]);

  const login = async (email, password) => {
    const config = { headers: { 'Content-Type': 'application/json' } };
    const body = JSON.stringify({ email, password });
    try {
      // Update the URL here
      const res = await axios.post(`${API_BASE_URL}/api/auth/login`, body, config);
      localStorage.setItem('token', res.data.token);
      setToken(res.data.token);
      await loadUser();
      return { success: true };
    } catch (err) {
      return { success: false, message: err.response?.data?.message || 'Login failed' };
    }
  };

  const signup = async (name, email, password) => {
    const config = { headers: { 'Content-Type': 'application/json' } };
    const body = JSON.stringify({ name, email, password });
    try {
      // Update the URL here
      const res = await axios.post(`${API_BASE_URL}/api/auth/register`, body, config);
      localStorage.setItem('token', res.data.token);
      setToken(res.data.token);
      await loadUser();
      return { success: true };
    } catch (err) {
      return { success: false, message: err.response?.data?.message || 'Signup failed' };
    }
  };

  const logout = () => { /* ... same as before ... */ };

  return (
    <AuthContext.Provider value={{ token, user, isAuthenticated: !!user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
