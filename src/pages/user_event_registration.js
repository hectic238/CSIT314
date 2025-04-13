// import directories
import React, {useState, useEffect} from 'react';
import {useNavigate, useLocation} from 'react-router-dom';

import NavButton from '../components/nav_button';
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
		type: "Conference",
		description: "Epoch is the time followed to measure time in computers, often used in coding",
		vipprice: 100,
		generalprice: 10,
		id: "0000"
	};


	return (
		<div>
			{/* navigation button to the home page */}
			<NavButton to="/home-page">
				Event Manager
			</NavButton>
			{/* navigation button to go back to user portal */}
			<NavButton to="/user-portal">
				User portal
			</NavButton>

			{/* Page purpose */}
			<h1>
				User Event Registration
			</h1>

			<div className = "container_content">
				<h1>
					{event.name}
				</h1>
				<p className = "content_text">
					<strong>
						Date: 
					</strong>
					{event.date}
				</p>
				<p className = "content_text">
					<strong>
						Time: 
					</strong>
					{event.time}
				</p>
				<p className = "content_text">
					<strong>
						Location: 
					</strong>
					{event.location}
				</p>
				<p className = "content_text">
					<strong>
						Type: 
					</strong>
					{event.type}
				</p>
				<p className = "content_text">
					<strong>
						Description: 
					</strong>
					{event.description}
				</p>
			</div>
			<div className = "container_content">
				<h1>
					Tickets
				</h1>
				<TicketOptions vipprice = {event.vipprice} generalprice = {event.generalprice} eventID = {event.id} />
			</div>	
		</div>
	);
}

export default UserEventRegistration;