//D:\Games\Unity\Drago\GPT-Sep-Fold\aww\src\DinoGame\controllers\dinoController.js 

// Import any required modules and services you'll be using
const colors        = require('../../portal/services/ansiColors');
const lobbyService  = require('../services/lobbyService');  
const gameService   = require('../services/gameService');  // Your game service to handle logic

console.log('required lobbyService=', lobbyService);


// Utility function to save session
function saveSessionData(sessionData, gameId) {
  sessionData.gameId = gameId;
  sessionData.save();
}

const handleConnection = function(socket) { 
  console.log(`${colors.ctx_BrCyan} dinoController.js:${colors.ctx_Reset}  User \x1b[33m ${socket.id} \x1b[0m connected to the Dino namespace in .js`);
  
  const sessionData = socket.request.session;
  console.log('sessionData ===> \n',sessionData);

  let roomId = null;  // Declare roomId here

  socket.on('hostGame', (data) => {
    console.log(`User \x1b[33m ${socket.id} \x1b[0m sent hostGame request`)
     
    // Call the new createRoom method from gameService.js
    const newRoom = lobbyService.createGame({ gameName: data.gameName });
    
    // Do something with the new room, like adding it to the player's session or emitting a 'roomCreated' event
    socket.emit('hostGameCreated', { gameId: newRoom.id });
  });

  socket.on('createAndJoinGame', (data) => {
    console.log(`User User \x1b[33m ${socket.id} \x1b[0m sent \x1b[36m createAndJoinGame \x1b[0m`)
    const newRoom = lobbyService.createRoom(data);  // Assuming createRoom takes the necessary data and returns new room information
    
    saveSessionData(sessionData, roomId);

    socket.join(newRoom.id);  // Join the newly created room
    socket.emit('localGameCreated', { gameId: newRoom.id });
  });


  // Handler for when a user joins the game
  socket.on('joinGame', (data) => {
    console.log('User joined Dino game:', data);

    roomId = data.gameId;  // Update roomId here

    saveSessionData(sessionData, roomId);

    console.log('User wants to store Session after "join"  sessionData.gameId:', sessionData.gameId);

    
    // Initialize a game room, add the player, etc. (your custom logic)
    const room    = gameService.initializeGameRoom(data.gameId);
    const player  = gameService.addPlayerToRoom(data.username, room);
 
    //const room = joinRoom(data.gameId, socket.id);  // Assuming joinRoom takes gameId and socketId, joins the room, and returns room information

    if (room) {
      socket.join(room.id);  // Socket joins the room
      socket.emit('gameJoined', { room, player });   //{ gameId: room.id });
      socket.to(room.id).emit('playerJoined', { playerId: socket.id });  // Notify others in the room
      // You can also broadcast game state to all clients in this room
      // socket.broadcast.to(data.gameId).emit('updateGameState', room);
    } else {
      socket.emit('joinError', 'Could not join game');  // Or handle error however you like
    }
  });
 
  // When a user wants to rejoin a game
  socket.on('rejoinGame', (data) => {
    console.log('User wants to re-join the Dino game:', data);
    console.log('User wants to re-join the Dino game with sessionData.gameId:', sessionData.gameId);
    console.log('User wants to re-join the Dino game with sessionData.passport.user:', sessionData.passport.user);

    // Access gameId from the session
    const gameId = sessionData.gameId;

    if (gameId) {
      // Try to initialize or find the existing room
      const room = gameService.initializeGameRoom(gameId);
      if (room) {
        socket.join(room.id);
        // Additional logic to sync game state or notify other players
      }
    } else {
      console.log('Could not rejoin game', data);
      socket.emit('rejoinError', 'Could not rejoin game');  // Or handle error however you like
    }
  });

  // Handler for jump event
  socket.on('jump', (data) => {
    console.log('User jumped in Dino game:', data);

                    // // Perform jump logic (update player state, etc.)
                    // const updatedGameState = gameService.performJump(data.username, data.gameId);

                    // // Notify the client that the jump was successful
                    // socket.emit('jumpSuccess', updatedGameState);

    // Optionally, broadcast updated game state to all clients in the room
    // socket.broadcast.to(data.gameId).emit('updateGameState', updatedGameState);
  });

  // ... any other game-specific events you need to handle

  // Handler for disconnection
  socket.on('disconnect', () => {
    console.log(`${colors.ctx_BrCyan} dinoController.js:${colors.ctx_Reset}  User \x1b[33m ${socket.id} \x1b[0m disconnected from Dino game`);
    
    // Handle disconnection logic (remove player, clean up, etc.)
    if (roomId) {
      gameService.handleDisconnection(roomId, socket.id);
    }
  });
};

const showPublicDisplay = (req, res) => { 
  const gameId = req.params.gameId;
  // Logic for public display
  res.render('DinoGame/DinoPublicDisplay', {
      title: `Public Display for Game ${gameId}`,
      gameId: gameId,
      // additional data
  });
};
// Similar methods for other display types


// Barmen start the Host and shows the URL barcoded to any visitors
const showHostDashboard = (req, res) => {
  const gameId = req.params.gameId;

  console.log('dinoGameRoutes.js: showHostDashboard(): \n gameID: \x1b[1;33m' , gameId,
              '\x1b[0m \n req.user:  ' , req.user ,
              '\n req.isAuthenticated()=' , req.isAuthenticated() );  

  // Scenario 1: Validate if the game already exists
  if (lobbyService.gamesList.has(gameId)) {
    const gameData = lobbyService.gamesList.get(gameId);
    return res.render('DinoGame/DinoHostDashboard.ejs', { 
      gameData,
      title: `Host Dashboard for Game ${gameId}`,
      gameId: gameId
      // include other variables here
    });
  } 
  // Scenario 2: Create a new game since the gameId doesn't exist yet
  else {
    const newGame = lobbyService.createGame({
      userId: req.user.id, // Assuming user's ID is stored in req.user.id
      gameName: "Custom Game", // Add your logic here
      gameType: "Standard", // Add your logic here
    });
    if (newGame) {
      return res.render('DinoGame/DinoHostDashboard.ejs', { 
        gameData: newGame,
        title: `Host Dashboard for New Game`,
        gameId: newGame.id
        // include other variables here
      });
    } else {
      return res.status(400).send("Unable to create game");
    }
  }
};


const showPlayerClient = (req, res) => { 
  const gameId = req.params.gameId;
  // Logic for public display
  res.render('DinoGame/DinoLocalView', {
      title: `Host Display for Game ${gameId}`,
      gameId: gameId,
      // additional data
  });
};

const showInternetPlayer = (req, res) => { 
  const gameId = req.params.gameId;
  // Logic for public display
  res.render('DinoGame/DinoPlayerClient', {
      title: `Host Display for Game ${gameId}`,
      gameId: gameId,
      // additional data
  });
};

module.exports = {
  handleConnection,
  showPublicDisplay,
  showHostDashboard,
  showPlayerClient,
  showInternetPlayer
  // other exports
};