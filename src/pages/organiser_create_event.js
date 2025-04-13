// import directories
import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

import NavButton from '../components/nav_button';

import "../styles/common.css";

function OrganiserCreateEvent() {
	const navigate = useNavigate();

	{/* data to be entered by organiser */}
	const [formData, setFormData] = useState({
		name: '',
		date: '',
		time: '',
		location: '',
		description: '',
		generalprice: '',
		vipprice: ''
	});

	{/* to change the tab name */}
	useEffect(() => {
		document.title = "Event Manager";
	}, []);

	{/* create a constant that handles filling object with a value */}
	const handleChange = (e) => {
		const {name, value} = e.target;
		setFormData(prev => ({...prev, [name]: value}));
	};

	{/* handles submitting the event details */}
	{/* validate so it does not submit empty event details */}
	const handleSubmit = (e) => {
		e.preventDefault();

		const {name, date, time, location, description, generalprice, vipprice} = formData;
	
		{/* validation to prevent empty slots */}
		if (!formData.name || !formData.date || !formData.time || !formData.location || !formData.description || !formData.generalprice || !formData.vipprice) {
			alert("Please fill all fields");
			return;
		}

		{/* validate time, date and make sure they are not in the past */}
		const selectedDateTime = new Date(`${formData.date}T${formData.time}`);
		const now = new Date();
		if (selectedDateTime <= now) {
			alert("Date and Time need to be in the future");
			return;
		}

		{/* validate that prices are not negative */}
		if (formData.generalprice < 0 || formData.vipprice < 0) {
			alert("Ticket prices needs to be positive");
			return;
		}

		{/* after submission, now we go back to organiser portal */}
		navigate("/organiser-portal");
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