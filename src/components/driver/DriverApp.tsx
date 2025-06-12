import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DriverDashboard from './DriverDashboard';
import DriverRegistration from './DriverRegistration';
import ActiveTrip from './ActiveTrip';
import TripHistory from './TripHistory';

const DriverApp = () => {
  return (
    <Routes>
      <Route path="/" element={<DriverDashboard />} />
      <Route path="/register" element={<DriverRegistration />} />
      <Route path="/trip/:tripId" element={<ActiveTrip />} />
      <Route path="/history" element={<TripHistory />} />
    </Routes>
  );
};

export default DriverApp;