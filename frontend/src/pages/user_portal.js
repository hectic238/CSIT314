// import directories
import React, {useState, useEffect, useMemo} from 'react';
import {useNavigate} from 'react-router-dom';

import NavButton from '../components/nav_button';
import Message from '../components/message';

import "../styles/common.css";

const UserPortal = () => {
	// setting up for navigation
	const navigate = useNavigate();

	// hold event data
	const [events, setevents] = useState([]);

	// setting up for message content
	const [message, setmessage] = useState('');
	
	// setting up for message type, either (error or success)
	const [messagetype, setmessagetype] = useState('');

	// to change the tab name
	useEffect(() => {
		document.title = "Event Manager";
	}, []);

	// develop a filter	
	const [filters, setfilters] = useState ({
		location: '',
		generalprice: 1000,
		date: '',
		type: '',
	});// assign filter changes to its relevant title
	const handleFilterChange = (e) => {
		const {name, value} = e.target;
		setfilters (prev => ({...prev, [name]: value}));	
	};

	// slider for price range
	const handlePriceSlider = (e) => {
		setfilters (prev => ({...prev, generalprice: parseInt(e.target.value) }));
	};

	// filtering
	const filteredEvents = useMemo(() => {
		return Array.isArray(events) ? events.filter(event => {
			// group location matching events
			const matchesLocation = filters.location ? event.location.toLowerCase().includes(filters.location.toLowerCase()) : true;

			// group date matching events
			const matchesDate = filters.date ? event.date === filters.date : true;

			// group events by type
			const matchesType = filters.type ? event.type.toLowerCase().includes(filters.type.toLowerCase()) : true;

			// price range matching
			const matchesPrice = event.generalprice <= filters.generalprice;

			return matchesLocation && matchesDate && matchesType && matchesPrice;
		}) : [];
	}, [events, filters]);

	// fetching data from backend
	// to create a token and prevent unauthorised access
	useEffect(() => {
		// get token from local storage
		const token = localStorage.getItem('token');
		
		// get Member role
		const role = localStorage.getItem('role');

		// redirect to login if no token or not organiser
		if (!token || (role !== 'User')) {
			navigate('/user-login');
			return;
		}

		// get all events
		const fetchevents = async () => {

			setmessage('');
			setmessagetype('');

			try {
				const response = await fetch(`http://localhost:5000/api/events/user`, {
					method: "GET",
					headers: {
						"Authorization": `Bearer ${token}`
					},
				});
				
				// check if fetched events
				if (!response.ok) {
					setmessage("Could not fetch the event!");
					setmessagetype("error");
				}

				const data = await response.json();

				// save the data
				setevents(data);
			}
			catch (error) {
				setmessage("server error!");
				setmessagetype("error");
			}
		};

		fetchevents();

	}, [navigate]);

	useEffect(() => {
		if ((events.length > 0) && (filteredEvents.length === 0)) {
			setmessage("No events fit this filter!");
			setmessagetype("error");
		}
		else {
			setmessage('');
			setmessagetype('');
		}
	}, [filteredEvents, events]);

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
			<Message message = {message} type = {messagetype} />
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
									<NavButton to={`/user-event-registration/${event._id}`}>
										Register
									</NavButton>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}
export default UserPortal;