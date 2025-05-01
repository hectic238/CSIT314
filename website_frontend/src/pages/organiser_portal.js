// import directories
import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

import NavButton from '../components/nav_button';
import Message from '../components/message';

import "../styles/common.css";

const OrganiserPortal = () => {
	// setting up for navigation
	const navigate = useNavigate();

	// to hold organiser events
	const [organiserevents, setOrganiserevents] = useState([]);

	// loading state
	const [loading, setLoading] = useState(true);

	// setting up for message content
	const [message, setmessage] = useState('');
	
	// setting up for message type, either (error or success)
	const [messagetype, setmessagetype] = useState('');

	// to change the tab name
	useEffect(() => {
		document.title = "Event Manager";
	}, []);

	// to create a token and prevent unauthorised access
	useEffect(() => {
		// get token from local storage
		const token = localStorage.getItem('token');
		
		// get Member role
		const role = localStorage.getItem('role');

		// get Member id
		const organiser = localStorage.getItem('organiser');

		// redirect to login if no token or not organiser
		if (!token || (role !== 'Organiser')) {
			navigate('/organiser-login');
			return;
		}

		// get events linked to this organiser
		const fetchEvents = async () => {

			setmessage('');
			setmessagetype('');

			try {
				const response = await fetch(`http://localhost:5000/api/events/organiser?organiserid=${organiser}`, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});
				
				// check if fetched events
				if (!response.ok) {
					setmessage("Could not fetch events!");
					setmessagetype("error");
				}

				const data = await response.json();

				// hold the data fetched
				setOrganiserevents(data);
			}
			catch (error) {
				setmessage("server error!");
				setmessagetype("error");
			}
			finally {
				setLoading(false);
			}
		};

		// run it to get the events for organise
		fetchEvents();

	}, [navigate]);

	// delete button functionality
	const deleteevent = async (eventid) => {
		// get token from local storage
		const token = localStorage.getItem('token');

		try {
			const response = await fetch(`http://localhost:5000/api/events/organiser/${eventid}`, {
				method: "DELETE",
				headers: {
					"Authorization": `Bearer ${token}`
				},
			});

			// if could not delete event
			// mostly likely due to not being logged in properly
			if (!response.ok) {
				setmessage("Please, log in again!");
				setmessagetype("error");
				navigate("/organiser-login");
			}

			setmessage("Event Deleted!");
			setmessagetype("success");
			
			// reload page
			window.location.reload();
		}
		catch (error) {
			setmessage("Could not delete, server error!");
			setmessagetype("error");
		}
	}

	return (
		<div>
			{/* navigation button to the home page */}
			<NavButton to="/home-page">
				Event Manager
			</NavButton>
			{/* navigation button to manage organiser account */}
			<NavButton to="/organiser-account">
				Manage Account
			</NavButton>

			{/* Page purpose */}
			<h1>
				Organiser Portal
			</h1>
			<Message message = {message} type = {messagetype} />

			{loading && <p>Loading events</p>}

			<div className = "container_content">
				<div>
					<table className = "table">
						<thead>
							<tr>
								<th>
									Name
								</th>
								<th>
									Date
								</th>
								<th>
									Time
								</th>
								<th>
									Location
								</th>
								<th className = "noborder">
									
								</th>
								<th className = "noborder">
									
								</th>
								<th className = "noborder">
									Actions
								</th>
								<th className = "noborder">
									
								</th>
							</tr>
						</thead>
						<tbody>
							{organiserevents.map(event => (
								<tr key = {event._id}>
									<td>
										{event.name}
									</td>
									<td>
										{event.date}
									</td>
									<td>
										{event.time}
									</td>
									<td>
										{event.location}
									</td>
									<td className = "noborder">
										<NavButton to={`/organiser-edit-event/${event._id}`}>
											Edit
										</NavButton>
									</td>
									<td className = "noborder">
										<button className = "button" onClick={() => deleteevent(event._id)}>
											Delete
										</button>
									</td>
									<td className = "noborder">
										<NavButton to={`/organiser-manage-attendees/${event._id}`}>
											Manage Attendees
										</NavButton>
									</td>
									<td className = "noborder">
										<NavButton to={`/organiser-send-announcements/${event._id}`}>
											Send Reminder
										</NavButton>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
				<div className = "center_screen">
					{/* create new event */}
					<NavButton to={'/organiser-create-event'}>
						Create New Event
					</NavButton>
				</div>
			</div>
		</div>
	);
};

export default OrganiserPortal;