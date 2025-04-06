// import directories
import React, {useState} from "react";
import "../styles/common.css";

function TicketOptions ({VIPPrice, generalPrice, eventID}) {
	const [selected, setSelected] = useState(null);

	// for the next page (payment)
	// declare that the ticket type is whatever the user pressed
	const handleTicketSelection = (type) => {
		setSelected(type);
	};

	return (
		<div style = {{textAlign: "center"}}>
			<button onClick = {() => handleTicketSelection("general")} className = "button">
				General Admission Ticket - ${generalPrice}
			</button>
			<button onClick = {() => handleTicketSelection("VIP")} className = "button">
				VIP Ticket - ${VIPPrice}
			</button>

			{selected && (<p>You have selected: <strong>{selected.toUpperCase()}</strong> ticket</p>)}
		</div>
	);
}

export default TicketOptions;