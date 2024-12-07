import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Zap, Map, Activity, InfoIcon } from 'lucide-react';

const Layout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-600 to-purple-500">
      {/* Navbar */}
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link to="/" className="flex items-center">
                <Zap className="w-6 h-6 text-yellow-500" />
                <span className="ml-2 text-xl font-bold text-indigo-600">
                  PowerTrackPR
                </span>
              </Link>
            </div>

            {/* Links */}
            <div className="hidden md:flex items-center space-x-4">
              <Link
                to="/overview"
                className="flex items-center px-3 py-2 text-gray-700 hover:text-indigo-600"
              >
                <Map className="w-4 h-4 mr-2" />
                Overview
              </Link>
              <Link
                to="/transmission-data"
                className="flex items-center px-3 py-2 text-gray-700 hover:text-indigo-600"
              >
                <Activity className="w-4 h-4 mr-2" />
                Transmission Data
              </Link>
              <Link
                to="/distribution-data"
                className="flex items-center px-3 py-2 text-gray-700 hover:text-indigo-600"
              >
                <InfoIcon className="w-4 h-4 mr-2" />
                Distribution Data
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Dynamic Content */}
      <div className="py-16">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
