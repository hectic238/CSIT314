// import directories
import React, {useState, useEffect} from 'react';
import {useNavigate, useParams} from 'react-router-dom';

import NavButton from '../components/nav_button';
import Message from '../components/message';

import "../styles/common.css";

// create a function for user event registration page
function UserEventRegistration() {

	// to allow the user to go back to the previous activity
	// which is supposed to be "event searching and filtering"
	const navigate = useNavigate();

	// get event id from the link
	const {eventid} = useParams();

	// hold event data
	const [event, setevent] = useState([]);

	// setting up for message content
	const [message, setmessage] = useState('');
	
	// setting up for message type, either (error or success)
	const [messagetype, setmessagetype] = useState('');

	// to change the tab name
	useEffect(() => {
		document.title = "Event Manager";
	}, []);

	// fetching data from backend about event
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

		// get event details
		const fetchevent = async () => {
			

			setmessage('');
			setmessagetype('');

			try {
				const response = await fetch(`http://localhost:5000/api/events/member/${eventid}`, {
					method: "GET",
					headers: {
						"Authorization": `Bearer ${token}`
					},
				});
				
				// check if fetched event
				if (!response.ok) {
					setmessage("Could not fetch the event!");
					setmessagetype("error");
				}

				const data = await response.json();

				// save the data
				setevent(data);
			}
			catch (error) {
				setmessage("server error!");
				setmessagetype("error");
			}
		};

		fetchevent();

	}, [eventid, navigate]);

	// update ticket details
	const updateticket = async () => {
		// get Member id
		const userid = localStorage.getItem('user');
		// get token from local storage
		const token = localStorage.getItem('token');

		try {
			setmessage('');
			setmessagetype('');
			const response = await fetch(`http://localhost:5000/api/tickets/upgradetovip/${eventid}/${userid}`, {
				method: "PUT",
				headers: {
					"Authorization": `Bearer ${token}`,
				}
			});
			// check if ticket was updated
			if (!response.ok) {
				setmessage("Could not update ticket!");
				setmessagetype("error");
				return;
			}

			setmessage("Ticket upgraded to VIP!");
			setmessagetype("success");
		}
		catch (error) {
			setmessage("Could not update ticket, server error!");
			setmessagetype("error");
		}
	};

	// send ticket details
	const registerticket = async (tickettype) => {
		// get user id
		const userid = localStorage.getItem('user');
		// get token from local storage
		const token = localStorage.getItem('token');
		try {
			setmessage('');
			setmessagetype('');
			const response = await fetch(`http://localhost:5000/api/tickets/register`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"Authorization": `Bearer ${token}`,
				},
				body: JSON.stringify({
					eventid: eventid,
					userid: userid,
					tickettype: tickettype
				})
			});
			// check if ticket created
			if (!response.ok) {
				setmessage("Could not create ticket!");
				setmessagetype("error");
				return;
			}

			setmessage("Ticket created!");
			setmessagetype("success");
		}
		catch (error) {
			setmessage("Could not create ticket, server error!");
			setmessagetype("error");
		}
	};

	const GenerateTicket = async(tickettype) => {
		// get token from local storage
		const token = localStorage.getItem('token');
	
		// get Member role
		const role = localStorage.getItem('role');

		// get Member id
		const userid = localStorage.getItem('user');

		// redirect to login if no token or not organiser
		if (!token || (role !== 'User')) {
			setmessage("Unauthorized access, please login");
			setmessagetype("error");
			navigate('/user-login');
			return;
		}
			
		try {
			// reset message display
			setmessage('');
			setmessagetype('');

			// get ticket from database (assuming there is one)
			const ticketresponse = await fetch(`http://localhost:5000/api/tickets/user/${eventid}/${userid}`, {
				method: "GET",
				headers: {
					"Authorization": `Bearer ${token}`,
				},
			});
			// check if fetched ticket
			if (ticketresponse.ok) {
				const ticketdata = await ticketresponse.json();

				// if response length is 0, like this []
				// (Object.keys(setticket).length === 0)
				// but it is not necessary as in backend, we get ticketresponse.status === 404 for that
				// way easier
				if (ticketdata.ticketexists === false) {
					// create a ticket
					await registerticket(tickettype);
				}
				else if ((ticketdata.ticketexists === true) && (ticketdata.ticket[0]) && (ticketdata.ticket[0].tickettype === "General") && (tickettype === "VIP")) {
					// if old ticket is General, update to VIP when try to buy ticket again
					await updateticket();
				}

				navigate(`/user-event-payment/${event._id}`, { state: { ticketCreated: true } });
			}
			else {
				setmessage("Could not fetch a ticket!");
				setmessagetype("error");
			}
		}
		catch (error) {
			setmessage("Could not check or create ticket, server error!");
			setmessagetype("error");
		}
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
			<Message message = {message} type = {messagetype} />
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
				<div className = "content_text">
					<p>
						Credit card number <input type = "text" />
					</p>
					<p>
						Expiry Month <input type = "text" />
					</p>
					<p>
						Expiry Year <input type = "text" />
					</p>
					<p>
						3 digit pin on the back <input type = "text" />
					</p>
				</div>
			</div>
			<div className = "container_content">
				<div className = "container_content">
					<button onClick = {() => GenerateTicket("General")} className = "button">
						General Admission
					</button>
					<button onClick = {() => GenerateTicket("VIP")} className = "button">
						VIP Admission
					</button>
				</div>				
			</div>	
		</div>
	);
}

export default UserEventRegistration;