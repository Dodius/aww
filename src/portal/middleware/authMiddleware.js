// \aww\src\portal\middleware\authMiddleware.js  
const { uniqueNamesGenerator, adjectives, colors, animals } = require('unique-names-generator'); 
const userService = require('../services/userService');
const crypto = require('crypto');

async function ensureAuthenticatedOrRegister(req, res, next) {
	if (req.isAuthenticated()) {
	  return next();
	} else {

		//------------ Generate unique name
		const randomName = uniqueNamesGenerator({ 
			dictionaries: [adjectives, colors, animals],
			separator: ' ',
			style: 'capital' 
		});

		//------------ Create new avatar in https://api.dicebear.com/6.x/adventurer/svg?seed=Trouble
		function generateSeedFromDate() {			
			const timestamp = new Date().toISOString().replace(/[-T:\.Z]/g, "");
    		return crypto.createHash('md5').update(timestamp).digest('hex');
		}
		const hash = generateSeedFromDate();
		avatar = '6.x/adventurer/svg?seed=' + hash.substring(0, 6);

	  // Store this user in the database
	  const newUser = await userService.createUser({ username: randomName, avatar: avatar });
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