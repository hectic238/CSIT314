// import dependencies

// express handles http related requests
const express = require('express');

// instance of express to handle routing
const router = express.Router();

// get backend for event on organiser side
const {announcementtoall, passwordtoone, severingemail} = require('../controllers/emailcontroller');

// to post announcement for all users under an event
router.post('/email/sendannouncement', announcementtoall);

// to post password for user in email
router.post('/email/sendpassword', passwordtoone);

// to post severing from event email to user
router.post('/email/severingemail', severingemail);

module.exports = router;