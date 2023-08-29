// config/passportConfig.js
const LocalStrategy = require('passport-local').Strategy; 
const { getUserByUsername, createUser, getUserById } = require('../src/portal/services/userService');

function setupPassport(passport) {
  passport.use(new LocalStrategy({
    usernameField: 'username',
    passReqToCallback: true
  }, async (req, username, password, done) => {
    // Note: Password is ignored for silent registration
    let user = await getUserByUsername(username);
    if (!user) {
      // No user found, silently register user
      user = await createUser({ username });
    }
    
    return done(null, user);
  }));

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    // Fetch user from the database
    getUserById(id).then(user => {
      done(null, user);
    }).catch(err => {
      done(err, null);
    });
  });
}

module.exports = { setupPassport };
