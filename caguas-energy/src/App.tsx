// src/App.tsx
import { useState } from 'react';
import LandingPage from './assets/pages/LandingPage';
import MapView from './assets/pages/MapView';
import ReportOutage from './assets/pages/ReportOutage';

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'map':
        return <MapView />;
      case 'report':
        return <ReportOutage />;
      default:
        return <LandingPage onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen">
      {renderPage()}
    </div>
  );
};

export default App;