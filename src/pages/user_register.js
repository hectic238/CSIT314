// import directories
import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

import NavButton from '../components/nav_button';

import "../styles/common.css";

const UserRegister = () => {
	{/* setting up for navigation */}
	const navigate = useNavigate();

	{/* setting up to submit details to the database */}
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
	});

	{/* prepare error message */}
	const [error, setError] = useState('');

	{/* to change the tab name */}
	useEffect(() => {
		document.title = "Event Manager";
	}, []);

	{/* decide what happens when the field changes */}
	const handleChange = (e) => {
		const {name, value} = e.target;
		{/* save data entered to its respective name */}
		setFormData(prev => ({...prev, [name]: value}));
	};

	{/* decide what happens when the form is submitted */}
	const handleSubmit = async(e) => {
		e.preventDefault();

		setError('');
		
		{/* validate that fields are not left empty */}
		if (!formData.name || !formData.email || formData.password) {
			setError ("Please fill in all the fields");
			return;
		}

		{/* validate email entry */}
		{/* input type = "email" just does a visual message, does not validate :( */}
		{/* string + @ + string + . + string */}
		const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

		{/* email validity check */}
		if (!emailRegex.test(formData.email)) {
			alert("Please enter a valid email");
			return;
		}

		{/* it is not a requirement, but thought that password should be greater than 6 characters */}
		if (formData.password.length < 6) {
			setError ("Please add more characters to your password, at least 6");
			return;
		}
		
		{/* go to login */}
		navigate("/organiser-login");
	};
	
	return (
		<div>
			{/* navigation button to the home page */}
			<NavButton to="/home-page">
				Event Manager
			</NavButton>
			{/* navigation button to the organiser registration page */}
			<NavButton to="/organiser-register">
				Register as an organiser
			</NavButton>

			{/* Page purpose */}
			<h1>
				User Register
			</h1>
			
			<div className = "container_content">
				<form className = "center_screen">
					<p>
						Name: <input type = "name" value = {formData.name} onChange = {handleChange} />
					</p>
					<p>
						Email: <input type = "email" value = {formData.email} onChange = {handleChange} />
					</p>
					<p>
						Password: <input type = "password" value = {formData.password} onChange = {handleChange} />
					</p>
					{error && (
						<p style = {{ color: "red"}}>
							{error}
						</p>
					)}
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

export default UserRegister;