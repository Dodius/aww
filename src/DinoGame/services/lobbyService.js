// D:\Games\Unity\Drago\GPT-Sep-Fold\aww\src\DinoGame\services\lobbyService.js 
// Room management for Dino Game 

const GameModel = require('../models/GameModel');
const { initializeGameRoom, onClientJoined } = require('./gameService');
const { v4: uuidv4 } = require('uuid');

let rooms = [];  // This will store all the active rooms

const createRoom = ({ userId, gameName, gameType }) => {
  const roomId = generateUniqueRoomId();
  const newGame = new GameModel();
  
  newGame.gameID = roomId;
  newGame.state = "lobby";

  const newRoom = {
    id: roomId,
    host: userId,
    gameName,
    gameType,
    gameInstance: newGame // Store the game instance here
  };

  console.log('Lobby:newRoom=',newRoom);
  rooms.push(newRoom);
  
  initializeGameRoom(newRoom);

  console.log('Rooms in Dino Lobby=',rooms.length);
  return newRoom;
};

function joinRoom(roomId, playerId) {
  const room = rooms.find(r => r.id === roomId);
  if (room) {
    onClientJoined(room, { playerId });
  }
  return room;
}

function leaveRoom(roomId, playerId) {
  const room = rooms.find(r => r.id === roomId);
  if (room) {
    room.gameInstance.removePlayer(playerId);
  }
  return room;
}

function generateUniqueRoomId() {
  return uuidv4();
}

module.exports = { createRoom, joinRoom, leaveRoom };
