// import directories
import React, {useState} from 'react';
import {useLocation, useNavigate, Link} from 'react-router-dom';

import Nav_button from '../components/nav_button';
import TicketOptions from '../components/ticket_options';

import "../styles/common.css";

// create a function for user event registration page
function UserEventRegistration() {

	// to allow the user to go back to the previous activity
	// which is supposed to be "event searching and filtering"
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


	return (
		<div className = "user-container">
			{/* navigation buttons */}
			<div className = "user-nav">
				<Nav_button to = "/login-page">
					Event Management
				</Nav_button>
				<Nav_button to = "/user-portal">
					Back to event search
				</Nav_button>
			</div>
			<h2>
				Event Registration
			</h2>
			<div className = "user-event-details">
				<h1>
					{event.name}
				</h1>
				<p>
					<strong>
						Date:
					</strong>
					{event.date}
				</p>
				<p>
					<strong>
						Time:
					</strong>
					{event.time}
				</p>
				<p>
					<strong>
						Location:
					</strong>
					{event.location}
				</p>
			</div>
			<div className = "user-ticket-options">
				<h2>
					Tickets
				</h2>
				<TicketOptions VIPPrice = {event.VIPPrice} generalPrice = {event.generalPrice} eventID = {event.id} />
			</div>	
		</div>
	);
}

export default UserEventRegistration;