// LobbyService.js
const GameModel = require('../models/GameModel');
const { initializeGameRoom, onClientJoined } = require('./gameService');
const { v4: uuidv4 } = require('uuid');

let gamesList = new Map();  // Initialize a new Map

const createGame = ({ userId, gameName, gameType }) => {

  if(!gameName){
    const gameName = generateUniqueGameId();
  }
  const newGame = new GameModel();
  
  newGame.gameID = gameName;
  newGame.state = "lobby";

  const newGameEntry = {
    id: gameName,
    host: userId,
    gameName,
    gameType,
    gameInstance: newGame // Store the game instance here
  };

  gamesList.set(gameName, newGameEntry); // Use set() to add entries
  
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

// New function to find a game by its ID
const findGameById = (gameId) => {
  return games[gameId] || null;
};

function generateUniqueGameId() {
  return uuidv4();
}

module.exports = { 
    gamesList, 
    createGame, 
    joinGame, 
    leaveGame, 
    findGameById };
