import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
// import Overview from './Overview'; // path to Overview component
import TransmissionData from './components/transBar'; // path to Transmission Data component
import DistributionData from './components/disBarchart'; // path to Distribution Data component
import Layout from './Layout';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Layout as the parent route */}
        <Route path="/" element={<Layout />}>
          {/* Nested routes rendered inside Layout */}
          <Route index element={<LandingPage />} />
          <Route path="transmission-data" element={<TransmissionData />} />
          <Route path="distribution-data" element={<DistributionData />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
