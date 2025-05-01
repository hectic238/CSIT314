// import directories
import React, {useState, useEffect} from 'react';
import {useNavigate, useParams} from 'react-router-dom';

import NavButton from '../components/nav_button';
import Message from '../components/message';

import "../styles/common.css";

function OrganiserEditEvent() {

	// for navigation on the site
	const navigate = useNavigate();

	// get the event id from the link
	const {eventid} = useParams();

	// form data holder
	const [formData, setFormData] = useState({
		name: '',
		date: '',
		time: '',
		type: '',
		location: '',
		description: '',
		generalprice: '',
		vipprice: ''
	});

	// setting up for message content
	const [message, setmessage] = useState('');
	
	// setting up for message type, either (error or success)
	const [messagetype, setmessagetype] = useState('');

	// to create a token and prevent unauthorised access
	useEffect(() => {
		// get token from local storage
		const token = localStorage.getItem('token');
		
		// get Member role
		const role = localStorage.getItem('role');

		// redirect to login if no token or not organiser
		if (!token || (role !== 'Organiser')) {
			navigate('/organiser-login');
			return;
		}

		// get events linked to this organiser
		const fetchEvent = async () => {

			setmessage('');
			setmessagetype('');

			try {
				const response = await fetch(`http://localhost:5000/api/events/member/${eventid}`, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});
				
				// check if fetched events
				if (!response.ok) {
					setmessage("Could not fetch the event!");
					setmessagetype("error");
				}

				const data = await response.json();

				// pre load values in the fields
				setFormData({
					name: data.name,
					date: data.date,
					time: data.time,
					location: data.location,
					type: data.type,
					description: data.description,
					generalprice: data.generalprice,
					vipprice: data.vipprice
				});

			}
			catch (error) {
				setmessage("server error!");
				setmessagetype("error");
			}
		};

		fetchEvent();

	}, [eventid, navigate]);

	// to change the tab name
	useEffect(() => {
		document.title = "Event Manager";
	}, []);
	
	// handles the change in the form fields
	const handleChange = (e) => {
		const {name, value} = e.target;
		setFormData(prev => ({...prev, [name]: value}));
	};

	// what happens when submitted
	const handleSubmit = async (e) => {
		e.preventDefault();

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

			const response = await fetch(`http://localhost:5000/api/events/organiser/${eventid}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					"Authorization": `Bearer ${token}`
				},
				body: JSON.stringify(formData)
			});

			// if could not create event
			// mostly likely due to not being logged in properly
			if (!response.ok) {
				setmessage("Please, log in again!");
				setmessagetype("error");
				navigate("/organiser-login");
			}

			setmessage("Event updated!");
			setmessagetype("success");

			// after submission, now we go back to organiser portal
			setTimeout(() => navigate("/organiser-portal"), 1500);
		}
		catch (error) {
			setmessage("Could not update event!");
			setmessagetype("error");
		}
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
			<Message message = {message} type = {messagetype} />
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
							Type: <input type = "text" name = "type" value = {formData.type} onChange = {handleChange} />	
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