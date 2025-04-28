// create an instant of event from Event.js
const Event = require('../models/Event');

// create new event
exports.createevent = async (req, res) => {
	// required data for event creation
	const {name, date, time, location, type, description, generalprice, vipprice, organiser} = req.body;

	try {
		// create instance that holds new event details
		const newevent = new Event ({name, date, time, location, type, description, generalprice, vipprice, organiser});

		// save it
		await newevent.save();

		// output result
		res.status(201).json(newevent);
	}
	catch (error) {
		res.status(500).json({error: "could not create an event, server error!"});
	}
};

// get events created by an organiser
exports.getorganiserevents = async (req, res) => {
	// get the organiser id
	const {organiserid} = req.query;
	
	try {	
		// get events that were created by a specific organiserid
		const events = await Event.find({organiser: organiserid});

		// send results
		res.json(events);
	}
	catch (error) {
		res.status(500).json({error: 'Could not get Organiser events, server error!'});
	}
};

// get details about a specific event using its ID
exports.geteventbyid = async (req, res) => {
	// get the event id
	const {eventid} = req.params;
	
	try {	
		// get event with that eventid
		const event = await Event.findById(eventid);

		// send results
		res.json(event);
	}
	catch (error) {
		res.status(500).json({error: 'Could not get Organiser events, server error!'});
	}
};

// edit event
exports.editevent = async (req, res) => {
	// get the specific event id we are editing
	const {eventid} = req.params;

	// required data for event editing
	const {name, date, time, location, type, description, generalprice, vipprice} = req.body;

	try {
		// create instance of Event with details about a specific event
		const event = await Event.findByIdAndUpdate (eventid);

		// check that we got the event
		if (!event) {
			return res.status(404).json({error: "Event not found"});
		}

		// update event with the new details
		event.name = name || event.name;
		event.date = date || event.date;
		event.time = time || event.time;
		event.location = location || event.location;
		event.type = type || event.type;
		event.description = description || event.description;
		event.generalprice = generalprice || event.generalprice;
		event.vipprice = vipprice || event.vipprice;

		// save the updated event to the database
		const updatedevent = await event.save();

		// send result
		res.json(updatedevent);
	}
	catch (error) {
		res.status(500).json({error: "Could not edit event, server error!"});
	}
};

// delete event
exports.deleteevent = async (req, res) => {
	// get the specific event id we are deleting
	const {eventid} = req.params;

	try {
		// delete it
		await Event.findByIdAndDelete(eventid);

		// send result
		res.json({message: 'Event deleted!'});
	}
	catch (error) {
		res.status(500).json({error: "Could not delete event, server error!"});
	}
};

// get details about all events available in the database
exports.getallevents = async (req, res) => {
	try {
		// create instance of Event that holds details about the events found
		const events = await Event.find();

		res.json(events);
	}
	catch (error) {
		res.status(500).json({error: 'Could not get events'});
	}
};
