// src/App.jsx

import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Import Components
import LandingPage from './pages/LandingPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import SignupPage from './pages/SignupPage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import WarrantiesPage from './pages/WarrantiesPage.jsx'; // Import Warranties Page
import DocumentsPage from './pages/DocumentsPage.jsx';   // Import Documents Page
import EditProductPage from './pages/EditProductPage.jsx';
import PrivateRoute from './components/routing/PrivateRoute.jsx';
import DashboardLayout from './components/layout/DashboardLayout.jsx';

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />

      {/* Protected Routes */}
      <Route element={<PrivateRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/warranties" element={<WarrantiesPage />} />
          <Route path="/documents" element={<DocumentsPage />} />
          <Route path="/product/edit/:id" element={<EditProductPage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
