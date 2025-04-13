// import directories
import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

import "../styles/common.css";

function TicketOptions ({VIPPrice, generalPrice, eventID}) {
	{/* setting up for navigation */}
	const navigate = useNavigate();

	const [selected, setSelected] = useState(null);

	// for the next page (payment)
	// declare that the ticket type is whatever the user pressed
	const handleTicketSelection = (type) => {
		setSelected(type);
		
		navigate("/user-event-payment");
	};

	return (
		<div style = {{textAlign: "center"}}>
			<button onClick = {() => handleTicketSelection("general")} className = "button">
				General Admission Ticket - ${generalPrice}
			</button>
			<button onClick = {() => handleTicketSelection("VIP")} className = "button">
				VIP Ticket - ${VIPPrice}
			</button>

			{selected && (<div><p className = "content_text">You have selected: <strong>{selected.toUpperCase()}</strong> ticket</p></div>)}
		</div>
	);
}

export default TicketOptions;