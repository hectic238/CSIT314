// import dependencies

// mongoose handles database related requests
const mongoose = require('mongoose');

// define the type of data required to describe an organiser
const organiserschema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		unique: true,
		required: true
	},
	password: {
		type: String,
		required: true
	},
});

// export the schema for organiser
module.exports = mongoose.model('Organiser', organiserschema);