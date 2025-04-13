// import directories
import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

import NavButton from '../components/nav_button';

import "../styles/common.css";

function OrganiserManageAttendees() {

	{/* for navigation on the site */}
	const navigate = useNavigate();

	{/* to change the tab name */}
	useEffect(() => {
		document.title = "Event Manager";
	}, []);

	{/* temporary data for frontend development */}
	const event = {
		name: "Event Name",
	};

	{/* temporary data for frontend development */}
	const [attendees, setAttendees] = useState([{
		name: "MOE",
		email: "moeyeahcuz@gmail.com",
		tickettype: "General"
	}]);

	{/* new attendee form */}
	const [newAttendee, setNewAttendee] = useState({
		name: '',
		email: '',
		tickettype: 'General',
	});

	{/* what happens when changes occur in form */}
	const handleChange = (e) => {
		const {name, value} = e.target;
		setNewAttendee(prev => ({...prev, [name]: value}));
	};

	{/* adding new attendee */}
	const handleAdd = (e) => {
		e.preventDefault();

		{/* making sure to enter name and email, ticket type will be defaulted as general */}
		if (!newAttendee.name || !newAttendee.email) {
			alert("Plase insert a name and an email");
			return;
		}

		{/* validate email entry */}
		{/* input type = "email" just does a visual message, does not validate :( */}
		{/* string + @ + string + . + string */}
		const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

		{/* email validity check */}
		if (!emailRegex.test(newAttendee.email)) {
			alert("Please enter a valid email");
			return;
		}

		{/* check if user with same email already registered */}
		if (attendees.some(a => a.email == newAttendee.email)) {
			alert("user already registered");
			return;
		}

		setAttendees(prev => [...prev, newAttendee]);

		{/* reset form */}
		setNewAttendee({
			name: '',
			email: '',
			tickettype: 'General'
		});
	};

	{/* handles removing attendee, for now it is by email */}
	const handleRemove = (email) => {
		setAttendees(prev => prev.filter(a => a.email !== email));
	};

	return(
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
				Organiser Manage Attendees
			</h1>

			<div className = "container_content">
				<h2 className = "content_text">
					Event: {event.name}
				</h2>
			</div>
			
			<div className = "container_content">
				<form className = "content_text" onSubmit = {handleAdd}>
					<p>
						Add Attendee
					</p>
					<p>
						Name: <input type = "text" name = "name" value = {newAttendee.name} onChange = {handleChange} />
					</p>
					<p>
						Email: <input type = "text" name = "email" value = {newAttendee.email} onChange = {handleChange} />
					</p>
					<p>
						Ticket Type:
						<select name = "tickettype" value = {newAttendee.tickettype} onChange = {handleChange}>
							<option value = "General">
								General
							</option>
							<option value = "VIP">
								VIP
							</option>
						</select>
					</p>
					<p>
						<button type = "submit" className = "button">
							Add
						</button>
					</p>
				</form> 
			</div>
			<div className = "container_content">
				<div className = "content_text">
					<p>
						Registered Attendees
					</p>
					<table className = "table">
						<thead>
							<tr>
								<th>
									Name
								</th>
								<th>
									Email
								</th>
								<th>
									Ticket type
								</th>
								<th>
									Action
								</th>
							</tr>
						</thead>
						<tbody>
							{attendees.map((attendee) => (
								<tr key = {attendee.email}>
									<td>
										{attendee.name}
									</td>
									<td>
										{attendee.email}
									</td>
									<td>
										{attendee.tickettype}
									</td>
									<td>
										<button className = "button" onClick = {() => handleRemove(attendee.email)}>
											Remove
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	)
}

export default OrganiserManageAttendees;