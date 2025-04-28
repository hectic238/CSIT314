// import directories
import React from 'react';

// create Message to replace alert
// alert is invasive, and it is hard for me to automate the website
const Message = ({message, type}) => {
	// check if it is empty
	if (!message) {
		return null;
	}

	// create a holder for the type of message to be sent
	const classname = type === 'error' ? 'message error' : 'message success';

	return (
		<div className = {classname} role = "alert">
			{message}
		</div>
	);
};

export default Message;