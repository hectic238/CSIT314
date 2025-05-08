// send emails through google servers
const {google} = require('googleapis');

// create an instant of user from User.js
const User = require('../models/User');

// create an instant of ticket from Ticket.js
const Ticket = require('../models/Ticket');

// create an instant of event from Event.js
const Event = require('../models/Event');

const mongoose = require('mongoose');

// get .env file
require('dotenv').config();

// OAuth2 client setup
const OAuth2 = google.auth.OAuth2;
const oauth2Client = new OAuth2(
	process.env.CLIENT_ID,
	process.env.CLIENT_SECRET,
	process.env.REDIRECT_URI
);

// set credentials
oauth2Client.setCredentials({
	access_token: process.env.ACCESS_TOKEN,
	refresh_token: process.env.REFRESH_TOKEN
});

const gmail = google.gmail({version: 'v1', auth: oauth2Client});

// encode message before sending
function encodeMessage(message) {
	return Buffer.from(message).toString('base64url');
}

// sending email using gmail api
const sendEmail = async (to, subject, message) => {
	const rawMessage = [
		`From: 'Event Manager' <${process.env.EMAIL_USERNAME}>`,
		`To: ${to}`,
		`Subject: ${subject}`,
		`MIME-Version: 1.0`,
		`Content-Type: text/plain; charset=UTF-8`,
		``,
		message
	].join('\n');

	const encodedmessage = encodeMessage(rawMessage);

	try {
		const res = await gmail.users.messages.send({
			userId: 'me',
			requestBody: {
				raw: encodedmessage
			}
		});
		return res.data;
	} catch (error) {
		throw new Error('could not send email: ' + error.message);
	}
};

// send to all attendees
exports.announcementtoall = async (req, res) => {
	const {eventid, message} = req.body;

	try {
		const objectId = new mongoose.Types.ObjectId(eventid);

		// get ticket with that eventid
		const ticket = await Ticket.find({"eventid": objectId}).populate('userid', 'name email');

		const event = await Event.findById(objectId);

		const emails = ticket.map(ticket => ticket.userid.email);

		for (const email of emails) {
			// for each ticket in the list
			// send an email to the user, and wait for the response
			await sendEmail(email, `Announcement for ${event.name}`, message);
		}
		// success
		res.json("announcement sent!");
	}
	catch (error) {
		// fail
		res.status(500).json("Could not send email, server error");
	}
};

// send to 1 attendee
exports.passwordtoone = async (req, res) => {
	// get user id and user password from frontend
	const {userid, userpassword} = req.body;
	try {
		// get user name, and email from the database
		const user = await User.findById(userid);

		const message = `
			Hello ${user.name},

			An organiser added you to the attendee list of an event.
			Please navigate to http://localhost:3000/user-portal.
			Use your email, and this password ${userpassword} to login.

			Kind regards,
			Event Manager Team
		`;

		await sendEmail(user.email, 'Event Manager login', message);

		// success
		res.json("email sent!");
	}
	catch (error) {
		// fail
		res.status(500).json("Could not send email, server error");
	}
};
