// \aww\src\portal\middleware\authMiddleware.js  
const { uniqueNamesGenerator, adjectives, colors, animals } = require('unique-names-generator'); 
const userService = require('../services/userService');

async function ensureAuthenticatedOrRegister(req, res, next) {
	if (req.isAuthenticated()) {
	  return next();
	} else {
	  // Generate unique name
	  const randomName = uniqueNamesGenerator({ 
		dictionaries: [adjectives, colors, animals],
		separator: ' ',
		style: 'capital' 
	  });

	  // Store this user in the database
	  const newUser = await userService.createUser({ username: randomName });
	  if (newUser) {
		// Log the user in for the session using Passport
		req.login(newUser, (err) => {
		  if (err) {
			console.error('Error during silent registration:', err);
			res.redirect('/');  // Handle error
		  }
		  return next();
		});
	  } else {
		console.error('Error creating new user during silent registration');
		res.redirect('/');  // Handle error
	  }
	}
};
module.exports = { ensureAuthenticatedOrRegister };