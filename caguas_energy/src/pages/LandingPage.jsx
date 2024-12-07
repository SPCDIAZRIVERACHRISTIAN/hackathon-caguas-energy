// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import {
  Zap,
  Activity,
  MapPin,
  AlertTriangle,
  Map,
  InfoIcon,
  X,
  Users,
  Wifi,
  WifiOff,
  UserCog,
  Menu,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import DisBarchart from '../components/disBarchart';
import TransBarchart from '../components/transBar';

// Custom SVG GitHub Icon
const GitHubLogo = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    viewBox="0 0 24 24"
    className="w-6 h-6 mx-auto"
  >
    <path
      fillRule="evenodd"
      d="M12 .5A12 12 0 0 0 0 12.5a12.01 12.01 0 0 0 8.205 11.387c.6.112.817-.26.817-.577v-2.16c-3.338.724-4.042-1.61-4.042-1.61-.545-1.387-1.33-1.755-1.33-1.755-1.086-.744.083-.73.083-.73 1.2.085 1.832 1.252 1.832 1.252 1.068 1.83 2.804 1.3 3.487.994.108-.772.417-1.3.76-1.598-2.665-.303-5.466-1.355-5.466-6.031 0-1.333.473-2.424 1.247-3.277-.125-.303-.54-1.526.118-3.18 0 0 1.006-.322 3.3 1.24a11.491 11.491 0 0 1 3-.405c1.017.004 2.045.138 3 .405 2.292-1.562 3.297-1.24 3.297-1.24.659 1.654.244 2.877.12 3.18.775.853 1.247 1.944 1.247 3.277 0 4.687-2.805 5.724-5.477 6.021.429.369.81 1.099.81 2.215v3.281c0 .32.216.693.822.576A12.012 12.012 0 0 0 24 12.5 12 12 0 0 0 12 .5z"
    />
  </svg>
);

const LandingPage = () => {
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const teamMembers = [
    {
      name: 'Alice Johnson',
      role: 'Frontend Developer',
      github: 'https://github.com/alice',
    },
    {
      name: 'Bob Smith',
      role: 'Backend Engineer',
      github: 'https://github.com/bob',
    },
    {
      name: 'Charlie Davis',
      role: 'UI/UX Designer',
      github: 'https://github.com/charlie',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-600 to-purple-500">


      {/* Header Section */}
      <div className="py-16 text-center">
        <h1 className="text-4xl font-bold text-white mb-6">
          Power Outage Tracking in Puerto Rico
        </h1>
        <p className="text-xl text-white mb-8">
          Stay informed about power outages in your area and get instant updates
          on restoration progress.
        </p>
      </div>

      {/* Project Explanation */}
      <div className="bg-white/90 rounded-lg p-6 shadow-lg max-w-4xl mx-auto my-8">
        <h2 className="text-2xl font-semibold text-indigo-600 mb-4">About the Project</h2>
        <p className="text-gray-600">
          PowerTrackPR is a comprehensive solution for monitoring power outages
          in Puerto Rico. Our platform provides real-time updates, restoration
          timelines, and detailed reports for affected areas. The goal is to
          keep residents informed and help utility companies optimize responses.
        </p>
      </div>

      {/* Team Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-16">
        <h2 className="text-2xl font-semibold text-white text-center mb-8">
          Meet the Team
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="bg-white/90 rounded-lg p-6 shadow-lg text-center"
            >
              <h3 className="text-lg font-semibold text-indigo-600">
                {member.name}
              </h3>
              <p className="text-sm text-gray-600">{member.role}</p>
              <a
                href={member.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-4 text-gray-500 hover:text-gray-700"
              >
                <GitHubLogo />
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
