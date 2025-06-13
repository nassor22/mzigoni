import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import RoleSelection from './components/common/RoleSelection';
import ClientAuth from './components/auth/ClientAuth';
import DriverAuth from './components/auth/DriverAuth';
import ClientDashboard from './components/client/ClientDashboard';
import DriverDashboard from './components/driver/DriverDashboard';
import BookingFlow from './components/client/BookingFlow';
import TrackingScreen from './components/client/TrackingScreen';
import PaymentScreen from './components/client/PaymentScreen';
import RatingScreen from './components/client/RatingScreen';
import DriverRegistration from './components/driver/DriverRegistration';
import ActiveTrip from './components/driver/ActiveTrip';
import TripHistory from './components/driver/TripHistory';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Home - Role Selection */}
        <Route path="/" element={<RoleSelection />} />

        {/* Client Routes */}
        <Route path="/client/auth" element={<ClientAuth />} />
        <Route path="/client/dashboard" element={<ClientDashboard />} />
        <Route path="/client/book" element={<BookingFlow />} />
        <Route path="/client/track/:tripId" element={<TrackingScreen />} />
        <Route path="/client/payment/:tripId" element={<PaymentScreen />} />
        <Route path="/client/rate/:tripId" element={<RatingScreen />} />
        <Route path="/client/*" element={<Navigate to="/client/auth" replace />} />

        {/* Driver Routes */}
        <Route path="/driver/auth" element={<DriverAuth />} />
        <Route path="/driver/dashboard" element={<DriverDashboard />} />
        <Route path="/driver/register" element={<DriverRegistration />} />
        <Route path="/driver/trip/:tripId" element={<ActiveTrip />} />
        <Route path="/driver/history" element={<TripHistory />} />
        <Route path="/driver/*" element={<Navigate to="/driver/auth" replace />} />

        {/* Fallback Route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;