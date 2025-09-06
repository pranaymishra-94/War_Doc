import React, { useContext } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';

import { AuthContext } from '../../context/AuthContext';

const DashboardLayout = () => {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  if (!authContext) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-xl font-semibold text-red-600">
          Error: AuthContext is not available.
        </p>
      </div>
    );
  }

  const { user, logout } = authContext;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const baseLinkClass = "flex items-center px-4 py-2 text-sm font-medium rounded-md";
  const inactiveLinkClass = "text-gray-600 hover:bg-gray-100 hover:text-gray-900";
  const activeLinkClass = "bg-indigo-100 text-indigo-600";

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="hidden md:flex md:flex-shrink-0">
        <div className="flex w-64 flex-col">
          <div className="flex flex-grow flex-col overflow-y-auto border-r border-gray-200 bg-white pt-5">
            <div className="flex flex-shrink-0 items-center px-4">
               <span className="text-2xl font-bold text-indigo-600">WarrantyTrack</span>
            </div>
            <div className="mt-5 flex flex-grow flex-col">
              <nav className="flex-1 space-y-1 px-2 pb-4">
                <NavLink
                  to="/dashboard"
                  end
                  className={({ isActive }) => `${baseLinkClass} ${isActive ? activeLinkClass : inactiveLinkClass}`}
                >
                  Dashboard
                </NavLink>
                <NavLink
                  to="/warranties"
                  className={({ isActive }) => `${baseLinkClass} ${isActive ? activeLinkClass : inactiveLinkClass}`}
                >
                  Warranties
                </NavLink>
                <NavLink
                  to="/documents"
                  className={({ isActive }) => `${baseLinkClass} ${isActive ? activeLinkClass : inactiveLinkClass}`}
                >
                  Documents
                </NavLink>
              </nav>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <div className="relative z-10 flex h-16 flex-shrink-0 bg-white shadow-sm">
           <div className="flex flex-1 items-center justify-end px-4 sm:px-6 lg:px-8">
             <p className="text-sm text-gray-700">
               Welcome, <span className="font-semibold">{user ? user.name : 'Guest'}</span>
             </p>
             <button
               onClick={handleLogout}
               className="ml-4 inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
             >
               Logout
             </button>
           </div>
        </div>
        
        {/* Main scrollable area */}
        <main className="flex-1 overflow-y-auto focus:outline-none">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
