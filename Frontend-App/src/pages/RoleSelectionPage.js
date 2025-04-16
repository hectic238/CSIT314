import React from 'react';
import { useNavigate } from 'react-router-dom';

function RoleSelectionPage() {
  const navigate = useNavigate();

  return (
    <div className="reg-page-bg">
      <div className="register-card">
        <h2 className="register-title">What is your purpose for joining?</h2>
        <button className="signup-btn" onClick={() => navigate('/user-details')}>
          I want to attend events
        </button>
        <button className="signup-btn" onClick={() => navigate('/organiser-details')}>
          I want to host events
        </button>
      </div>
    </div>
  );
}

export default RoleSelectionPage;
