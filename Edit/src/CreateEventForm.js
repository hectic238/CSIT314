import React, { useState } from 'react';

function CreateEventForm() {
  const [eventData, setEventData] = useState({
    title: '',
    date: '',
    time: '',
    location: '',
    generalPrice: '',
    vipPrice: '',
    description: '',
  });

  const handleChange = (e) => {
    setEventData({
      ...eventData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Event Created:', eventData);
    alert('Event created! Check the console.');
    // Reset form
    setEventData({
      title: '',
      date: '',
      time: '',
      location: '',
      generalPrice: '',
      vipPrice: '',
      description: '',
    });
  };

  return (
    <div style={styles.container}>
      <div style={styles.topButtons}>
        <button style={styles.navButton}>Event Management</button>
        <button style={styles.navButton}>Back to organiser portal</button>
      </div>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.heading}>Create an Event</h2>

        <input
          type="text"
          name="title"
          placeholder="Event Title"
          value={eventData.title}
          onChange={handleChange}
          style={styles.input}
          required
        />

        <input
          type="date"
          name="date"
          value={eventData.date}
          onChange={handleChange}
          style={styles.input}
          required
        />

        <input
          type="time"
          name="time"
          value={eventData.time}
          onChange={handleChange}
          style={styles.input}
          required
        />

        <input
          type="text"
          name="location"
          placeholder="Location"
          value={eventData.location}
          onChange={handleChange}
          style={styles.input}
          required
        />

        <input
          type="number"
          name="generalPrice"
          placeholder="General Admission Ticket Price"
          value={eventData.generalPrice}
          onChange={handleChange}
          style={styles.input}
          required
        />

        <input
          type="number"
          name="vipPrice"
          placeholder="VIP Ticket Price"
          value={eventData.vipPrice}
          onChange={handleChange}
          style={styles.input}
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          value={eventData.description}
          onChange={handleChange}
          style={{ ...styles.input, height: '100px' }}
          required
        />

        <button type="submit" style={styles.button}>
          Create Event
        </button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: '#6b5b53',
    minHeight: '100vh',
    padding: '20px',
    color: '#000',
  },
  topButtons: {
    display: 'flex',
    gap: '10px',
    marginBottom: '20px',
  },
  navButton: {
    backgroundColor: '#aef6f8',
    border: 'none',
    padding: '10px 15px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  form: {
    backgroundColor: '#f4a632',
    borderRadius: '12px',
    padding: '20px',
    maxWidth: '500px',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  heading: {
    textAlign: 'center',
    marginBottom: '10px',
  },
  input: {
    padding: '10px',
    fontSize: '16px',
    borderRadius: '6px',
    border: '1px solid #ccc',
  },
  button: {
    padding: '10px 15px',
    fontSize: '16px',
    borderRadius: '4px',
    border: 'none',
    backgroundColor: '#99FFFF',
    color: '#000',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
};

export default CreateEventForm;
