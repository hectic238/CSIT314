// import directories
import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

import NavButton from '../components/nav_button';

import "../styles/common.css";

function OrganiserSendAnnouncements() {
	{/* for navigation on the site */}
	const navigate = useNavigate();

	{/* get the event name */}
	{/* temporary value until backend is running */}
	const event = {name: "Event name"};

	{/* temporary attendee list */}
	const [attendees, setAttendees] = useState([{
		name: "MOE",
		email: "moeyeahcuz@gmail.com",
		tickettype: "General"
	}]);

	{/* prepare to send a message */}
	const [message, setMessage] = useState('');

	{/* to change the tab name */}
	useEffect(() => {
		document.title = "Event Manager";
	}, []);

	{/* send to all attendees of that specific event */}
	const handleSend = (e) => {
		e.preventDefault();
		
		{/* make sure message is not empty */}
		if (message.trim() == "") {
			alert ("please write a message");
			return;
		}

		{/* temporary stimulates sending */}
		const payload = {
			event: event.name,
			attendees: attendees.map(a => a.email),
			message: message
		};

		{/* clear message */}
		setMessage('');

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
				Organiser Send Announcements
			</h1>

			<div className = "container_content">
				<h2 className = "content_text">
					Event: {event.name}
				</h2>
			</div>
			<div className = "container_content">
				<form className = "content_text" onSubmit = {handleSend}>
					<p>
						Enter your message below: 
					</p>
					<p>
					<textarea value = {message} onChange = {(e) => setMessage(e.target.value)} rows = {5} cols = {50} />
					</p>
					<button className = "button" type = "submit">
						Send Announcement
					</button>
				</form>
			</div>
		</div>
	)
}

export default OrganiserSendAnnouncements;