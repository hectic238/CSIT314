import React from "react";
import Nav_button from "../Components/nav_button";
import "../Styles/common.css";

const Login = () => {
    return (
        <div className="user-container">
            {/* navigation buttons */}
            <div className="user-nav">
                <Nav_button to="/login-page">
                    Event Management
                </Nav_button>
                <Nav_button to="/organiser-signin">
                    Go to Organiser Sign In
                </Nav_button>
            </div>
           
            <div>
                <p>
                    <span className="welcome-highlight">
                        Welcome to "Event Manager", the ultimate event management system.
                    </span>
                </p>
            </div>

            {/* Login Box */}
            <div className="user-event-details">
                <h2>User Sign in</h2>

                <div>
                    <label>
                        <span style={{ backgroundColor: "#FFB24F", padding: "10px" }}>Username</span>
                        <input type="text" placeholder="Enter your username" />
                    </label>
                </div>

                <div>
                    <label>
                        <span style={{ backgroundColor: "#FFB24F", padding: "10px" }}>Password</span>
                        <input type="password" placeholder="Enter your password" />
                    </label>
                </div>

                {/* Sign in and Sign up buttons */}
                <div>
                    <Nav_button to="/home">Sign In</Nav_button>
                    <Nav_button to="/signup">Sign Up</Nav_button>
                </div>
            </div>
        </div>
    );
};

export default Login;
