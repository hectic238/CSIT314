// import directories
import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import HomePage from './pages/home_page';
import UserRegister from './pages/user_register';
import UserLogin from './pages/user_login';
import UserPortal from './pages/user_portal';
import UserEventRegistration from './pages/user_event_registration';
import UserEventPayment from './pages/user_event_payment';
import OrganiserRegister from './pages/organiser_register';
import OrganiserLogin from './pages/organiser_login';
import OrganiserPortal from './pages/organiser_portal';
import OrganiserCreateEvent from './pages/organiser_create_event';
import OrganiserEditEvent from './pages/organiser_edit_event';
import OrganiserManageAttendees from './pages/organiser_manage_attendees';
import OrganiserSendAnnouncements from './pages/organiser_send_announcements';



function App() {
	return (
		<Router>
			<Routes>
				{/* Default route */}
				<Route path = "/" element = {<HomePage />} />
				{/* Common route */}
				<Route path = "/home-page" element = {<HomePage />} />
				{/* User route */}
				<Route path = "/user-register" element = {<UserRegister />} />
				<Route path = "/user-login" element = {<UserLogin />} />
				<Route path = "/user-portal" element = {<UserPortal />} />
				<Route path = "/user-event-registration" element = {<UserEventRegistration />} />
				<Route path = "/user-event-payment" element = {<UserEventPayment />} />
				{/* Organiser route */}
				<Route path = "/organiser-register" element = {<OrganiserRegister />} />
				<Route path = "/organiser-login" element = {<OrganiserLogin />} />
				<Route path = "/organiser-portal" element = {<OrganiserPortal />} />
				<Route path = "/organiser-create-event" element = {<OrganiserCreateEvent />} />
				<Route path = "/organiser-edit-event" element = {<OrganiserEditEvent />} />
				<Route path = "/organiser-manage-attendees" element = {<OrganiserManageAttendees />} />
				<Route path = "/organiser-send-announcements" element = {<OrganiserSendAnnouncements />} />
			</Routes>
		</Router>
	);
}

export default App;