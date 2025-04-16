import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/common.css';

function RegisterPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    termsAccepted: false
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (!formData.termsAccepted) {
      setError('You must accept the terms and conditions.');
      return;
    }

    if (!formData.email.includes('@')) {
      setError('Please enter a valid email.');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setSuccess(true);
    setTimeout(() => {
      navigate('/select-role');
    }, 1000);
  };

  return (
    <div className="reg-page-bg">
      <div className="top-login-bar">
        <span className="login-text-label">Already Registered?</span>
        <a href="/login" className="top-login-button">Login</a>
      </div>

      <div className="register-card">
        <h2 className="register-title">Registration</h2>
        <form onSubmit={handleSubmit} className="register-form">
          <div className="form-field">
            <label htmlFor="fullName">Full Name</label>
            <input
              type="text"
              name="fullName"
              id="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter full name"
              required
            />
          </div>

          <div className="form-field">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email"
              required
            />
          </div>

          <div className="form-field">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create password"
              required
            />
          </div>

          <div className="form-field">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm password"
              required
            />
          </div>

          <div className="form-field checkbox-field">
            <label>
              <input
                type="checkbox"
                name="termsAccepted"
                checked={formData.termsAccepted}
                onChange={handleChange}
              />
              <span>I accept all terms & conditions</span>
            </label>
          </div>

          <button type="submit" className="signup-btn">Sign Up</button>

          {error && <div className="form-error">{error}</div>}
          {success && <div className="form-success">✅ Registered!</div>}

          <div className="divider"><span>Or sign in with:</span></div>

          <button type="button" className="facebook-btn">
            <img src="/facebook-icon.png" alt="Facebook" className="icon" />
            Login with Facebook
          </button>

          <button type="button" className="google-btn">
            <img src="/google-icon.png" alt="Google" className="icon" />
            Login with Google
          </button>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;
