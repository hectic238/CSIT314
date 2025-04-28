// import directories
import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

import NavButton from '../components/nav_button';
import Message from '../components/message';

import "../styles/common.css";

const UserLogin = () => {
	// setting up for navigation
	const navigate = useNavigate();

	// setting up for message content
	const [message, setmessage] = useState('');
	
	// setting up for message type, either (error or success)
	const [messagetype, setmessagetype] = useState('');

	// setting up to submit details to the database, to check if it is correct
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	// to change the tab name
	useEffect(() => {
		document.title = "Event Manager";
	}, []);

	// submit login details
	const handleLogin = async (e) => {
		// prevent empty fields
		e.preventDefault();

		setmessage('');
		setmessagetype('');

		// make sure fields are not submitted empty
		if (!email || !password) {
			setmessage("Please fill both the email and password fields!");
			setmessagetype("error");
			return;
		}

		// validate email entry
		// input type = "email" just does a visual message, does not validate
		// string + @ + string + . + string
		const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
		
		// email validity check		
		if (!emailRegex.test(email)) {
			setmessage("Please enter a correct email format!");
			setmessagetype("error");
			return;
		}

		// convert email to lowercase
		const emailLowerCase = email.toLowerCase();

		try {
			// submit login request
			const response = await fetch("http://localhost:5000/api/login", {
				method: 'POST',
				headers: {'Content-Type': 'application/json'},
				body: JSON.stringify({
					email: emailLowerCase,
					password: password,
					role: "User"
				})
			});

			// wait for a response
			const data = await response.json();

			if (response.status === 200) {
				// if details are correct, save it
				localStorage.setItem('token', data.token);

				// save member role, and their id
				localStorage.setItem('role', data.member.role);
				localStorage.setItem('user', data.member.memberid);

				setmessage("Log in Successful!");
				setmessagetype("success");
				
				// set login time
				localStorage.setItem('logintime', Date.now().toString());

				// proceed to user portal
				navigate("/user-portal");
			}
			else {
				setmessage("Could not log you in, details do not match!");
				setmessagetype("error");
			}
		}
		catch (error) {
			setmessage("Could not log you in!");
			setmessagetype("error");
		}
	};

	return (
		<div>
			{/* navigation button to the home page */}
			<NavButton to="/home-page">
				Event Manager
			</NavButton>
			{/* navigation button to the user registration page */}
			<NavButton to="/user-register">
				Register to become a User
			</NavButton>

			{/* Page purpose */}
			<h1>
				User Login
			</h1>
			<Message message = {message} type = {messagetype} />
			<div className = "container_content">
				<form className = "center_screen" onSubmit = {handleLogin} >
					<p>
						Email: <input type = "email" placeholder = "Enter your email" value = {email} onChange = {(e) => setEmail(e.target.value)} />
					</p>
					

					<p>
						Password: <input type = "password" placeholder = "Enter your password" value = {password} onChange = {(e) => setPassword(e.target.value)} autoComplete = ""/>
					</p>
					<p>
						<button type = "submit" className = "button">
							Login
						</button>
					</p>
				</form>
			</div>
		</div>
	);
};

export default UserLogin;