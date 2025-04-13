// import directories
import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

import NavButton from '../components/nav_button';

import "../styles/common.css";

const OrganiserPortal = () => {
	{/* setting up for navigation */}
	const navigate = useNavigate();

	{/* temporary default data */}
	const [organiserEvents, setOrganiserEvents] = useState([{
		id: 1,
		name: 'Event Name 1',
		date: '1975-01-01',
		time: '00:00',
		location: 'USA',
		ticketsold: 2
	},
	{
		id: 2,
		name: 'Event Name 2',
		date: '1976-01-01',
		time: '00:13',
		location: 'CAD',
		ticketsold: 4
	}]);

	{/* to change the tab name */}
	useEffect(() => {
		document.title = "Event Manager";
	}, []);

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
								<th>
									Tickets Sold
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
							{organiserEvents.map(event => (
								<tr key = {event.id}>
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
									<td>
										{event.ticketsold}
									</td>
									<td className = "noborder">
										<NavButton to={'/organiser-edit-event'}>
											Edit
										</NavButton>
									</td>
									<td className = "noborder">
										<NavButton to={'/organiser-manage-attendees'}>
											Manage Attendees
										</NavButton>
									</td>
									<td className = "noborder">
										<NavButton to={'/organiser-send-announcements'}>
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