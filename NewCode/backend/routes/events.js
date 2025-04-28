// import dependencies

// express handles http related requests
const express = require('express');

// instance of express to handle routing
const router = express.Router();

// get backend for event on organiser side
const {createevent, getorganiserevents, editevent, geteventbyid, deleteevent, getallevents} = require('../controllers/eventcontroller');

// to create event
router.post('/events/organiser', createevent);

// to get all events
router.get('/events/user', getallevents);

// to get organiser event
router.get('/events/organiser', getorganiserevents);

// to get event details
router.get('/events/member/:eventid', geteventbyid);

// to edit event
router.put('/events/organiser/:eventid', editevent);

// to delete event
router.delete('/events/organiser/:eventid', deleteevent);

module.exports = router;