// import directories
import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import UserEventRegistration from './pages/user_event_registration';
import OrganiserEditEvent from './pages/organiser_edit_event';
import OrganiserManageAttendees from './pages/organiser_manage_attendees';

function App() {
	return (
		<Router>
			<Routes>
				{/* Default route */}
				<Route path = "/" element = {<UserEventRegistration />} />
				{/* User route */}
				<Route path = "/user-event-registration" element = {<UserEventRegistration />} />
				{/* Organiser route */}
				<Route path = "/organiser-edit-event" element = {<OrganiserEditEvent />} />
				<Route path = "/organiser-manage-attendees" element = {<OrganiserManageAttendees />} />
			</Routes>
		</Router>
	);
}

export default App;