// use axios to run http in the backend (for testing purposes)
const axios = require('axios');

async function SystemTest() {
	try {
		// Register as an organiser
		const registerorganiser = await axios.post('http://localhost:5000/api/member/register', {
			name: 'Organisertest',
			email: 'eventmanagermanagement@gmail.com',
			password: 'Organisertest2025',
			role: 'Organiser'
		});

		console.log('Registered as an Organiser!');

		// login as an organiser
		const loginorganiser = await axios.post('http://localhost:5000/api/login', {
			email: 'eventmanagermanagement@gmail.com',
			password: 'Organisertest2025',
			role: 'Organiser'
		});

		console.log('Logged in as an Organiser!');

		// Register a user
		const registeruser = await axios.post('http://localhost:5000/api/member/register', {
			name: 'Usertest',
			email: 'hasaanfarache@gmail.com',
			password: 'Usertest2025',
			role: 'User'
		});

		console.log('Registered a user!');
	}
	catch (err) {
		console.error('Test failed!', err.response?.data || err.message);
		process.exit(1);
	}
}

SystemTest();
