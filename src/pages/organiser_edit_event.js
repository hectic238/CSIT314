// import directories
import React, {useState} from 'react';
import {useLocation, useNavigate, Link} from 'react-router-dom';

import Nav_button from '../components/nav_button';

import "../styles/common.css";

// create a function for organiser to edit events
function OrganiserEditEvent() {

	// to allow the organiser to go back to the previous activity
	// which is supposed to be "organiser portal"
	const navigate = useNavigate();
	const location = useLocation();

	// get event data from previous page
	// got default values, in case not working
	const event = location.state || {
		name: "Event name",
		date: "01/01/1970",
		time: "12:00 am",
		location: "Event location",
		VIPPrice: 100,
		generalPrice: 10,
		id: "0000"
	};

	// track input value
	const [newName, setNewName] = useState('');
	const [newDate, setNewDate] = useState('');
	const [newTime, setNewTime] = useState('');
	const [newLocation, setNewLocation] = useState('');
	const [newVIP, setNewVIP] = useState('');
	const [newGeneral, setNewGeneral] = useState('');

	// function to save the data
	const save_event_edit = () => {
		const updatedFields = {};

		// if anything is typed into the field, save it.
		if (newName) updatedFields.name = newName;
		if (newDate) updatedFields.date = newDate;
		if (newTime) updatedFields.time = newTime;
		if (newLocation) updatedFields.location = newLocation;
		if (newVIP) updatedFields.VIPPrice = Number(newVIP);
		if (newGeneral) updatedFields.generalPrice = Number(newGeneral);

		// output that it is working
		console.log("fields to update: ", updatedFields);

		// go back to organiser portal
		navigate("/organiser-portal");

	};

	return (
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
				Event Editing
			</h2>
			<div className = "event-details">
				<table>
					<thead>
						<tr>
							<th>
							
							</th>
							<th>
								Current event details:
							</th>
							<th>
								New event details:
							</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>
								Name:
							</td>
							<td>
								{event.name}
							</td>
							<td>
								<input type = "text" value={newName} onChange={e => setNewName(e.target.value)} />
							</td>
						</tr>
						<tr>
							<td>
								Date:
							</td>
							<td>
								{event.date}
							</td>
							<td>
								<input type = "date" value={newDate} onChange={e => setNewDate(e.target.value)}/>
							</td>
						</tr>
						<tr>
							<td>
								Time:
							</td>
							<td>
								{event.time}
							</td>
							<td>
								<input type = "time" value={newTime} onChange={e => setNewTime(e.target.value)} />
							</td>
						</tr>
						<tr>
							<td>
								Location:
							</td>
							<td>
								{event.location}
							</td>
							<td>
								<input type = "text" value={newLocation} onChange={e => setNewLocation(e.target.value)}/>
							</td>
						</tr>
						<tr>
							<td>
								General admission ticket:
							</td>
							<td>
								{event.generalPrice}
							</td>
							<td>
								<input type = "number" value={newGeneral} onChange={e => setNewGeneral(e.target.value)}/>
							</td>
						</tr>
						<tr>
							<td>
								VIP ticket:
							</td>
							<td>
								{event.VIPPrice}
							</td>
							<td>
								<input type = "number" value={newVIP} onChange={e => setNewVIP(e.target.value)}/>
							</td>
						</tr>
					</tbody>
				</table>
				<button onClick = {save_event_edit} className = "button">
					Save changes
				</button>
			</div>
		</div>
	);
}

export default OrganiserEditEvent;