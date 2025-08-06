// src/components/routing/PrivateRoute.jsx

import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext.jsx';

const PrivateRoute = () => {
  const { isAuthenticated, loading } = useContext(AuthContext);

  // While the authentication status is loading, we can show a spinner or nothing
  if (loading) {
    return <div>Loading...</div>; // Or a spinner component
  }
  
  // If the user is authenticated, render the child route (e.g., DashboardPage)
  // The <Outlet /> component from react-router-dom does this.
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
