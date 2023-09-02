// src/DinoGame/routes/dinoGameRoutes.js

const express = require('express');
const router = express.Router();

// Lobby route
  router.get('/', (req, res) => {
      res.render('DinoGame/dinoLobby', { 
          title: 'Dino Game Lobby', 
          user: req.user,
          gamesList: [123, 321,432] });
  });


// Game instance route
router.get('/:instanceId', (req, res) => {
    const instanceId = req.params.instanceId;
    // You can retrieve game data based on instanceId if needed
    // For now, just render a placeholder
      res.render('DinoGame/gameInstance', { 
          title: `Dino Game Instance ${instanceId}`, 
          user: req.user, 
          instanceId: instanceId });
});

module.exports = router;
