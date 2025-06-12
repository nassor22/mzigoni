import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RoleSelection from './components/RoleSelection';
import AuthLayout from './components/auth/AuthLayout';
import ClientApp from './components/client/ClientApp';
import DriverApp from './components/driver/DriverApp';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<RoleSelection />} />
          <Route path="/auth/:role" element={<AuthLayout />} />
          <Route path="/client/*" element={<ClientApp />} />
          <Route path="/driver/*" element={<DriverApp />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;