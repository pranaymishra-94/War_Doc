// src/components/layout/DashboardLayout.jsx

import React, { useContext } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
// --- THIS IMPORT PATH IS NOW CORRECTED ---
import { AuthContext } from '../../context/AuthContext.jsx';

const DashboardLayout = () => {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  // This is a defensive check. If AuthContext is not provided by a parent,
  // authContext will be undefined. This prevents the app from crashing.
  if (!authContext) {
    // This error is for the developer. It means you forgot to wrap your
    // component tree with <AuthProvider> in main.jsx or App.jsx
    return (
        <div className="p-4 text-center text-red-500 bg-red-100">
            <strong>Error:</strong> AuthContext is not available. Ensure this component is wrapped within an AuthProvider.
        </div>
    );
  }

  const { user, logout } = authContext;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Define styles for active and inactive links
  const baseLinkClass = "flex items-center px-6 py-3 mt-4 text-gray-600";
  const activeLinkClass = "bg-gray-200 text-gray-700 font-bold";
  const inactiveLinkClass = "hover:bg-gray-200";

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="hidden md:flex flex-col w-64 bg-white shadow-lg flex-shrink-0">
        <div className="flex items-center justify-center h-20 shadow-md">
          <h1 className="text-2xl font-bold text-indigo-600">WarrantyTrack</h1>
        </div>
        <nav className="flex-grow mt-5">
          <NavLink 
            to="/dashboard" 
            className={({ isActive }) => `${baseLinkClass} ${isActive ? activeLinkClass : inactiveLinkClass}`}
          >
            <span className="mx-3 font-bold">Dashboard</span>
          </NavLink>
          <NavLink 
            to="/warranties" 
            className={({ isActive }) => `${baseLinkClass} ${isActive ? activeLinkClass : inactiveLinkClass}`}
          >
            <span className="mx-3 font-bold">Warranties</span>
          </NavLink>
          <NavLink 
            to="/documents" 
            className={({ isActive }) => `${baseLinkClass} ${isActive ? activeLinkClass : inactiveLinkClass}`}
          >
            <span className="mx-3 font-bold">Documents</span>
          </NavLink>
        </nav>
      </div>

      {/* Main content wrapper */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="flex items-center justify-end h-20 px-6 bg-white shadow-md z-10 flex-shrink-0">
          <div className="flex items-center">
            <span className="mr-4 font-medium text-gray-700">Welcome, {user ? user.name : 'Guest'}</span>
            <button 
              onClick={handleLogout}
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Logout
            </button>
          </div>
        </header>

        {/* Scrollable main content */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
