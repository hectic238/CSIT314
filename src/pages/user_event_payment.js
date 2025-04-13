// import directories
import React, {useState, useEffect} from 'react';
import {useNavigate, useLocation} from 'react-router-dom';

import NavButton from '../components/nav_button';

import "../styles/common.css";

const UserEventPayment = () => {
	{/* setting up for navigation */}
	const navigate = useNavigate();
	const location = useLocation();

	{/* to change the tab name */}
	useEffect(() => {
		document.title = "Event Manager";
	}, []);

	{/* get ticket info from buttons previously pressed to get here */}
	const {event, tickettype, price} = location.state || {
		event: {
			name: "event name",
			date: "event date",
			location: "event location",
		},
		tickettype: "General",
		price: 0,
	};

	{/* form to get credit card details */}
	const [formData, setFormData] = useState ({
		name: '',
		cardnumber: '',
		expiry: '',
		cvc: ''
	});

	{/* what to do with changes, setting values to their respective fields */}
	const handleChange = (e) => {
		const {name, value} = e.target;
		setFormData(prev => ({...prev, [name]: value}));
	};
	
	const handlePayment = () => {
		{/* need backend details */}
		alert("payment done");
	};

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
			
			<div className = "container_content">
				<p className = "content_text">
					Name: <input type = "text" name = "name" value = {formData.name} onChange = {handleChange} />
				</p>
				<p className = "content_text">
					Card Number: <input type = "text" name = "cardnumber" value = {formData.cardnumber} onChange = {handleChange} />
				</p>
				<p className = "content_text">
					Expiry data: <input type = "date" name = "expiry" value = {formData.expiry} onChange = {handleChange} />
				</p>
				<p className = "content_text">
					CVC: <input type = "number" name = "cvc" value = {formData.cvc} onChange = {handleChange} />
				</p>
				<p>
					<button className = "button" onClick = {handlePayment}>
						Pay ${price}
					</button>
				</p>
			</div>
		</div>
	);
}
export default UserEventPayment;