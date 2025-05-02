// import directories
import React from 'react';
import {BrowserRouter as Router, Route, Routes, useLocation} from 'react-router-dom';

// get session timeout handler to handle timeout
import SessionTimeoutHandler from './components/sessiontimeouthandler';

import HomePage from './pages/home_page';
import UserRegister from './pages/user_register';
import UserLogin from './pages/user_login';
import UserPortal from './pages/user_portal';
import UserManageAccount from './pages/user_manage_account';
import UserEventRegistration from './pages/user_event_registration';
import UserEventPayment from './pages/user_event_payment';
import OrganiserRegister from './pages/organiser_register';
import OrganiserLogin from './pages/organiser_login';
import OrganiserPortal from './pages/organiser_portal';
import OrganiserManageAccount from './pages/organiser_manage_account';
import OrganiserCreateEvent from './pages/organiser_create_event';
import OrganiserEditEvent from './pages/organiser_edit_event';
import OrganiserManageAttendees from './pages/organiser_manage_attendees';
import OrganiserSendAnnouncements from './pages/organiser_send_announcements';

// function that handles timeout for only logged in pages
function ConditionalSessionWrapper() {
	const location = useLocation();
	const path = location.pathname;

	// the following are exluded
	const shouldapplysessiontimeout = ![
		"/",
		"/home-page",
		"/user-register",
		"/user-login",
		"/organiser-register",
		"/organiser-login"
	].includes(path);

	return (
		<>
			{shouldapplysessiontimeout && <SessionTimeoutHandler />}
			<Routes>
				{/* Default route */}
				<Route path = "/" element = {<HomePage />} />
				{/* Common route */}
				<Route path = "/home-page" element = {<HomePage />} />
				{/* User route */}
				<Route path = "/user-register" element = {<UserRegister />} />
				<Route path = "/user-login" element = {<UserLogin />} />
				<Route path = "/user-portal" element = {<UserPortal />} />UserManageAccount
				<Route path = "/user-account" element = {<UserManageAccount />} />
				<Route path = "/user-event-registration/:eventid" element = {<UserEventRegistration />} />
				<Route path = "/user-event-payment/:eventid" element = {<UserEventPayment />} />
				{/* Organiser route */}
				<Route path = "/organiser-register" element = {<OrganiserRegister />} />
				<Route path = "/organiser-login" element = {<OrganiserLogin />} />
				<Route path = "/organiser-portal" element = {<OrganiserPortal />} />
				<Route path = "/organiser-account" element = {<OrganiserManageAccount />} />
				<Route path = "/organiser-create-event" element = {<OrganiserCreateEvent />} />
				<Route path = "/organiser-edit-event/:eventid" element = {<OrganiserEditEvent />} />
				<Route path = "/organiser-manage-attendees/:eventid" element = {<OrganiserManageAttendees />} />
				<Route path = "/organiser-send-announcements/:eventid" element = {<OrganiserSendAnnouncements />} />
			</Routes>
		</>
	);
}



function App() {
	return (
		<Router>
			<ConditionalSessionWrapper />
		</Router>
	);
}

export default App;