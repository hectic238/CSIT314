// import directories
import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

import NavButton from '../components/nav_button';
import Message from '../components/message';

import "../styles/common.css";

function OrganiserCreateEvent() {
	const navigate = useNavigate();

	// data to be entered by organiser
	const [formData, setFormData] = useState({});

	// setting up for message content
	const [message, setmessage] = useState('');
	
	// setting up for message type, either (error or success)
	const [messagetype, setmessagetype] = useState('');

	// to change the tab name
	useEffect(() => {
		document.title = "Event Manager";
	}, []);

	// create a constant that handles filling object with a value
	const handleChange = (e) => {
		const {name, value} = e.target;
		setFormData(prev => ({...prev, [name]: value}));
	};

	// handles submitting the event details
	// validate so it does not submit empty event details
	const handleSubmit = async (e) => {
		e.preventDefault();

		setmessage('');
		setmessagetype('');
	
		// validation to prevent empty slots
		if (!formData.name || !formData.date || !formData.time || !formData.location || !formData.type || !formData.description || !formData.generalprice || !formData.vipprice) {
			setmessage("Please, fill all the fields!");
			setmessagetype("error");
			return;
		}

		// validate time, date and make sure they are not in the past
		const selectedDateTime = new Date(`${formData.date}T${formData.time}`);
		const now = new Date();
		if (selectedDateTime <= now) {
			setmessage("Date and Time, needs to be in the future!");
			setmessagetype("error");
			return;
		}

		// validate that prices are not negative
		if (formData.generalprice < 0 || formData.vipprice < 0) {
			setmessage("Ticket price needs to be positive!");
			setmessagetype("error");
			return;
		}

		// send data to backend
		try {
			const token = localStorage.getItem('token');
		
			const organiserid = localStorage.getItem('organiser');

			const response = await fetch("http://localhost:5000/api/events/organiser", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"Authorization": `Bearer ${token}`
				},
				body: JSON.stringify({
					name: formData.name,
					date: formData.date,
					time: formData.time,
					location: formData.location,
					type: formData.type,
					description: formData.description,
					generalprice: formData.generalprice,
					vipprice: formData.vipprice,
					organiser: organiserid
				})
			});

			// if could not create event
			// mostly likely due to not being logged in properly
			if (!response.ok) {
				setmessage("Please, log in again!");
				setmessagetype("error");
				navigate("/organiser-login");
			}

			setmessage("Event created!");
			setmessagetype("success");

			// after submission, now we go back to organiser portal
			navigate("/organiser-portal");
		}
		catch (error) {
			setmessage("Could not create event!");
			setmessagetype("error");
		}
	};
	
	return(
		<div>
			{/* navigation button to the home page */}
			<NavButton to="/home-page">
				Event Manager
			</NavButton>
			{/* navigation button to go back to organiser portal */}
			<NavButton to="/organiser-portal">
				Organiser Portal
			</NavButton>

			{/* Page purpose */}
			<h1>
				Organiser Create Event
			</h1>
			<Message message = {message} type = {messagetype} />
			<div className = "container_content">
				<div className = "center_screen">
					<form onSubmit = {handleSubmit}>
						<p>
							Event name: <input type = "text" name = "name" value = {formData.name} onChange = {handleChange} required />	
						</p>
						<p>
							Date: <input type = "date" name = "date" value = {formData.date} onChange = {handleChange} required />	
						</p>
						<p>
							Time: <input type = "time" name = "time" value = {formData.time} onChange = {handleChange} required />	
						</p>
						<p>
							location: <input type = "text" name = "location" value = {formData.location} onChange = {handleChange} required />	
						</p>
						<p>
							Type: <input type = "text" name = "type" value = {formData.type} onChange = {handleChange} required />	
						</p>
						<p>
							Description: <input type = "text" name = "description" value = {formData.description} onChange = {handleChange} required />	
						</p>
						<p>
							General Admission Price: <input type = "number" name = "generalprice" value = {formData.generalprice} onChange = {handleChange} required />	
						</p>
						<p>
							VIP Price: <input type = "number" name = "vipprice" value = {formData.vipprice} onChange = {handleChange} required />	
						</p>
						<p>
							<button type = "submit" className= "button">
								Create
							</button>
						</p>
					</form>
				</div>
			</div>
		</div>
	);
};

export default OrganiserCreateEvent;