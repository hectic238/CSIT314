// import directories
import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

import NavButton from '../components/nav_button';

import "../styles/common.css";

const UserPortal = () => {
	{/* setting up for navigation */}
	const navigate = useNavigate();

	{/* to change the tab name */}
	useEffect(() => {
		document.title = "Event Manager";
	}, []);

	{/* temporary event detail */}
	const [events, setEvents] = useState([
		{
			id: 1,
			name: "Tech Expo 2025",
			date: "2025-06-15",
			time: "02:00",
			location: "Tech Hall",
			type: "Conference",
			description:"Latest in AI and Robotics",
			generalprice: 30,
			vipprice: 100,
		},
		{
			id: 2,
			name: "Concert in the Park",
			date: "2025-05-20",
			time: "13:00",
			location: "New York",
			type: "Music Concert",
			description: "A relaxing evening concert with live music.",
			generalprice: 20,
			vipprice: 50,
		},
		{
			id: 3,
			name: "Local Art Fair",
			date: "2025-04-25",
			time: "12:00",
			location: "Toronto",
			type: "Networking Session",
			description: "Discover and buy from local artists.",
			generalprice: 0,
			vipprice: 10,
		},
	]);

	{/* develop a filter */}
	const [filters, setfilters] = useState ({
		location: '',
		generalprice: 0,
		date: '',
		type: '',
	});

	{/* assign filter changes to its relevant title */}
	const handleFilterChange = (e) => {
		const {name, value} = e.target;
		setfilters (prev => ({...prev, [name]: value}));	
	};

	{/* clearing filters */}
	const clearFilters = () => {
		setfilters({
			location: '',
			generalprice: 0,
			date: '',
			type: '',
		});
	};

	{/* slider for price range */}
	const handlePriceSlider = (e) => {
		setfilters (prev => ({...prev, generalprice: parseInt(e.target.value) }));
	};

	{/* filtering */}
	const filteredEvents = events.filter(event => {
		{/* group location matching events */}
		const matchesLocation = filters.location ? event.location.toLowerCase().includes(filters.location.toLowerCase()) : true;

		{/* group date matching events */}
		const matchesDate = filters.date ? event.date == filters.date : true;

		{/* group events by type */}
		const matchesType = filters.type ? event.type.toLowerCase().includes(filters.type.toLowerCase()) : true;

		{/* price range matching */}
		const matchesPrice = event.generalprice <= filters.generalprice;

		return matchesLocation && matchesDate && matchesType && matchesPrice;
	});

	return (
		<div>
			{/* navigation button to the home page */}
			<NavButton to="/home-page">
				Event Manager
			</NavButton>
			{/* navigation button to the manage user account */}
			<NavButton to="/user-account">
				Manage Account
			</NavButton>

			{/* Page purpose */}
			<h1>
				User Portal
			</h1>
			
			<div className = "container_content">
				<div>
					<p className = "content_text">
						Filter by date: <input type = "date" name = "date" value = {filters.date} onChange = {handleFilterChange} />
					</p>
					<p className = "content_text">
						Filter by location: <input type = "text" name = "location" value = {filters.location} onChange = {handleFilterChange} />
					</p>
					<p className = "content_text">
						Filter by category: <input type = "text" name = "type" value = {filters.type} onChange = {handleFilterChange} />
					</p>
					<p className = "content_text">
						General ticket price range: $0 <input type = "range" min = "0" max = "1000" step = "5" value = {filters.generalprice} onChange = {handlePriceSlider} /> ${filters.generalprice}
					</p>
				</div>
				<h1>
					Events :
				</h1>
				<table className = "table">
					<thead>
						<tr>
							<th>
								Event name
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
								Category
							</th>
							<th>
								General price
							</th>
							<th>
								Action
							</th>
						</tr>
					</thead>
					<tbody>
						{filteredEvents.map(event => (
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
									{event.type}
								</td>
								<td>
									{event.generalprice}
								</td>
								<td>
									{/*
									<button className = "button" onClick={() => alert("Go to event details")}>
										Register
									</button>
									*/}
									<NavButton to={'/user-event-registration'}>
										Register
									</NavButton>
								</td>
							</tr>
						))}
						{filteredEvents.length == 0 && <p>No Events Match This Filter</p>}
					</tbody>
				</table>
			</div>
		</div>
	);
}
export default UserPortal;