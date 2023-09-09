// src/DinoGame/routes/dinoGameRoutes.js

const express = require('express');
const router = express.Router();
const { createRoom, joinRoom, leaveRoom } = require('../services/lobbyService');
//const { dinoController } = require('../controllers/dinoController');
const dinoController = require('../controllers/dinoController');

//console.log(dinoController);


// Lobby route
router.get('/', (req, res) => {
    res.render('DinoGame/dinoLobby', {
        title: 'Dino Game Lobby',
        user: req.user,
        gamesList: [123, 321, 432]
    });
});

// Game instance route for client, with shorthand URL - redirect to "Client"
router.get('/:gameId', (req, res) => {
    const gameId = req.params.gameId;
    res.redirect(`/Dino/${gameId}/client`);
});

// Game instance route for display
router.get('/:gameId/display', (req, res) => {
    const gameId = req.params.gameId;
    // You can now add logic to validate the gameId, 
    // check if it's in the list of active rooms, etc.
    res.render('DinoGame/DinoView', {
        title: `Dino Game Instance ${gameId}`,
        user: req.user,
        gameId: gameId
    });
});

// Game instance route for client
router.get('/:gameId/client', (req, res) => {
    res.render('DinoGame/DinoClient', { 
        gameId: req.params.gameId, 
        user: req.user 
    });
});


// Public Display for Big TV
router.get('/:gameId/public-display', dinoController.showPublicDisplay);
//router.get('/:gameId/public-display', (req, res) => dinoController.showPublicDisplay(req, res));


// Hoster Dashboard
router.get('/:gameId/host-dashboard', dinoController.showHostDashboard);
/*
// Simple Client View
router.get('/:gameId/player-client', dinoController.showPlayerClient);

// Internet Player with full local view
router.get('/:gameId/internet-player', dinoController.showInternetPlayer);

*/

// Form at D:\Games\Unity\Drago\GPT-Sep-Fold\aww\views\DinoGame\dinoLobby.ejs 

// When creating a new game room, you might use a POST request for that.
// Assuming this will be a POST request from your form
router.post('/create', (req, res) => {
    const user = req.user; // Assuming you have middleware setting this
  
    console.log('POST Host=',req.id);

    // Extract data from form
    const gameName = req.body['game-name'];
    const gameType = req.body['game-type'];  // 'play' or 'host'
  
    // Logic to create a room
    const newRoom = createRoom({
      userId: user.id,
      gameName,
      gameType
    });
  
    console.log('someone created newRoom in dinoController.js =',newRoom);

    // Redirect or render view as you wish, perhaps passing newRoom.id
    res.redirect(`/Dino/${newRoom.id}/display`);
  });
  
// Joining an existing game might look something like this
router.post('/:gameId/join', (req, res) => {
    const gameId = req.params.gameId;
    const user = req.user;
    const room = joinRoom(gameId, user.id);
    if (room) {
        // Joined successfully
        res.redirect(`/Dino/${gameId}/client`);
    } else {
        // Handle error (e.g., room doesn't exist)
        res.status(404).send('Room not found');
    }
});


module.exports = router;

