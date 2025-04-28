// import dependencies

// mongoose handles database related requests
const mongoose = require('mongoose');

const ticketschema = new mongoose.Schema({
	eventid: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Event',
		required: true
	},
	userid: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	tickettype: {
		type: String,
		enum: ['VIP', 'General'],
		required: true
	}
});

module.exports = mongoose.model('Ticket', ticketschema);