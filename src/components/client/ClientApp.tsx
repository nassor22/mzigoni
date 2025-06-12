import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ClientDashboard from './ClientDashboard';
import BookingFlow from './BookingFlow';
import TrackingScreen from './TrackingScreen';
import PaymentScreen from './PaymentScreen';
import RatingScreen from './RatingScreen';

const ClientApp = () => {
  return (
    <Routes>
      <Route path="/" element={<ClientDashboard />} />
      <Route path="/book" element={<BookingFlow />} />
      <Route path="/track/:tripId" element={<TrackingScreen />} />
      <Route path="/payment/:tripId" element={<PaymentScreen />} />
      <Route path="/rate/:tripId" element={<RatingScreen />} />
    </Routes>
  );
};

export default ClientApp;