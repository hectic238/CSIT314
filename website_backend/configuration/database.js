// import dependencies

// mongoose handles database related requests
const mongoose = require('mongoose');

// dot env to read the .env file
const dotenv = require('dotenv');

// load process.env
require('dotenv').config();

const connectdb = async() => {
	console.log('Connecting to MongoDB');
	try {
		await mongoose.connect(process.env.MONGO_URI);

		console.log('Connected to MongoDB');
	}
	catch (error) {
		console.error('Connection to MongoDB failed');
		process.exit(1);
	}
};

module.exports = connectdb;