// use mongoose to populate database
const mongoose = require('mongoose');

// use faker
const faker = require('faker');

// use dot end to get mong db url from the file
require('dotenv').config();

// use bcrypt to hash password
const bcrypt = require('bcrypt');

// get models for the Models folder
// create an instant of organiser from Organiser.js
const Organiser = require('../models/Organiser');

// create an instant of user from User.js
const User = require('../models/User');

// create an instant of event from Event.js
const Event = require('../models/Event');

// create an instant of ticket from Ticket.js
const Ticket = require('../models/Ticket');

const MONGO_URI = process.env.MONGO_URI;

async function seed() {
	try {
		// connect to the database
		await mongoose.connect(MONGO_URI);

		console.log("Connected to MongoDB");

		// clear the database from previous entries
		await Promise.all([
			Ticket.deleteMany({}),
			Event.deleteMany({}),
			User.deleteMany({}),
			Organiser.deleteMany({})			
		]);

		console.log("MongoDB cleared");

		// create organisers
		const organisers = [];
		for (let i = 0; i < 10; i++) {
			// this function is from https://www.geeksforgeeks.org/how-to-generate-random-password-in-react/
			// used to generate a password, I did not know how to do it using library
			// I updated it a bit to be fully automated in background
			const generatepassword = () => {
				let charset = "";
				let newPassword = "";

				charset += "!@#$%^&*()";
				charset += "0123456789";
				charset += "abcdefghijklmnopqrstuvwxyz";
				charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

				for (let i = 0; i < 23; i++) {
					newPassword += charset.charAt(Math.floor(Math.random() * charset.length));
				}

				return newPassword;
			};

			// generate a random password
			const password = await generatepassword();

			// create hashed password
			const hashedpassword = await bcrypt.hash(password, 10);

			// create new organiser details
			const organiser = new Organiser({
				name: faker.name.findName(),
				email: faker.internet.email().toLowerCase(),
				password: hashedpassword
			});

			// send to database
			organisers.push(await organiser.save());
		}
		console.log("Organisers added");

		// create users
		const users = [];
		for (let i = 0; i < 50; i++) {
			// this function is from https://www.geeksforgeeks.org/how-to-generate-random-password-in-react/
			// used to generate a password, I did not know how to do it using library
			// I updated it a bit to be fully automated in background
			const generatepassword = () => {
				let charset = "";
				let newPassword = "";

				charset += "!@#$%^&*()";
				charset += "0123456789";
				charset += "abcdefghijklmnopqrstuvwxyz";
				charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

				for (let i = 0; i < 23; i++) {
					newPassword += charset.charAt(Math.floor(Math.random() * charset.length));
				}

				return newPassword;
			};

			// generate a random password
			const password = await generatepassword();

			// create hashed password
			const hashedpassword = await bcrypt.hash(password, 10);

			// create new organiser details
			const user = new User({
				name: faker.name.findName(),
				email: faker.internet.email().toLowerCase(),
				password: hashedpassword
			});

			// send to database
			users.push(await user.save());
		}
		console.log("Users added");

		// create events data
		const eventtype = ["Corporate Conference", "Seminar", "Product Launch", "Trade Show", "Workshop", "Networking", "Music Festival", "Charity Event", "Community Event"];
		const events = [];

		for (let i = 0; i < 2; i++) {
			// get 2 events for each organiser. totaling 20 events.
			for (let organiser of organisers) {
				// generate random hour and minute
				const hour = String(Math.floor(Math.random() * 24)).padStart(2, '0');
				const minute = String(Math.floor(Math.random() * 60)).padStart(2, '0');

				const event = new Event({
					name: faker.lorem.words(3),
					date: faker.date.future().toISOString().split('T')[0],
					time: (hour + ":" + minute),
					location: faker.address.city(),
					type: faker.helpers.randomize(eventtype),
					description: faker.lorem.sentences(2),
					generalprice: faker.datatype.number({min: 0, max: 100}),
					vipprice: faker.datatype.number({min: 101, max: 1000}),
					organiser: organiser._id
				});
				// save to the database
				events.push(await event.save());
			}
		}
		console.log("Events added");

		for (let user of users) {
			// create a list of events already selected
			// so we do not duplicate tickets for the same event
			let usedevent = new Set();

			// holds how many ticket for this user
			let ticketcount = 0;

			// for each user in the users list
			while (ticketcount < 10) {
				// register each user for 10 events

				// get a random event id
				const event = faker.helpers.randomize(events);

				// make sure it was not used before
				if (usedevent.has(event._id.toString())) {
					// do nothing, event was already selected
					// try again
					continue;
				}
				else {
					const ticket = new Ticket({
						eventid: event._id,
						userid: user._id,
						tickettype: faker.helpers.randomize(['VIP', 'General'])
					});
					// save the ticket
					await ticket.save();

					// add it to the list of already used events
					usedevent.add(event._id.toString());

					// increase the ticket count
					ticketcount++;
				}
			}
		}
		console.log("Tickets added");

		// exit the current operation
		process.exit(0);
	}
	catch (error) {
		console.error("Could not generate data", error);
		process.exit(1);
	}
}

seed();
