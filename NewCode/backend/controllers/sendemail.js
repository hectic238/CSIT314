// declare nodemailer library to be able to send emails
const nodemailer = require('nodemailer');


// get .env file
require('dotenv').config();

// transporter to send email from website mail account
const transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: process.env.EMAIL_USERNAME,
		password: process.env.EMAIL_PASSWORD
	}
});

// email all under an event
async function SendCollectiveAnnouncement(eventname, attendeeemails, message) {
	try {
		for (const email of attendeeemails) {
			// for each email in the list
			// send an email, and wait for the response
			await transporter.sendMail({
				from: '"Event Manager" <${process.env.EMAIL_USERNAME}>',
				to: email,
				subject: 'Announcement for ${eventname}',
				text: message
			});
		}
		console.log('Emails sent!');
	}
	catch (error) {
		console.log('Could not send emails');
		throw error;
	}
}

// send email to a user with their password
async function SendUserPassword(username, useremail, password) {
	try {
		const message = '
			Hello ${username},

			An organiser added you to the attendee list of an event.
			Please navigate to http://localhost:3000/user-portal.
			User your email, and this password ${password} to login.

			Kind regards,
			Event Manager Team';

		await transporter.sendMail({
			from: '"Event Manager" <${process.env.EMAIL_USERNAME}>',
			to: useremail,
			subject: 'Event Manger login',
			text: message
		});
		console.log('Email sent!');
	}
	catch (error) {
		console.log('Could not send email');
		throw error;
	}

}

module.export = {SendCollectiveAnnouncement, SendUserPassword};