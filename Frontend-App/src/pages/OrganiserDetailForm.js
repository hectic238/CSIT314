// src/pages/OrganiserDetailForm.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/common.css';

function OrganiserDetailForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    organisation: '',
    website: '',
    role: '',
    contactNumber: '',
    address1: '',
    address2: '',
    suburb: '',
    state: '',
    postcode: '',
    country: 'Australia',
    eventTypes: []
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      const updated = checked
        ? [...formData.eventTypes, value]
        : formData.eventTypes.filter((item) => item !== value);
      setFormData({ ...formData, eventTypes: updated });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Organiser Details Submitted:', formData);
    // Handle form submission logic
  };

  return (
    <div className="reg-page-bg">
      {/* Back Button */}
      <button
        onClick={() => navigate('/select-role')}
        style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
          padding: '15px 25px',
          backgroundColor: '#99FFFF',
          border: 'none',
          fontWeight: 'bold',
          borderRadius: '4px',
          cursor: 'pointer',
          zIndex: 999
        }}
      >
        ← Back
      </button>

      <div className="register-card">
        <h2 className="register-title">Organiser Details</h2>
        <form onSubmit={handleSubmit} className="register-form">
          <div className="form-field">
            <label>Full Name</label>
            <input name="fullName" value={formData.fullName} onChange={handleChange} required />
          </div>

          <div className="form-field">
            <label>Organisation Name</label>
            <input name="organisation" value={formData.organisation} onChange={handleChange} required />
          </div>

          <div className="form-field">
            <label>Organisation Website</label>
            <input name="website" value={formData.website} onChange={handleChange} placeholder="https://example.com" />
          </div>

          <div className="form-field">
            <label>Your Role/Position</label>
            <input name="role" value={formData.role} onChange={handleChange} />
          </div>

          <div className="form-field">
            <label>Contact Number</label>
            <input name="contactNumber" value={formData.contactNumber} onChange={handleChange} />
          </div>

          <div className="form-field">
            <label>Address Line 1</label>
            <input name="address1" value={formData.address1} onChange={handleChange} />
          </div>

          <div className="form-field">
            <label>Address Line 2</label>
            <input name="address2" value={formData.address2} onChange={handleChange} />
          </div>

          <div className="form-field">
            <label>Suburb</label>
            <input name="suburb" value={formData.suburb} onChange={handleChange} />
          </div>

          <div className="form-field">
            <label>State</label>
            <input name="state" value={formData.state} onChange={handleChange} />
          </div>

          <div className="form-field">
            <label>Postcode</label>
            <input name="postcode" value={formData.postcode} onChange={handleChange} />
          </div>

          <div className="form-field">
            <label>Country</label>
            <select name="country" value={formData.country} onChange={handleChange}>
              <option value="Australia">Australia</option>
              <option value="New Zealand">New Zealand</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="form-field">
            <label>Event Categories You Organise:</label>
            <label><input type="checkbox" name="eventTypes" value="Conference" onChange={handleChange} /> Conference</label>
            <label><input type="checkbox" name="eventTypes" value="Concert" onChange={handleChange} /> Concert</label>
            <label><input type="checkbox" name="eventTypes" value="Workshop" onChange={handleChange} /> Workshop</label>
            <label><input type="checkbox" name="eventTypes" value="Exhibition" onChange={handleChange} /> Exhibition</label>
            <label><input type="checkbox" name="eventTypes" value="Meetup" onChange={handleChange} /> Meetup</label>
          </div>

          <button type="submit" className="signup-btn">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default OrganiserDetailForm;
