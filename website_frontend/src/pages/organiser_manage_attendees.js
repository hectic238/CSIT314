// import directories
import React, {useState, useEffect} from 'react';
import {useNavigate, useParams} from 'react-router-dom';

import NavButton from '../components/nav_button';
import Message from '../components/message';

import "../styles/common.css";

function OrganiserManageAttendees() {

	// for navigation on the site
	const navigate = useNavigate();

	// event id from url
	const {eventid} = useParams();

	// hold event data
	const [event, setevent] = useState([]);

	// hold attendees data
	const [attendees, setattendees] = useState([]);

	// setting up to submit details to the database
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
		tickettype: 'General',
	});

	// setting up for message content
	const [message, setmessage] = useState('');
	
	// setting up for message type, either (error or success)
	const [messagetype, setmessagetype] = useState('');

	// to change the tab name
	useEffect(() => {
		document.title = "Event Manager";
	}, []);

	// decide what happens when the field changes
	const handleChange = (e) => {
		const {name, value} = e.target;
		// save data entered to its respective name
		setFormData(prev => ({...prev, [name]: value}));
	};

	// update ticket details
	const updateticket = async (userid) => {
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

			// reload page
			window.location.reload();
		}
		catch (error) {
			setmessage("Could not update ticket, server error!");
			setmessagetype("error");
		}
	};

	// send ticket details
	const registerticket = async (tickettype, userid, password) => {
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
					"eventid": eventid,
					"userid": userid,
					"tickettype": tickettype
				})
			});
			// check if ticket created
			if (!response.ok) {
				setmessage("Could not create ticket!");
				setmessagetype("error");
				return;
			}

			await response.json();
			

			setmessage("Ticket created!");
			setmessagetype("success");

			// reload page
			window.location.reload();
		}
		catch (error) {
			setmessage("Could not create ticket, server error!");
			setmessagetype("error");
		}
	};

	const GenerateTicket = async(tickettype, userid, password, response_previous) => {
		// get token from local storage
		const token = localStorage.getItem('token');
	
		// get Member role
		const role = localStorage.getItem('role');

		// redirect to login if no token or not organiser
		if (!token || (role !== 'Organiser')) {
			setmessage("Unauthorized access, please login");
			setmessagetype("error");
			navigate('/organiser-login');
			return;
		}
			
		try {
			// reset message display
			setmessage('');
			setmessagetype('');

			// if user does not exist, and was just made
			if (response_previous === 201) {
				// send password to user via email
				await sendpasswordbyemail(userid, password);
			}

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
					await registerticket(tickettype, userid, password);
				}
				else if ((ticketdata.ticketexists === true) && (ticketdata.ticket[0]) && (ticketdata.ticket[0].tickettype === "General") && (tickettype === "VIP")) {
					// if old ticket is General, update to VIP when try to buy ticket again
					await updateticket(userid);
				}
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

	// get user details
	const fetchuserid = async (email) => {
		// get token from local storage
		const token = localStorage.getItem('token');

		setmessage('');
		setmessagetype('');

		try {
			const response = await fetch(`http://localhost:5000/api/user/getuserid/${email}`, {
				method: "GET",
				headers: {
					"Authorization": `Bearer ${token}`
				},
			});
				
			// check if fetched user details
			if (!response.ok) {
				setmessage("Could not fetch the user details!");
				setmessagetype("error");
			}

			const data = await response.json();

			// save the data
			return data.userid;
		}
		catch (error) {
			setmessage("server error!");
			setmessagetype("error");
		}
	};

	const sendpasswordbyemail = async (userid, userpassword) => {
		// get token from local storage
		const token = localStorage.getItem('token');

		setmessage('');
		setmessagetype('');
		try {
			const response = await fetch(`http://localhost:5000/api/email/sendpassword`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					"Authorization": `Bearer ${token}`
				},
				body: JSON.stringify({
					userid,
					userpassword
				})
			});

			await response.json();
			
			if (!response.ok) {
				setmessage("error sending the email to user!");
				setmessagetype("error");
			}
			else {
				setmessage("Email sent to user!");
				setmessagetype("success");
			}
		}
		catch (error) {
			setmessage("could not send email, server error!");
			setmessagetype("error");
		}
	};

	// decide what happens when the form is submitted
	const handleSubmit = async(e) => {
		e.preventDefault();

		setmessage('');
		setmessagetype('');
		
		// validate that fields are not left empty
		if (!formData.name || !formData.email) {
			setmessage("Please fill all fields!");
			setmessagetype("error");
			return;
		}

		// validate email entry
		// input type = "email" just does a visual message, does not validate :(
		// string + @ + string + . + string
		const emailRegex = /^[a-zA-Z0-9._%+-]+@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/;

		// email validity check
		if (!emailRegex.test(formData.email)) {
			setmessage("Please enter a valid email!");
			setmessagetype("error");
			return;
		}

		// convert email to lowercase
		const emailLowerCase = formData.email.toLowerCase();

		// this function is from https://www.geeksforgeeks.org/how-to-generate-random-password-in-react/
		// used to generate a password, I did not know how to do it using library
		// I updated it a bit to be fully automated in background
		const generatepassword = () => {
			let charset = "";
			let newPassword = "";

			charset += "!@#$%^&*()";
			charset += "0123456789";
			charset += "abcdefghijklmnopqrstuvwxyz";
			charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

			for (let i = 0; i < 23; i++) {
				newPassword += charset.charAt(Math.floor(Math.random() * charset.length));
			}

			return newPassword;
		};

		const password = await generatepassword();
		
		try {
			// send request to backend
			const response = await fetch(`http://localhost:5000/api/member/register`, {
				method: 'POST',
				headers: {'Content-Type': 'application/json'},
				body: JSON.stringify({
					name: formData.name,
					email: emailLowerCase,
					password: password,
					role: "User"
				})
			});

			// get response back from backend
			await response.json();

			if (response.status === 201) {
				setmessage("Registration complete!");
				setmessagetype("success");
			}
			else {
				// something went wrong
				setmessage("Could not register user!");
				setmessagetype("error");
			}

			// get userid
			const currentuserid = await fetchuserid(formData.email.toLowerCase());

			// assuming it returns ok
			// then it is either registered now or previously so create a ticket
			await GenerateTicket(formData.tickettype, currentuserid, password, response.status);
		}
		catch (error) {
			setmessage("Could not register, try again!");
			setmessagetype("error");
		}
	};

	const sendseveringemail = async (ticketid) => {
		// get token from local storage
		const token = localStorage.getItem('token');

		setmessage('');
		setmessagetype('');
		try {
			const response = await fetch(`http://localhost:5000/api/email/severingemail`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					"Authorization": `Bearer ${token}`
				},
				body: JSON.stringify({
					"ticketid": ticketid
				})
			});

			await response.json();
			
			if (!response.ok) {
				setmessage("error sending the email to user!");
				setmessagetype("error");
			}
			else {
				setmessage("Email sent to user!");
				setmessagetype("success");
			}
		}
		catch (error) {
			setmessage("could not send email, server error!");
			setmessagetype("error");
		}
	};

	// delete button functionality
	const handleRemove = async (ticketid) => {
		// get token from local storage
		const token = localStorage.getItem('token');
		
		// get Member role
		const role = localStorage.getItem('role');

		// redirect to login if no token or not organiser
		if (!token || (role !== 'Organiser')) {
			navigate('/organiser-login');
			return;
		}

		
		// tell the user that they have been removed
		await sendseveringemail(ticketid);

		setmessage("User refunded");
		setmessagetype("success");

		try {
			const response = await fetch(`http://localhost:5000/api/tickets/deleteticket/${ticketid}`, {
				method: "DELETE",
				headers: {
					"Authorization": `Bearer ${token}`
				},
			});

			// if could not delete event
			// mostly likely due to not being logged in properly
			if (!response.ok) {
				setmessage("Please, log in again!");
				setmessagetype("error");
				navigate("/organiser-login");
			}

			setmessage("Ticket Deleted!");
			setmessagetype("success");
			
			// reload page
			window.location.reload();
		}
		catch (error) {
			setmessage("Could not delete, server error!");
			setmessagetype("error");
		}
	}

	// fetching data from backend about event
	// to create a token and prevent unauthorised access
	useEffect(() => {
		// get token from local storage
		const token = localStorage.getItem('token');
		
		// get Member role
		const role = localStorage.getItem('role');

		// redirect to login if no token or not organiser
		if (!token || (role !== 'Organiser')) {
			navigate('/organiser-login');
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

		// fetch event
		fetchevent();

		// get event details
		const fetchTickets = async () => {
			setmessage('');
			setmessagetype('');
			try {
				const response = await fetch(`http://localhost:5000/api/tickets/getbyid/${eventid}`, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});
			
				// check if fetched a ticket
				if (!response.ok) {
					setmessage("Could not fetch the tickets!");
					setmessagetype("error");
				}

				const data = await response.json();

				// save the fetched data
				setattendees(data);
			}
			catch (error) {
				setmessage("Could not fetch ticket, server error!");
				setmessagetype("error");
			}
		};

		fetchTickets();

	}, [eventid, navigate]);

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
			<Message message = {message} type = {messagetype} />
			<div className = "container_content">
				<h2 className = "content_text">
					Event: {event.name}
				</h2>
			</div>
			
			<div className = "container_content">
				<form className = "content_text" onSubmit = {handleSubmit}>
					<p>
						Add Attendee
					</p>
					<p>
						Name: <input type = "text" name = "name" value = {formData.name} onChange = {handleChange} />
					</p>
					<p>
						Email: <input type = "text" name = "email" value = {formData.email} onChange = {handleChange} />
					</p>
					<p>
						Ticket Type:
						<select name = "tickettype" value = {formData.tickettype} onChange = {handleChange}>
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
							{attendees.map((ticket) => (
								<tr key = {ticket._id}>
									<td>
										{ticket.userid.name}
									</td>
									<td>
										{ticket.userid.email}
									</td>
									<td>
										{ticket.tickettype}
									</td>
									<td>
										<button className = "button" onClick = {() => handleRemove(ticket._id)}>
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