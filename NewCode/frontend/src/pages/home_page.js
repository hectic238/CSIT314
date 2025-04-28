// import directories
import React, {useEffect} from 'react';

import NavButton from '../components/nav_button';

import "../styles/common.css";

function HomePage() {

	// to change the tab name
	useEffect(() => {
		document.title = "Event Manager";
	}, []);

	return (
		<div>
			{/* navigation button to the home page */}
			<NavButton to="/home-page">
				Event Manager
			</NavButton>
			{/* navigation button to the organiser registration page */}
			<NavButton to="/organiser-register">
				Register to become an Organiser
			</NavButton>
			{/* navigation button to the user registration page */}
			<NavButton to="/user-register">
				Register to become a User
			</NavButton>
			{/* Page purpose */}
			<h1>
				Event Manager
			</h1>
			
			<div className = "container_content">
				{/* welcome message */}
				<h3 className = "content_text">
					Welcome to Event Manager, the ultimate event management website!
				</h3>
				
				{/* asking user/organiser to login */}
				<div className = "center_screen">
					<p className = "content_text">
						Please login to access the website
					</p>
					{/* navigation button to each login page */}
					<p>
						<NavButton to="/organiser-login">
							Organiser Login
						</NavButton>
					</p>
					<p>
						<NavButton to="/user-login">
							User Login
						</NavButton>
					</p>
				</div>
			</div>
			
		</div>
	);
}

export default HomePage;