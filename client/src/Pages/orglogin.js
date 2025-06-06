// src/Pages/orglogin.js
import React from 'react';
import Nav_button from '../Components/nav_button';
import '../Styles/common.css';

const OrgLogin = () => {
    return (
        <div className="user-container">
            {/* Navigation */}
            <div className="user-nav">
                <Nav_button to="/">
                    Back to User Sign In
                </Nav_button>
            </div>

            {/* Welcome Text */}
            <div>
                <p>
                    <span className="welcome-highlight">
                        Organiser Login Portal
                    </span>
                </p>
            </div>

            {/* Login Form */}
            <div className="user-event-details">
                <h2>Organiser Sign in</h2>

                <div>
                    <label>
                        <span style={{ backgroundColor: "#FFB24F", padding: "10px" }}>Username</span>
                        <input type="text" placeholder="Enter organiser username" />
                    </label>
                </div>

                <div>
                    <label>
                        <span style={{ backgroundColor: "#FFB24F", padding: "10px" }}>Password</span>
                        <input type="password" placeholder="Enter organiser password" />
                    </label>
                </div>

                {/* Buttons */}
                <div>
                    <Nav_button to="/organiser-home">Sign In</Nav_button>
                    <Nav_button to="/organiser-home">Sign Up</Nav_button>
                </div>
            </div>
        </div>
    );
};

export default OrgLogin;
