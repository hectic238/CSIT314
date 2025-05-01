// import dependencies

// dotenv to run .env
const dotenv = require('dotenv');

// use file process.env
dotenv.config();

// express handles http related requests
const express = require('express');

// cors allow frontend to request to backend
const cors = require('cors');

// OAuth2 Client from googleapis
const { google } = require('googleapis');

// route to member authentication
const authenticationroutes = require('./routes/authentication');

// route to event
const eventroutes = require('./routes/events');

// route to tickets
const ticketsroutes = require('./routes/tickets');

// route to emails
const emailsroutes = require('./routes/emails');

// route to the database
const connectdb = require('./configuration/database');

// setup express app
const app = express();

// initialise the database
connectdb();

// allow app to use cors for middleware
app.use(cors());

// allow app to use express
app.use(express.json());

// define route files and the folders they are in
app.use('/api', authenticationroutes);
app.use('/api', eventroutes);
app.use('/api', ticketsroutes);
app.use('/api', emailsroutes);

// define port 5000 to host backend on
const PORT = process.env.PORT || 5000;

// display the port
app.listen(PORT, () => {
	console.log('port is : ' + PORT);
});