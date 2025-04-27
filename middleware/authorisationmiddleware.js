// import dependencies
// jwt to handle token related tasks
const jwt = require('jsonwebtoken');

// get the secret code from the .env file
const secret = process.env.JWT_SECRET;

// handling authorisation
// just to ensure they are not using the link directly without logging in (bypassing security)
const authenticatetoken = (req, res, next) => {
	const authenticationheader = req.headers['authorization'];

	// check it starts with bearer
	if (!authenticationheader || (!authenticationheader.startsWith('Bearer '))) {
		return res.status(401).json({error: "No token provided!"});
	} 

	// remove bearer to only get token
	const token = authenticationheader.split(' ')[1];

	try {
		// verify token
		const decoded = jwt.verify(token, secret);

		// add decoded token data
		req.member = decoded;

		// go to route handler
		next();
	}
	catch (error) {
		res.status(401).json({error: "Invalid token!"});
	}
};

module.exports = authenticatetoken;