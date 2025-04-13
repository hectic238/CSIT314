// import directories
import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

import NavButton from '../components/nav_button';

import "../styles/common.css";

const UserLogin = () => {
	{/* setting up for navigation */}
	const navigate = useNavigate();

	{/* setting up to submit details to the database, to check if it is correct */}
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');

	{/* to change the tab name */}
	useEffect(() => {
		document.title = "Event Manager";
	}, []);

	{/* submit login details */}
	const handleLogin = () => {
		setError('');

		{/* validate email entry */}
		{/* input type = "email" just does a visual message, does not validate :( */}
		{/* string + @ + string + . + string */}
		const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
		
		{/* make sure fields are not submitted empty */}
		if (!email || !password) {
			setError("Either email or password is empty, please fill it out!");
			return;
		}
		
		{/* email validity check */}
		if (!emailRegex.test(email)) {
			setError("Please enter a valid email");
			return;
		}

		{/* assume login detail is correct */}
		navigate("/user-portal");
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
			
			<div className = "container_content">
				<div className = "center_screen">
					<p>
						Email: <input type = "email" placeholder = "Enter your email" value = {email} onChange = {(e) => setEmail(e.target.value)} />
					</p>
					

					<p>
						Password: <input type = "password" placeholder = "Enter your password" value = {password} onChange = {(e) => setPassword(e.target.value)} />
					</p>
					{error && (
						<p style = {{ color: "red"}}>
							{error}
						</p>
					)}
					<p>
						<button className = "button" onClick = {handleLogin}>
							Login
						</button>
					</p>
				</div>
			</div>
		</div>
	);
};

export default UserLogin;