// D:\Games\Unity\Drago\GPT-Sep-Fold\aww\public\DinoGame\js\Game.js

import Sprite from './Sprite.js';

export default class Game { 
  constructor(canvasId) {
    // Your initialization logic    
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext('2d');

    this.lastTime = 0; // For calculating delta time
    this.isRunning = false;

    this.socket = io('http://localhost:3000'); // Initialize Socket.IO client

    // Create some sprites and push them to this.sprites    
    const spriteSheetImage = '/dino/img/offline-sprite-4x.png';

    const dinoFrames = [
      { spriteX: 1513, spriteY: 0, width: 50, height:50 }, // Run frame 1
      { spriteX: 1601, spriteY: 0, width: 50, height:50 }  // Run frame 2
    ];
    //this.dino = new Sprite(spriteSheetImage, /* srcX, srcY, width, height, frames */);
 
    // Create cactus sprites
    //this.smallCactus = new Sprite(spriteSheetImage, /* srcX, srcY, width, height */);
    //this.bigCactus = new Sprite(spriteSheetImage, /* srcX, srcY, width, height */);

    // Create bird sprite
    //this.bird = new Sprite(spriteSheetImage, /* srcX, srcY, width, height, 2 */); // Assuming 2 frames

    // Create cloud sprites
    this.cloud1 = new Sprite(spriteSheetImage, 164, 0,95,29, -5, 1);
    this.cloud2 = new Sprite(spriteSheetImage, 164,29,95,42, -6, 2);
    this.cloud3 = new Sprite(spriteSheetImage, 164,73,75,22, -7, 3);
  

    this.sprites = [];
    this.sprites.push(this.cloud1, this.cloud2, this.cloud3); //this.dino, this.smallCactus, this.cloud1);
  }

  loop(timestamp) {
    if (!this.isRunning) return;

    const deltaTime = timestamp - this.lastTime;
    this.lastTime = timestamp;

    this.update(deltaTime);
    this.draw();

    requestAnimationFrame((timestamp) => this.loop(timestamp));
  } 

  stop() {
    this.isRunning = false;
  }
 
  // Your methods for Game class
  start() {
    // Game starting logic here

    //alert("i'm alive in D:\Games\Unity\Drago\GPT-Sep-Fold\aww\public\DinoGame\js\Game.js" );
    console.log("i'm alive in D:\Games\Unity\Drago\GPT-Sep-Fold\aww\public\DinoGame\js\Game.js");

    // Emitting events to server
    this.socket.emit('startGame', { username: 'Player1' });

    // Listening to events from server
    this.socket.on('gameData', (data) => {
      // Handle the real-time game data
    });

    this.isRunning = true;
    this.loop(0);
  }

  update(deltaTime) {
    // Update game logic here, e.g., move sprites, check for collisions
    for (const sprite of this.sprites) {
      sprite.update(deltaTime);
    } 
  }
     

  draw() {
    // Clear canvas
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Draw sky
    this.ctx.fillStyle = '#87CEEB';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // Draw ground
    this.ctx.fillStyle = '#228B22';
    this.ctx.fillRect(0, this.canvas.height - 100, this.canvas.width, 100);

    // Draw each sprite
    for (const sprite of this.sprites) {
      sprite.draw(this.ctx);
    }
  }

  

}

const game = new Game('gameCanvas');  // Create a new instance of Game class
game.start();  // Call the start method on that instance
