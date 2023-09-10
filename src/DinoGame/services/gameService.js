// D:\Games\Unity\Drago\GPT-Sep-Fold\aww\src\DinoGame\services\gameService.js 

const PlayerModel = require('../models/PlayerModel');
const LaneModel = require('../models/LaneModel'); 
const GameModel = require('../models/GameModel');

const { v4: uuidv4 } = require('uuid');

const createGame = ({ id, userId }) => {
  const gameId = id || generateUniqueGameId();
  const newGame = new GameModel();
  
  newGame.gameID = gameId;
  newGame.state = "lobby";
  newGame.creatorPlayerId = userId; // If you want to keep track of who created the game

  return newGame;
};

function generateUniqueGameId() {
  return uuidv4();
}
 




// Function to initialize a game room
const initializeGameRoom = (room) => {
  const { id, gameInstance } = room;

  // Initialize lanes and other game-related attributes in GameModel
  const lane = new LaneModel(id);
  gameInstance.addLane(lane);

  return gameInstance;
};

// Function to handle a player joining
const onClientJoined = (room, { playerId }) => {
  const { gameInstance } = room;
  
  const newPlayer = new PlayerModel(playerId);
  gameInstance.addPlayer(newPlayer);
};

// Function to handle a player leaving
const handleDisconnection = (room, playerId) => {
  const { gameInstance } = room;
  gameInstance.removePlayer(playerId);
};

// Function to get the current state of a game
const getGameState = (room) => {
  const { gameInstance } = room;
  return gameInstance || null;
};

module.exports = {
  createGame,
  initializeGameRoom,
  onClientJoined,
  handleDisconnection,
  getGameState,
};
