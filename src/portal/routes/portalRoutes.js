// src/portal/routes/portalRoutes.js
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  // Here you would render a view or send a response with a list of games and statistics.
  // For simplicity, sending a plain text:
  //res.send('Welcome to the Alpha World Web Portal! Here are our games and statistics.');

  const games = [
    { name: 'Dino' },
    { name: 'EcoSphere' },
    { name: 'PWMiner' }
  ];

  const user = req.user;

  res.render('portal/index', { games, user });
});

module.exports = router;
