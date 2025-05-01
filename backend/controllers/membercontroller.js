// jwt to issue token
const jwt = require('jsonwebtoken');

// bcrypt handles hashing for password
const bcrypt = require('bcryptjs');

// create an instant of user from User.js
const User = require('../models/User');

// create an instant of organiser from Organiser.js
const Organiser = require('../models/Organiser');

// registering members (either user or organiser)
exports.register = async (req, res) => {
	// information needed to register
	const {name, email, password, role} = req.body;

	let MemberModel;

	// based on the register page, they are either assigned to be organiser, or user
	if (role == 'User') {
		MemberModel = User;
	}
	else if (role == 'Organiser') {
		MemberModel = Organiser;
	}
	else {
		return res.status(400).json({error: "We are not supposed to get any other role, something went horribly wrong!"});
	}
	
	
	try {
		// check if email is not linked to another member
		const memberexists = await MemberModel.findOne({email});

		if (memberexists) {
			return res.status(409).json({error: "Email already in use, try logging in!"});
		}

		// hash the password using bcrypt
		const salt = await bcrypt.genSalt(10);
		const hashedpassword = await bcrypt.hash(password, salt);

		// create new instant of member to store it
		const newmember = new MemberModel({name, email, password: hashedpassword});
		
		// save to the database
		await newmember.save();
		
		// check if it is saved
		res.status(201).json({message: "Registration complete"});
	}
	catch (error) {
		// display what went wrong
		res.status(500).json({error: "could not register user, server error"});	
	}
};

// member log in
exports.login = async (req, res) => {
	// information needed to login
	const {email, password, role} = req.body;

	let MemberModel;

	// based on the login page, they are either assigned to be organiser, or user
	if (role == 'User') {
		MemberModel = User;
	}
	else if (role == 'Organiser') {
		MemberModel = Organiser;
	}
	else {
		return res.status(400).json({error: "We are not supposed to get any other role, something went horribly wrong!"});
	}
	
	
	try {
		// check if email is not linked to another member
		const memberexists = await MemberModel.findOne({email});

		// could not find the account
		if (!memberexists) {
			return res.status(400).json({error: "Email does not exist"});
		}

		// check if password matches the one stored
		const ismatch = await bcrypt.compare(password, memberexists.password);

		// password do not match
		if (!ismatch) {
			return res.status(400).json({error: "Incorrect password"});
		}

		// prepare to create token with memberid and role
		const payload = {
			memberid: memberexists._id,
			role
		};

		// create the token
		const token = jwt.sign(
			payload,
			process.env.JWT_SECRET,
			{expiresIn: "1h"}
		);


		res.json({
			token,
			member: {
				role,
				memberid: memberexists._id
			}	
		});
	}
	catch (error) {
		// display what went wrong
		res.status(500).json({error: "could not login user, server error"});	
	}
};

// get details about a user
exports.getuserdetail = async (req, res) => {
	const {userid} = req.params;
	
	try {	
		// get user with that userid
		const user = await User.findById(userid);

		// send results
		res.json(user);
	}
	catch (error) {
		res.status(500).json({error: 'Could not get User details, server error!'});
	}
};

// get details about a user
exports.getuserid = async (req, res) => {
	const {email} = req.params;
	
	try {			
		// get user with that email
		const user = await User.findOne({email});

		// send results
		res.json({ userid: user._id });
	}
	catch (error) {
		res.status(500).json({error: 'Could not get User details, server error!'});
	}
};