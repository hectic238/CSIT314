// use axios to run http in the backend (for testing purposes)
const axios = require('axios');

async function SystemTest() {
	try {
		// Register as an organiser
		const registerorganiser = await axios.post(`http://localhost:5000/api/member/register`, {
			name: 'Organisertest',
			email: 'eventmanagermanagement@gmail.com',
			password: 'Organisertest2025',
			role: 'Organiser'
		});

		console.log('Registered as an Organiser!');
		// wait a bit, to make sure database is ready
		await new Promise(res => setTimeout(res, 1000));

		// login as an organiser
		const loginorganiser = await axios.post(`http://localhost:5000/api/login`, {
			email: 'eventmanagermanagement@gmail.com',
			password: 'Organisertest2025',
			role: 'Organiser'
		});

		// save organiser logged in details
		let data = loginorganiser.data;
		const token = data.token;
		const organiserid = data.member.memberid;
		const role = data.member.role;

		console.log('Logged in as an Organiser!');
		// wait a bit, to make sure database is ready
		await new Promise(res => setTimeout(res, 1000));

		// create an event
		const createevent = await axios.post(`http://localhost:5000/api/events/organiser`,
			{
				name: "Great war re-enactment",
				date: "2026-05-22",
				time: "12:36",
				location: "Kensas City",
				type: "Camp",
				description: "wear your favourite WW2 clothes, and grab your props. Head down to Kensas city to re-enact the war. Bring a tent it is a 3 day camp!",
				generalprice: 30,
				vipprice: 300,
				organiser: organiserid
			},
			{
				headers: {
					Authorization: `Bearer ${token}`
				}
			}
		);

		console.log('Created an event!');
		// wait a bit, to make sure database is ready
		await new Promise(res => setTimeout(res, 1000));

		// get all organiser's event
		const getallorganiserevents = await axios.get(`http://localhost:5000/api/events/organiser`,
			{
				params: {
					organiserid: organiserid
				},
				headers: {
					Authorization: `Bearer ${token}`
				}
			}
		);

		// save the event id
		data = getallorganiserevents.data;
		const eventid = data[0]._id;

		console.log('Got all the organise"r events!');
		// wait a bit, to make sure database is ready
		await new Promise(res => setTimeout(res, 1000));

		// edit an event
		const editevent = await axios.put(`http://localhost:5000/api/events/organiser/${eventid}`,
			{
				name: "Great war re-enactment",
				date: "2027-05-22",
				time: "14:36",
				location: "Germany",
				type: "Camp",
				description: "wear your favourite WW2 clothes, and grab your props. Head down to Kensas city to re-enact the war. Bring a tent it is a 3 day camp!",
				generalprice: 30,
				vipprice: 900
			},
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);

		console.log('Edited an event!');
		// wait a bit, to make sure database is ready
		await new Promise(res => setTimeout(res, 1000));

		// Register a user
		const registeruser = await axios.post(`http://localhost:5000/api/member/register`, {
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
