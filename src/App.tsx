import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import RoleSelection from './components/common/RoleSelection';
import Login from './components/auth/Login';
import ClientApp from './components/client/ClientApp';
import DriverRegistration from './components/driver/DriverRegistration';
import DriverDashboard from './components/driver/DriverDashboard';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Initial Role Selection */}
        <Route path="/" element={<RoleSelection />} />

        {/* Authentication */}
        <Route path="/login" element={<Login />} />

        {/* Client Routes */}
        <Route path="/client/*" element={<ClientApp />} />

        {/* Driver Routes */}
        <Route path="/driver/register" element={<DriverRegistration />} />
        <Route path="/driver/dashboard" element={<DriverDashboard />} />
        <Route path="/driver/*" element={<Navigate to="/driver/register" replace />} />

        {/* Fallback Route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;