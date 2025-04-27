// import directories
import React, {useState, useEffect} from 'react';
import {useNavigate, useParams} from 'react-router-dom';

import NavButton from '../components/nav_button';
import Message from '../components/message';

import "../styles/common.css";

function OrganiserSendAnnouncements() {
	// for navigation on the site
	const navigate = useNavigate();

	// get the event id from the link
	const {eventid} = useParams();

	// hold event data
	const [event, setevent] = useState([]);

	// form data holder
	const [formData, setFormData] = useState({});

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

		// get event details
		const fetchevent = async () => {
			

			setmessage('');
			setmessagetype('');

			try {
				const response = await fetch(`http://localhost:5000/api/events/member/${eventid}`, {
					method: "GET",
					headers: {
						"Authorization": `Bearer ${token}`
					},
				});
				
				// check if fetched event
				if (!response.ok) {
					setmessage("Could not fetch the event!");
					setmessagetype("error");
				}

				const data = await response.json();

				// save the data
				setevent(data);
			}
			catch (error) {
				setmessage("server error!");
				setmessagetype("error");
			}
		};

		fetchevent();

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
		
		// send data to backend
		try {
			const token = localStorage.getItem('token');

			const response = await fetch(`http://localhost:5000/api/email/sendannouncement`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"Authorization": `Bearer ${token}`
				},
				body: JSON.stringify({
					eventid: eventid,
					message: formData.announcement
				})
			});

			// if could not send announcement
			// mostly likely due to not having the website deployed
			if (response.status === 404) {
				setmessage("Could not conenct to the email server, website not deployed!");
				setmessagetype("error");
			}
			else if (response.ok) {
				setmessage("Announcement sent!");
				setmessagetype("success");
			}
		}
		catch (error) {
			setmessage("Could not send an announcement!");
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
				Organiser Send Announcements
			</h1>
			<Message message = {message} type = {messagetype} />
			<div className = "container_content">
				<h2 className = "content_text">
					Event: {event.name}
				</h2>
			</div>
			<div className = "container_content">
				<form className = "content_text" onSubmit = {handleSubmit}>
					<p>
						Enter your message below: 
					</p>
					<p>
					<textarea value = {formData.announcement} name="announcement" onChange = {handleChange} rows = {5} cols = {50} />
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