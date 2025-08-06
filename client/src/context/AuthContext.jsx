// src/context/AuthContext.jsx

import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// 1. Create the context
const AuthContext = createContext();

// 2. Create the provider component
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [loading, setLoading] = useState(true);

  // Set the default authorization header for axios
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

  // Function to load the user data if a token exists
  const loadUser = async () => {
    if (token) {
      try {
        const res = await axios.get('http://localhost:5001/api/auth/me');
        setUser(res.data.data);
      } catch (err) {
        // If token is invalid, remove it
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
      }
    }
    setLoading(false);
  };

  // Load user on initial component mount
  useEffect(() => {
    loadUser();
  }, [token]); // Rerun if token changes

  // Login user function
  const login = async (email, password) => {
    const config = { headers: { 'Content-Type': 'application/json' } };
    const body = JSON.stringify({ email, password });

    try {
      const res = await axios.post('http://localhost:5001/api/auth/login', body, config);
      localStorage.setItem('token', res.data.token);
      setToken(res.data.token);
      await loadUser(); // Load user data after setting token
      return { success: true };
    } catch (err) {
      return { success: false, message: err.response?.data?.message || 'Login failed' };
    }
  };

  // Signup user function
  const signup = async (name, email, password) => {
    const config = { headers: { 'Content-Type': 'application/json' } };
    const body = JSON.stringify({ name, email, password });

    try {
      const res = await axios.post('http://localhost:5001/api/auth/register', body, config);
      localStorage.setItem('token', res.data.token);
      setToken(res.data.token);
      await loadUser();
      return { success: true };
    } catch (err) {
      return { success: false, message: err.response?.data?.message || 'Signup failed' };
    }
  };

  // Logout user function
  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        isAuthenticated: !!user,
        loading,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
