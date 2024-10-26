// src/components/features/FeatureCard.tsx
import React, { ReactNode } from 'react';

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <div className="bg-white/90 rounded-lg p-6 shadow-lg text-center">
      <div className="flex justify-center">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-indigo-600 mb-2">
        {title}
      </h3>
      <p className="text-gray-600">
        {description}
      </p>
    </div>
  );
};

export default FeatureCard;