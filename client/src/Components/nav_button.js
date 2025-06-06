// import directories
import React from 'react';
import { Link } from 'react-router-dom'

import "../Styles/common.css";

// declare what happens when pressing a button
// it should take you to the next page (children)
const Nav_button = ({ to, children, ...props }) => {
	return (
		<Link to={to} className="button" {...props}>
			{children}
		</Link>
	);
};

export default Nav_button;