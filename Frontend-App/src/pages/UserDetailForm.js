import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function UserDetailForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    firstName: '',
    lastName: '',
    dob: '',
    phone: '',
    address: '',
    state: '',
    postcode: '',
    country: 'Australia',
  });

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("User details submitted!");
  };

  return (
    <div className="reg-page-bg">
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
          cursor: 'pointer'
        }}
      >
        ← Back
      </button>

      <div className="register-card">
        <h2 className="register-title">User Details</h2>
        <form className="register-form" onSubmit={handleSubmit}>
          <label style={{ fontWeight: 'bold' }}>Title</label>
          <select name="title" value={formData.title} onChange={handleChange} required>
            <option value="">-- Select --</option>
            <option value="Mr">Mr</option>
            <option value="Ms">Ms</option>
            <option value="Mrs">Mrs</option>
            <option value="Dr">Dr</option>
          </select>

          <label style={{ fontWeight: 'bold' }}>First Name</label>
          <input name="firstName" onChange={handleChange} required />

          <label style={{ fontWeight: 'bold' }}>Last Name</label>
          <input name="lastName" onChange={handleChange} required />

          <label style={{ fontWeight: 'bold' }}>Date of Birth</label>
          <input type="date" name="dob" onChange={handleChange} required />

          <label style={{ fontWeight: 'bold' }}>Phone Number</label>
          <input name="phone" onChange={handleChange} required />

          <label style={{ fontWeight: 'bold' }}>Address</label>
          <input name="address" onChange={handleChange} required />

          <label style={{ fontWeight: 'bold' }}>State</label>
          <input name="state" onChange={handleChange} required />

          <label style={{ fontWeight: 'bold' }}>Postcode</label>
          <input name="postcode" onChange={handleChange} required />

          <label style={{ fontWeight: 'bold' }}>Country</label>
          <input name="country" value="Australia" disabled />

          <button className="signup-btn" type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default UserDetailForm;
