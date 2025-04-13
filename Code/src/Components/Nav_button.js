// import directories
import React from 'react';
import { Link } from 'react-router-dom'

import "../Styles/common.css";

const Nav_button = ({ to, children, ...props }) => {
	return (
		<Link to={to} className="button" {...props}>
			{children}
		</Link>
	);
};

export default Nav_button;