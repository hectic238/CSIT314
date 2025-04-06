// import directories
import React, {useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';

import Nav_button from '../components/nav_button';
import "../styles/common.css";

// function for the organiser manage attendees page
function OrganiserManageAttendees() {
	const navigate = useNavigate();
	const location = useLocation();

	// temporary default values
	const event = location.state || {
		name: "Event name",
		date: "01/01/1970",
		time: "12:00 am",
		location: "Event location",
		VIPPrice: 100,
		generalPrice: 10,
		id: "0000"
	};

	const [attendees, setAttendees] = useState([]);
	const [newAttendeeName, setNewAttendeeName] = useState("");
	const [newAttendeeType, setNewAttendeeType] = useState("General");

	// adding attendees
	const addAttendee = () => {
		// remove (pre and post) word white spaces from entry
		const trimmedName = newAttendeeName.trim();
		
		// do not add no name
		if (trimmedName === '') {
			return;
		}

		setAttendees([...attendees, {name: trimmedName, ticketType: newAttendeeType}]);

		// clear input
		setNewAttendeeName("");
	};

	// removing attendees
	const removeAttendee = (indexToRemove) => {
		setAttendees(attendees.filter((_, index) => index !== indexToRemove));
	};

	// total tickets sold
	const totalTicketsSold = attendees.length;

	return(
		<div className = "user-container">
			{/* navigation buttons */}
			<div className = "user-nav">
				<Nav_button to = "/login-page">
					Event Management
				</Nav_button>
				<Nav_button to = "/organiser-portal">
					Back to organiser portal
				</Nav_button>
			</div>
			<h2>
				Manage Attendees for {event.name}, total attendees {totalTicketsSold}
			</h2>
			<div className = "attendee-section">
				<h3>
					Add attendee
				</h3>
				<div className = "attendee-form">
					<input type = "text" placeholder = "Attendee name" value = {newAttendeeName} onChange = {(e) => setNewAttendeeName(e.target.value)} />
					<select value = {newAttendeeType} onChange = {(e) => setNewAttendeeType(e.target.value)}>
						<option value = "General">
							General
						</option>
						<option value = "VIP">
							VIP
						</option>
					</select>
					<button onClick = {addAttendee}>
						Add
					</button>
				</div>
				<h3>
					Attendee List
				</h3>
				<ul className = "attendee-list">
					{attendees.map((attendee, index) => (
						<li key = {index}>
							{attendee.name} ({attendee.ticketType})
							<button onClick = {() => removeAttendee(index)}>
								Remove
							</button>
						</li>
					))}
				</ul>
			</div>
		</div>
	)
}

export default OrganiserManageAttendees;