// import directories
import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

import NavButton from '../components/nav_button';
import Message from '../components/message';

import "../styles/common.css";

function UserManageAccount() {

	// for navigation on the site
	const navigate = useNavigate();

	// form data holder
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: ''
	});

	// to hold user tickets
	const [tickets, settickets] = useState([]);

	// setting up for message content
	const [message, setmessage] = useState('');
	
	// setting up for message type, either (error or success)
	const [messagetype, setmessagetype] = useState('');

	// to create a token and prevent unauthorised access
	useEffect(() => {
		// get token from local storage
		const token = localStorage.getItem('token');
		
		// get Member role
		const role = localStorage.getItem('role');

		// redirect to login if no token or not user
		if (!token || (role !== 'User')) {
			navigate('/user-login');
			return;
		}

		// get user details
		const fetchUser = async () => {
			// get Member id
			const userid = localStorage.getItem('user');

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
					setmessage("Could not fetch the member details!");
					setmessagetype("error");
				}

				const data = await response.json();

				// save the fetched data
				setFormData({
					name: data.name,
					email: data.email,
					password: data.password
				});
			
			}
			catch (error) {
				setmessage("Could not fetch member details, server error!");
				setmessagetype("error");
			}
		};

		fetchUser();

		// get ticket details
		const fetchTicket = async () => {
			// get Member id
			const userid = localStorage.getItem('user');

			setmessage('');
			setmessagetype('');
			try {
				const response = await fetch(`http://localhost:5000/api/tickets/allusertickets/${userid}`, {
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
				settickets(data);
			}
			catch (error) {
				setmessage("Could not fetch ticket, server error!");
				setmessagetype("error");
			}
		};

		fetchTicket();

	}, [navigate]);

	// to change the tab name
	useEffect(() => {
		document.title = "Event Manager";
	}, []);
	
	// handles the change in the form fields
	const handleChange = (e) => {
		const {name, value} = e.target;
		setFormData(prev => ({...prev, [name]: value}));
	};

	// what happens when submitted
	const handleSubmit = async (e) => {
		e.preventDefault();

		// get Member id
		const userid = localStorage.getItem('user');

		// validate that fields are not left empty
		if (!formData.name || !formData.email || !formData.password) {
			setmessage("Please fill all fields!");
			setmessagetype("error");
			return;
		}

		// validate email entry
		// input type = "email" just does a visual message, does not validate :(
		// string + @ + string + . + string
		const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

		// email validity check
		if (!emailRegex.test(formData.email)) {
			setmessage("Please enter a valid email!");
			setmessagetype("error");
			return;
		}

		// it is not a requirement, but thought that password should be greater than 6 characters
		if (formData.password.length < 6) {
			setmessage("Please add more characters to your password, at least 6");
			setmessagetype("error");
			return;
		}

		// convert email to lowercase
		const emailLowerCase = formData.email.toLowerCase();
		
		// send data to backend
		try {
			const token = localStorage.getItem('token');

			const response = await fetch(`http://localhost:5000/api/user/${userid}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					"Authorization": `Bearer ${token}`
				},
				body: JSON.stringify({
					name: formData.name,
					email: emailLowerCase,
					password: formData.password
				})
			});

			// if could not update user
			// mostly likely due to not being logged in properly
			if (!response.ok) {
				setmessage("Please, log in again!");
				setmessagetype("error");
				navigate("/user-login");
			}

			setmessage("User details updated!");
			setmessagetype("success");

			// reload page
			window.location.reload();
		}
		catch (error) {
			setmessage("Could not update user details!");
			setmessagetype("error");
		}
	};

	return (
		<div>
			{/* navigation button to the home page */}
			<NavButton to="/home-page">
				Event Manager
			</NavButton>
			{/* navigation button to the user portal */}
			<NavButton to="/user-portal">
				User Portal
			</NavButton>

			{/* Page purpose */}
			<h1>
				User Manage Account
			</h1>
			<Message message = {message} type = {messagetype} />
			<div className = "container_content">
				<div className = "content_text">
					<form onSubmit = {handleSubmit}>
						<p>
							Hey, {formData.name}	
						</p>
						<p>
							User name: <input type = "text" name = "name" value = {formData.name} onChange = {handleChange} />	
						</p>
						<p>
							Email: <input type = "text" name = "email" value = {formData.email} onChange = {handleChange} />	
						</p>
						<p>
							Password: <input type = "password" name = "password" value = {formData.password} onChange = {handleChange} autoComplete = "" />	
						</p>
						<p>
							<button type = "submit" className= "button">
								Save Changes
							</button>
						</p>
					</form>
				</div>
			</div>
			<div className = "container_content">
				<div className = "content_text">
					<table className = "table">
						<thead>
							<tr>
								<th>
									<h1>
										Tickets
									</h1>
								</th>
							</tr>
						</thead>
						<tbody>
							{tickets.map(ticket => (
								<tr key = {ticket._id} className = "noborder">
									<td>
										<p>
											{ticket?.eventid.name} on {ticket?.eventid.date} at {ticket?.eventid.time}, in {ticket?.eventid.location}.
										</p>
										<p>
											{formData?.name} as a {ticket?.tickettype} admission.
										</p>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}

export default UserManageAccount;