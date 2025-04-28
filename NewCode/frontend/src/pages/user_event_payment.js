// import directories
import React, {useState, useEffect} from 'react';
import {useNavigate, useParams} from 'react-router-dom';

import NavButton from '../components/nav_button';
import Message from '../components/message';

import "../styles/common.css";

const UserEventPayment = () => {
	// setting up for navigation
	const navigate = useNavigate();

	// get event id from the link
	const {eventid} = useParams();

	// will hold data for ticket
	const [ticket, setticket] = useState({});

	// setting up for event data
	const [event, setevent] = useState({});

	// setting up for user data
	const [user, setuser] = useState({});

	// setting up for message content
	const [message, setmessage] = useState('');
	
	// setting up for message type, either (error or success)
	const [messagetype, setmessagetype] = useState('');

	// to change the tab name
	useEffect(() => {
		document.title = "Event Manager";
	}, []);

	// get token from local storage
	const token = localStorage.getItem('token');
	
	// get Member role
	const role = localStorage.getItem('role');

	// get Member id
	const userid = localStorage.getItem('user');
		
	// fetching data from backend about event
	// to create a token and prevent unauthorised access
	useEffect(() => {
		// redirect to login if no token or not organiser
		if (!token || (role !== 'User')) {
			setmessage("Unauthorized access, please login");
			setmessagetype("error");
			navigate('/user-login');
			return;
		}

// get event details
	const fetchEvent = async () => {
		setmessage('');
		setmessagetype('');
		try {
			const response = await fetch(`http://localhost:5000/api/events/member/${eventid}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			
			// check if fetched events
			if (!response.ok) {
				setmessage("Could not fetch the event!");
				setmessagetype("error");
			}

			const data = await response.json();

			// save the fetched data
			setevent(data);
			
		}
		catch (error) {
			setmessage("Could not fetch event, server error!");
			setmessagetype("error");
		}
	};

	// get user details
	const fetchUser = async () => {
		setmessage('');
		setmessagetype('');
		try {
			const response = await fetch(`http://localhost:5000/api/user/${userid}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			
			// check if fetched events
			if (!response.ok) {
				setmessage("Could not fetch the user details!");
				setmessagetype("error");
			}

			const data = await response.json();

			// save the fetched data
			setuser(data);
			
		}
		catch (error) {
			setmessage("Could not fetch user details, server error!");
			setmessagetype("error");
		}
	};

	// get event details
	const fetchTicket = async () => {
		setmessage('');
		setmessagetype('');
		try {
			const response = await fetch(`http://localhost:5000/api/tickets/user/${eventid}/${userid}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			
			// check if fetched a ticket
			if (!response.ok) {
				setmessage("Could not fetch the ticket!");
				setmessagetype("error");
			}

			const data = await response.json();

			// save the fetched data
			setticket(data.ticket[0]);
		}
		catch (error) {
			setmessage("Could not fetch ticket, server error!");
			setmessagetype("error");
		}
	};
		
		// get user details
		fetchUser();
		
		// get event details
		fetchEvent();

		// get the ticket made
		fetchTicket();

	}, [navigate, token, role, eventid, userid]);

	return (
		<div>
			{/* navigation button to the home page */}
			<NavButton to="/home-page">
				Event Manager
			</NavButton>
			{/* navigation button to return to user portal */}
			<NavButton to="/user-portal">
				User Portal
			</NavButton>

			{/* Page purpose */}
			<h1>
				Payment Portal
			</h1>
			<Message message = {message} type = {messagetype} />
			{event && user && ticket && (
				<div className = "container_content">
					<Message message = "Payment successful!" type = "success" />
					<table className = "table">
						<thead>
							<tr>
								<th>
									<h1>
										Ticket
									</h1>
								</th>
							</tr>
						</thead>
						<tbody>
							<tr className = "noborder">
								<td>
									<p>
										{event?.name} on {event?.date} at {event?.time}, in {event?.location}.
									</p>
									<p>
										{user?.name} as a {ticket?.tickettype} admission.
									</p>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			)}
		</div>
	);
}
export default UserEventPayment;