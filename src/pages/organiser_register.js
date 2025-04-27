// import directories
import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

import NavButton from '../components/nav_button';
import Message from '../components/message';

import "../styles/common.css";

const OrganiserRegister = () => {
	// setting up for navigation
	const navigate = useNavigate();

	// setting up to submit details to the database
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
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

	// decide what happens when the form is submitted
	const handleSubmit = async(e) => {
		e.preventDefault();

		setmessage('');
		setmessagetype('');
		
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

		
		try {
			// send request to backend
			const response = await fetch('http://localhost:5000/api/member/register', {
				method: 'POST',
				headers: {'Content-Type': 'application/json'},
				body: JSON.stringify({
					name: formData.name,
					email: emailLowerCase,
					password: formData.password,
					role: "Organiser"
				})
			});

			// get response back from backend
			const data = await response.json();

			if (response.status === 201) {
				setmessage("Registration complete!");
				setmessagetype("success");
				// go to login
				navigate("/organiser-login");
			}
			else {
				// something went wrong
				setmessage(data.error, "Could not register!");
				setmessagetype("error");
			}
		}
		catch (error) {
			setmessage("Could not register, try again!");
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
				Register as a User
			</NavButton>

			{/* Page purpose */}
			<h1>
				Organiser Register
			</h1>
			<Message message = {message} type = {messagetype} />
			<div className = "container_content">
				<form className = "center_screen" onSubmit = {handleSubmit} >
					<p>
						Name: <input type = "text" name = "name" value = {formData.name} onChange = {handleChange} />
					</p>
					<p>
						Email: <input type = "email" name = "email" value = {formData.email} onChange = {handleChange} />
					</p>
					<p>
						Password: <input type = "password" name = "password" value = {formData.password} onChange = {handleChange} autoComplete = "" />
					</p>
					<p>
						<button type = "submit" className = "button">
							Register
						</button>
					</p>
				</form>
			</div>
		</div>
	);	
}

export default OrganiserRegister;