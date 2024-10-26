// src/components/layout/Navbar.tsx
import React from 'react';
import { Zap, Activity, Map, AlertTriangle } from 'lucide-react';

interface NavbarProps {
  onNavigate: (page: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate }) => {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <div className="flex items-center cursor-pointer" onClick={() => onNavigate('home')}>
              <Zap className="w-6 h-6 text-yellow-500" />
              <span className="ml-2 text-xl font-bold text-indigo-600">PowerTrackPR</span>
            </div>
          </div>
          <div className="flex space-x-4">
            <button 
              onClick={() => onNavigate('map')}
              className="flex items-center px-3 py-2 text-gray-700 hover:text-indigo-600"
            >
              <Map className="w-4 h-4 mr-2" />
              Map View
            </button>
            <button className="flex items-center px-3 py-2 text-gray-700 hover:text-indigo-600">
              <Activity className="w-4 h-4 mr-2" />
              Live Status
            </button>
            <button 
              onClick={() => onNavigate('report')}
              className="flex items-center px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700"
            >
              <AlertTriangle className="w-4 h-4 mr-2" />
              Report Outage
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;