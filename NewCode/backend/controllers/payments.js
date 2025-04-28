// create an instant of ticket from Ticket.js
const Ticket = require('../models/Ticket');

const authenticatetoken = require('../middleware/authorisationmiddleware');

const mongoose = require('mongoose');

// create new ticket
exports.registeruser = async (req, res) => {
	// required data for ticket creation
	const {eventid, userid, tickettype} = req.body;
	
	try {
		const eventObjId = new mongoose.Types.ObjectId(eventid);
		const userObjId = new mongoose.Types.ObjectId(userid);

		// create instance that holds new event details
		const newregistration = new Ticket ({
			"eventid": eventObjId,
			"userid": userObjId,
			"tickettype": tickettype
		});

		// save it
		await newregistration.save();

		// output result
		res.status(201).json({
			eventid: newregistration.eventid,
			userid: newregistration.userid,
			tickettype: newregistration.tickettype
		});
	}
	catch (error) {
		res.status(500).json({error: "could not register user, server error!"});
	}
};

// get specific ticket for user
exports.getuserspecificticket = async (req, res) => {
	// get event id
	const {eventid, userid} = req.params;
	
	try {	
		// get the ticket
		 
		const ticket = await Ticket.find({$and: [{"eventid": eventid}, {"userid": userid}]});

		if (!ticket) {
			return res.status(404).json({message: "Ticket not found, query error!"});
		}
		else if (ticket.length === 0) {
			return res.status(200).json({
				ticketexists: false,
				message: "No ticket, empty search query result!"
			});
		}
 
		// send results
		res.status(200).json({
			ticketexists: true,
			ticket: ticket
		});
	}
	catch (error) {
		res.status(500).json({error: 'Could not get ticket, server error!'});
	}
};

// update user ticket from General to VIP (only allowable change for user on user end
// edit event
exports.upgradeticket = async (req, res) => {
	// get the specific event id, user id we are editing
	const {eventid, userid} = req.params;

	try {
		const eventObjId = new mongoose.Types.ObjectId(eventid);
		const userObjId = new mongoose.Types.ObjectId(userid);

		// create instance of Ticket with details about a specific event and user
		const ticket = await Ticket.findOne({$and: [{"eventid": eventObjId}, {"userid": userObjId}]});

		// check that we got the ticket
		if (!ticket) {
			return res.status(404).json({error: "Ticket not found"});
		}

		// check if ticket is already vip
		if (ticket.tickettype == "VIP") {
			return res.status(400).json({error: "Ticket is already VIP"});	
		}

		// if not vip make it vip
		ticket.tickettype = "VIP"

		// save the updated event to the database
		const updateticket = await ticket.save();

		// send result
		res.status(200).json(updateticket);
	}
	catch (error) {
		res.status(500).json({error: "Could not edit ticket, server error!"});
	}
};

// get tickets for a specific event using its ID
exports.getticketbyid = async (req, res) => {
	// get the event id
	const {eventid} = req.params;
	
	try {	
		const objectId = new mongoose.Types.ObjectId(eventid);

		// get ticket with that eventid
		const ticket = await Ticket.find({"eventid": objectId}).populate('userid', 'name email');

		// send results
		res.json(ticket);
	}
	catch (error) {
		res.status(500).json({error: 'Could not get tickets for this event, server error!'});
	}
};

// delete ticket
exports.deleteticket = async (req, res) => {
	// get the specific ticket id we are deleting
	const {ticketid} = req.params;

	try {

		// create instance of Ticket with details about a specific user and event
		const ticket = await Ticket.findByIdAndDelete(ticketid);

		// send result
		res.json({message: 'Event deleted!'});
	}
	catch (error) {
		res.status(500).json({error: "Could not delete event, server error!"});
	}
};