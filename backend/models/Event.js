// import dependencies

// mongoose handles database related requests
const mongoose = require('mongoose');

// define the type of data required to describe an event
const eventschema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	date: {
		type: String,
		required: true
	},
	time: {
		type: String,
		required: true
	},
	location: {
		type: String,
		required: true
	},
	type: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	generalprice: {
		type: Number,
		required: true
	},
	vipprice: {
		type: Number,
		required: true
	},
	organiser: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Organiser',
		required: true
	}
});

// export the schema for event
module.exports = mongoose.model('Event', eventschema);