// D:\Games\Unity\Drago\GPT-Sep-Fold\aww\src\DinoGame\models\GameModel.js 

class GameModel {
    constructor() {
      this.lanes = []; // Array of LaneModel instances
      this.players = []; // Array of PlayerModel instances
      this.gameID = null; // Unique identifier for the game
      this.state = "lobby"; // lobby, active, finished
    }
  
    addLane(lane) {
      this.lanes.push(lane);
    }
  
    addPlayer(player) {
      this.players.push(player);
    }
  
    removePlayer(playerID) {
      this.players = this.players.filter(player => player.id !== playerID);
    }
  
    // Additional methods for game management and collision detection can go here.
  }
  
  module.exports = GameModel;

