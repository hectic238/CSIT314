// import dependencies

// mongoose handles database related requests
const mongoose = require('mongoose');

// make the structure user
const userschema = new mongoose.Schema({
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

module.exports = mongoose.model('User', userschema);