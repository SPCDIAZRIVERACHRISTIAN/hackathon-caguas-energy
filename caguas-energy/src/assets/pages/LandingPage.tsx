// src/pages/LandingPage.tsx
import React from 'react';
import { MapPin, Activity, AlertTriangle } from 'lucide-react';
import Navbar from '../layout/navbar';
import FeatureCard from '../features/FeatureCard';
import StatusSummary from '../features/StatusSummary';

interface LandingPageProps {
  onNavigate: (page: string) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  const features = [
    {
      icon: <MapPin className="w-8 h-8 text-indigo-600 mb-4" />,
      title: 'Location-Based Tracking',
      description: 'Get real-time updates for power status in your specific area'
    },
    {
      icon: <Activity className="w-8 h-8 text-indigo-600 mb-4" />,
      title: 'Live Status Updates',
      description: 'Track outage duration and estimated restoration times'
    },
    {
      icon: <AlertTriangle className="w-8 h-8 text-indigo-600 mb-4" />,
      title: 'Incident Reporting',
      description: 'Report and verify power outages in your neighborhood'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-600 to-purple-500">
      <Navbar onNavigate={onNavigate} />
      
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-6">
              Real-Time Power Outage Tracking in Puerto Rico
            </h1>
            <p className="text-xl text-white mb-8">
              Stay informed about power outages in your area and get instant updates on restoration progress
            </p>
            <div className="flex justify-center space-x-4">
              <button 
                onClick={() => onNavigate('map')}
                className="px-6 py-3 bg-white text-indigo-600 font-semibold rounded-lg hover:bg-gray-100"
              >
                View Live Map
              </button>
              <button className="px-6 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10">
                Subscribe to Alerts
              </button>
            </div>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>

          <div className="mt-16">
            <StatusSummary />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;