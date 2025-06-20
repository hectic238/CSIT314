// import dependencies

// express handles http related requests
const express = require('express');

// instance of express to handle routing
const router = express.Router();

// define that registeration and login should be decided in membercontroller.js file
const {register, login, getuserdetail, edituserdetails, getorganiserdetail, editorganiserdetails, getuserid} = require('../controllers/membercontroller');

// post api for registration
router.post('/member/register', register);

// post api to log in
router.post('/login', login);

// get user details
router.get('/user/:userid', getuserdetail);

// to edit user details
router.put('/user/:userid', edituserdetails);

// get organiser details
router.get('/organiser/:organiserid', getorganiserdetail);

// to edit organiser details
router.put('/organiser/:organiserid', editorganiserdetails);

// get user details
router.get('/user/getuserid/:email', getuserid);

module.exports = router;