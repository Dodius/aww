// src/DinoGame/routes/dinoGameRoutes.js

const express = require('express');
const router = express.Router();

// Lobby route
router.get('/', (req, res) => {
    res.render('DinoGame/dinoLobby', {
        title: 'Dino Game Lobby',
        user: req.user,
        gamesList: [123, 321, 432]
    });
});

// Game instance route for client, with shorthand URL
router.get('/:gameId', (req, res) => {
    const gameId = req.params.gameId;
    res.redirect(`/Dino/${gameId}/client`);
});

// Game instance route for display
router.get('/:gameId/display', (req, res) => {
    const gameId = req.params.gameId;
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



module.exports = router;

