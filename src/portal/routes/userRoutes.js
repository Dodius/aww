// \aww\src\portal\routes\userRoutes.js 

const express   = require('express');
const router    = express.Router();
const { ensureAuthenticatedOrRegister } = require('../middleware/authMiddleware');
const userService = require('../services/userService');

router.get('/', ensureAuthenticatedOrRegister, (req, res) => {
  // Now at this point, the user is either authenticated or has been silently registered
  // Continue with your logic here
  //console.log('user:',user);  
  console.log('/aww/src/portal/routes/userRoutes.js req.user:',req.user);  
  
  res.render('portal/profile', { user: req.user });
});
 
router.post('/update-username', async (req, res) => {
  console.log('/aww/src/portal/routes/userRoutes.js req.user:',req.user);
  console.log("Received update-username request with data:", req.body); 
  let newUsername = req.body.username;

  const result = await userService.updateUserName(req.user.id, newUsername);
    
  // Here you'd update the username in your database.
  // Once that's done, send a response back:

  res.json({ success: true, message: 'Username updated successfully' });
});

router.post('/update-avatar', async (req, res) => {
  let newAvatarSeed = req.body.avatarSeed;

  //avatar = '6.x/adventurer/svg?seed=' + hash.substring(0, 6);

  // Update the avatar seed in your database.
  // Once that's done, send a response back:
  const result = await userService.updateUserAvatar(req.user.id, newAvatarSeed);

  res.json({ success: true, message: 'Avatar updated successfully' });
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