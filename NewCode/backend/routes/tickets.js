// import dependencies

// express handles http related requests
const express = require('express');

// instance of express to handle routing
const router = express.Router();

// get backend for event on organiser side
const {registeruser, getuserspecificticket, upgradeticket, getticketbyid, deleteticket} = require('../controllers/payments');

// to get user ticket
router.get('/tickets/user/:eventid/:userid', getuserspecificticket);

// to register user for event
router.post('/tickets/register', registeruser);

// to upgrade user ticket for event
router.put('/tickets/upgradetovip/:eventid/:userid', upgradeticket);

// get all tickets for an event
router.get('/tickets/getbyid/:eventid', getticketbyid);

// to delete user ticket for event
router.delete('/tickets/deleteticket/:ticketid', deleteticket);

module.exports = router;