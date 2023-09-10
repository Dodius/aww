// LobbyService.js
const GameModel = require('../models/GameModel');
const { initializeGameRoom, onClientJoined } = require('./gameService');
const { v4: uuidv4 } = require('uuid');

let gamesList = new Map();  // Initialize a new Map

const createGame = ({ userId, gameName, gameType }) => {
  const gameId = generateUniqueGameId();
  const newGame = new GameModel();
  
  newGame.gameID = gameId;
  newGame.state = "lobby";

  const newGameEntry = {
    id: gameId,
    host: userId,
    gameName,
    gameType,
    gameInstance: newGame // Store the game instance here
  };

  gamesList.set(gameId, newGameEntry); // Use set() to add entries
  
  initializeGameRoom(newGameEntry);

  return newGameEntry;
};

function joinGame(gameId, playerId) {
  const game = gamesList.get(gameId); // Use get() for lookup
  if (game) {
    onClientJoined(game, { playerId });
  }
  return game;
}

function leaveGame(gameId, playerId) {
  const game = gamesList.get(gameId); // Use get() for lookup
  if (game) {
    game.gameInstance.removePlayer(playerId);
  }
  return game;
}

function generateUniqueGameId() {
  return uuidv4();
}

module.exports = { gamesList, createGame, joinGame, leaveGame };
