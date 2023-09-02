// server.js
const express   = require('express');
const session   = require('express-session');
const path      = require('path');
const http      = require('http');  
const socketIO  = require('socket.io'); 

const passport      = require('passport');
const bodyParser    = require('body-parser');
const cookieParser  = require('cookie-parser'); 

require('dotenv').config();
const authMiddleware  = require('./src/portal/middleware/authMiddleware');

const portalRoutes    = require('./src/portal/routes/portalRoutes');
const userRoutes      = require('./src/portal/routes/userRoutes');
const dinoGameRoutes  = require('./src/DinoGame/routes/dinoGameRoutes');

const { setupPassport } = require('./config/passportConfig'); 

const app = express();

// Middleware setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true
}));
 

// Passport initialization
app.use(passport.initialize());
app.use(passport.session());  // Note the change here
setupPassport(passport);

app.use(authMiddleware.ensureAuthenticatedOrRegister);      // middleware -> Next() ->

// app.use((req, res, next) => {                             
//   console.log(req.session);
//   next();
// });

// end of Middleware setups

// Serve static assets for each game
app.use('/', express.static(path.join(__dirname, 'public', 'portal')));
app.use('/dino', express.static(path.join(__dirname, 'public', 'DinoGame')));


// Routes 
app.use('/profile', userRoutes);
app.use('/dino', dinoGameRoutes);
app.use('/', portalRoutes); // Main portal should be at the bottom to avoid overlapping routes

// View engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));



// Create an HTTP server and wrap the Express app
const server = http.createServer(app);   

// Attach Socket.IO to the HTTP server
const io = socketIO(server);

// Listen to Socket.IO connection events
io.on('connection', (socket) => {
  console.log('User connected');
});

// Starting the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server started on port ${PORT}`));
