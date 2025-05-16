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
		// wait a bit, to make sure database is ready
		await new Promise(res => setTimeout(res, 1000));

		// login as an organiser
		const loginorganiser = await axios.post('http://localhost:5000/api/login', {
			email: 'eventmanagermanagement@gmail.com',
			password: 'Organisertest2025',
			role: 'Organiser'
		});

		// save organiser logged in details
		const data = loginorganiser.data;
		const token = data.token;
		const organiserid = data.member.memberid;
		const role = data.role;

		console.log("token");
		console.log(token);
		console.log("id");
		console.log(organiserid);
		console.log("role");
		console.log(role);

		console.log('Logged in as an Organiser!');
		// wait a bit, to make sure database is ready
		await new Promise(res => setTimeout(res, 1000));

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
