// \aww\src\portal\routes\userRoutes.js 

const express = require('express');
const router = express.Router();
const { ensureAuthenticatedOrRegister } = require('../middleware/authMiddleware');

router.get('/', ensureAuthenticatedOrRegister, (req, res) => {
  // Now at this point, the user is either authenticated or has been silently registered
  // Continue with your logic here
  //console.log('user:',user);  
  console.log('req.user:',req.user);  
  
  res.render('portal/profile', { user: req.user.username });
});

module.exports = router;

/*
if (req.isAuthenticated()) {
  // Fetch more user details if necessary, then render or send the profile data
  res.send(`Hello ${req.user.username}! Here's your profile.`);
} else {
  res.redirect('/'); // Redirect to main portal if not authenticated
}
*/