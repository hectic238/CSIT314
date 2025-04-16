import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegisterPage from './pages/RegisterPage';
import RoleSelectionPage from './pages/RoleSelectionPage';
import UserDetailForm from './pages/UserDetailForm';
import OrganiserDetailForm from './pages/OrganiserDetailForm';
import './styles/common.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<h1>Welcome to CSIT314 Event Portal</h1>} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/select-role" element={<RoleSelectionPage />} />
        <Route path="/user-details" element={<UserDetailForm />} />
        <Route path="/organiser-details" element={<OrganiserDetailForm />} />
      </Routes>
    </Router>
  );
}

export default App;
