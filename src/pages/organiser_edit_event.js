// import directories
import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

import NavButton from '../components/nav_button';

import "../styles/common.css";

function OrganiserEditEvent() {

	{/* for navigation on the site */}
	const navigate = useNavigate();

	{/* default temporary data until database is set up */}
	const [event, setEvent] = useState({
		id: 2,
		name: 'Event Name 2',
		date: '1976-01-01',
		time: '00:12',
		location: 'CAD',
		description: 'event details 101',
		generalprice: 0,
		vipprice: 100
	});

	{/* to store event details on site when changed */}
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

		{/* pre load values in the fields */}
		setFormData({
			name: event.name,
			date: event.date,
			time: event.time,
			location: event.location,
			description: event.description,
			generalprice: event.generalprice,
			vipprice: event.vipprice
		});
	}, []);
	
	{/* handles the change in the form fields */}
	const handleChange = (e) => {
		const {name, value} = e.target;
		setFormData(prev => ({...prev, [name]: value}));
	};

	{/* what happens when submitted */}
	const handleSubmit = (e) => {
		e.preventDefault();

		{/* unchanged data = old data, so copy old into new form */}
		const updateData = {
			name: formData.name || event.name,
			date: formData.date || event.date,
			time: formData.time || event.time,
			location: formData.location || event.location,
			description: formData.description || event.description,
			generalprice: formData.generalprice !== '' ? formData.generalprice: event.generalprice,
			vipprice: formData.vipprice !== '' ? formData.vipprice: event.vipprice,
		};

		{/* validate time and date to be in the future */}
		const selectedDateTime = new Date(`${updateData.date}T${updateData.time}`);
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
		

		{/* save updates to the page */}
		setEvent(updateData);

		{/* back to organiser portal */}
		navigate("/organiser-portal");
	};

	return (
		<div>
			{/* navigation button to the home page */}
			<NavButton to="/home-page">
				Event Manager
			</NavButton>
			{/* navigation button to the organiser portal */}
			<NavButton to="/organiser-portal">
				Organiser Portal
			</NavButton>

			{/* Page purpose */}
			<h1>
				Organiser Edit Event
			</h1>
			
			<div className = "container_content">
				<div className = "center_screen">
					<form onSubmit = {handleSubmit}>
						<p>
							Event name: <input type = "text" name = "name" value = {formData.name} onChange = {handleChange} />	
						</p>
						<p>
							Date <input type = "date" name = "date" value = {formData.date} onChange = {handleChange} />	
						</p>
						<p>
							Time <input type = "time" name = "time" value = {formData.time} onChange = {handleChange} />	
						</p>
						<p>
							location: <input type = "text" name = "location" value = {formData.location} onChange = {handleChange} />	
						</p>
						<p>
							Description: <input type = "text" name = "description" value = {formData.description} onChange = {handleChange} />	
						</p>
						<p>
							General Admission Price: <input type = "number" name = "generalprice" value = {formData.generalprice} onChange = {handleChange} />	
						</p>
						<p>
							VIP Price: <input type = "number" name = "vipprice" value = {formData.vipprice} onChange = {handleChange} />	
						</p>
						<p>
							<button type = "submit" className= "button">
								Save Changes
							</button>
						</p>
					</form>
				</div>
			</div>
		</div>
	);
}

export default OrganiserEditEvent;