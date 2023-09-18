// server.js
const express   = require('express');
const session   = require('express-session');
const path      = require('path');
const http      = require('http');  
const socketIO  = require('socket.io'); 

const passport      = require('passport');
const cookieParser  = require('cookie-parser'); 

require('dotenv').config();
const authMiddleware  = require('./src/portal/middleware/authMiddleware');

const portalRoutes    = require('./src/portal/routes/portalRoutes');
const userRoutes      = require('./src/portal/routes/userRoutes');
const dinoGameRoutes  = require('./src/DinoGame/routes/dinoGameRoutes');
const dinoController  = require('./src/DinoGame/controllers/dinoController');

const { getUserById } = require('./src/portal/services/userService');

const { setupPassport } = require('./config/passportConfig'); 

const app = express();

console.log("[Server] Setting up middleware...");
// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
const sessionMiddleware = session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
});

app.use(sessionMiddleware);
 
// Add logging after session middleware to debug
app.use((req, res, next) => {
  debugSession('Express Middleware before Passport', req.session);
  next();
});
console.log("[Server] Middleware setup complete.");


console.log("[Server] Initializing passport...");
// Passport initialization
app.use(passport.initialize());
app.use(passport.session());  // Note the change here
setupPassport(passport);

//  your Express req.session and Socket.IO's socket.request.session are synchronized - really?

app.use(authMiddleware.ensureAuthenticatedOrRegister);      // middleware -> Next() ->
// have to look for a session in DB...

console.log("[Server] Passport initialized.");
// app.use((req, res, next) => {                             
//   console.log(req.session);
//   next();
// });

// end of Middleware setups

// Add logging after session middleware to debug
app.use((req, res, next) => {
  debugSession('Express Middleware after passport and ensure()', req.session);
  next();
});

console.log("[Server] Setting up routes...");
// Serve static assets for each game
app.use('/', express.static(path.join(__dirname, 'public', 'portal')));
app.use('/dino', express.static(path.join(__dirname, 'public', 'DinoGame')));


// Routes 
app.use('/profile', userRoutes);
app.use('/dino', dinoGameRoutes);
app.use('/', portalRoutes); // Main portal should be at the bottom to avoid overlapping routes
console.log("[Server] Routes setup complete.");

console.log("[Server] Setting up view engine...");
// View engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
console.log("[Server] View engine setup complete.");

console.log("[Server] Setting up Socket.IO...");
// Create an HTTP server and wrap the Express app
const server = http.createServer(app);   

// Attach Socket.IO to the HTTP server
const io = socketIO(server);
const dinoNamespace = io.of('/dino');  // Using a '/dino' namespace for organization

dinoNamespace.use((socket, next) => {
  sessionMiddleware(socket.request, {}, () => {
    debugSession('Socket.IO Middleware', socket.request.session);  // Debug the session here
    const userId = socket.request.session.passport ? socket.request.session.passport.user : null;
    
    if (userId) {
      // Use the function imported from userService
      getUserById(userId)     // Load the user from the database here and attach to socket 
        .then((user) => {
          if (user) {
            socket.user = user;
            console.log('Server.js: dinoNamespace.use() getUserById:\n socket.user: \x1b[1;33m' , socket.user , '\x1b[0m \n'  );  
            next();
          } else {
            console.log('User not found'); 
            next(new Error('User not found'));
          }
        })
        .catch((err) => {
          console.error('Failed to get user:', err);
          next(new Error('Failed to attach user to socket'));
        });
    } else {
      console.log('No user ID in session'); 
      next(new Error('No user ID in session'));
    }
  });
});

console.log("[Server] in delegate setup complete.");


console.log("[Server] Setting up Socket.IO...");
// Attach the controller's connection handler to the Dino namespace
dinoNamespace.on('connection', (socket) => {
  console.log("Server.js: New client connected, Is socket defined here?", !!socket); 
  //socket.emit('updateUserList', {"id":"test","username": "test"});

  // dinoNamespace.emit('updateUserList', 
  //   [
  //     {"id":"test1","username": "test1"},
  //     {"id":"test2","username": "test2"},
  //     // ... more users
  //   ]); // for testing

  dinoController.handleConnection(dinoNamespace, socket);
});
console.log("[Server] Dino delegate setup complete.");

// Starting the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server started on port ${PORT}`));






// Create a debugging function to log the session
const debugSession = (label, session) => {
  console.log(`[${label}] Session ID: ${session.id}`);
  console.log(`[${label}] Passport data:`, session.passport);
};