// import directories
import {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

const SessionTimeoutHandler = () => {
	// to handle navigation accross pages
	const navigate = useNavigate();

	useEffect(() => {
		const logout = () => {
			localStorage.clear();
			navigate('/home-page');
		};

		// convert millisecond to seconds to minutes, to make an hour
		const TIMEOUT = 60 * 60 * 1000;
		
		// get time when member logged in
		const logintime = localStorage.getItem('logintime');

		// could not find the time
		if (!logintime) {
			// log member out, they access through external invalid link
			logout();

			return;
		}

		// if login time exists, then do calculation to figure out
		// if it is over an hour
		const elapsed = Date.now() - parseInt(logintime, 10);
		
		if (elapsed > TIMEOUT) {
			logout();
		}
		else {
			// if there is still time.
			// start a timer
			const remaining = TIMEOUT - elapsed;
			const timer = setTimeout(() => {
				logout();
			}, remaining);

			// once timer runs out, clear timer
			return () => clearTimeout(timer);
		}
	}, [navigate]);

	return null;
};

export default SessionTimeoutHandler;
