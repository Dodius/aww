// D:\Games\Unity\Drago\GPT-Sep-Fold\aww\public\DinoGame\js\DinoHostTV.js 

// Barmen started the Game... with ID.
// I'm stupid TV, i just show the filed and players in that Room
// TV calls me under URL like http://localhost:3000/Dino/we321/public-display

import User from './User.js';   
import Lane from './Lane.js';   
import Sprite from './Sprite.js';
import Cloud from './Cloud.js';

export default class DinoHostTV { 
  constructor(canvasId) {
    // Your initialization logic    
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext('2d');

    this.users = []; // Array to hold users
    this.lanes = []; // Array to hold lanes

    this.lastTime = 0; // For calculating delta time
    this.isRunning = false;

    this.cloudTimer = 0;
    this.baseCloudTime = 500; // Base time in milliseconds

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
    // this.cloud1 = new Sprite(spriteSheetImage, 164, 0,95,29, -5, 1);
    // this.cloud2 = new Sprite(spriteSheetImage, 164,29,95,42, -6, 2);
    // this.cloud3 = new Sprite(spriteSheetImage, 164,73,75,22, -7, 3);
 

    this.cloudPool = [
      new Cloud(spriteSheetImage, 164,  0, 95, 29, -5,   1.5),      //0
      new Cloud(spriteSheetImage, 164,  0, 95, 29, -5,  -0.5),      //1
      new Cloud(spriteSheetImage, 164, 29, 95, 42, -6,  -1),        //2
      new Cloud(spriteSheetImage, 164, 29, 95, 42, -6,   1),        //3
      new Cloud(spriteSheetImage, 164, 29, 95, 42, -6,  -1.5),      //4
      new Cloud(spriteSheetImage, 164, 73, 75, 22, -7,   1.5),      //5
      new Cloud(spriteSheetImage, 164, 73, 75, 22, -7,   1.3),      //6
      new Cloud(spriteSheetImage, 164, 73, 75, 22, -7,  -1.3),      //7
    ];
  
     
    this.cloudPool[0].xPos = this.canvas.width*0.1;    this.cloudPool[0].yPos = 45;
    this.cloudPool[5].xPos = this.canvas.width*0.35;   this.cloudPool[5].yPos = 40;
    this.cloudPool[2].xPos = this.canvas.width*0.5;    this.cloudPool[2].yPos = 50;
    this.cloudPool[6].xPos = this.canvas.width*0.75;   this.cloudPool[6].yPos = 43;
    this.cloudPool[3].xPos = -150;                     this.cloudPool[3].yPos = 47; this.cloudPool[3].isOnScreen = false;
    this.cloudPool[1].xPos = -150;                     this.cloudPool[1].yPos = 45; this.cloudPool[1].isOnScreen = false;
    this.cloudPool[4].xPos = -150;                     this.cloudPool[4].yPos = 40; this.cloudPool[4].isOnScreen = false;
    this.cloudPool[7].xPos = -150;                     this.cloudPool[7].yPos = 50; this.cloudPool[7].isOnScreen = false;

    //this.sprites = [];
    //this.sprites.push(this.cloud1, this.cloud2, this.cloud3); //this.dino, this.smallCactus, this.cloud1);
  }

  loop(timestamp) {
    if (!this.isRunning) return;

    const deltaTime = timestamp -  this.lastTime  ;
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
    
    // When a new user joins
    this.socket.on('newUser', (data) => {
      const newUser = new User(data.username, data.avatar);
      this.users.push(newUser);
      const newLane = new Lane(newUser);
      this.lanes.push(newLane);
      // Redraw canvas based on new lanes
    });

    // Listening to events from server
    this.socket.on('gameData', (data) => {
      // Handle the real-time game data
    });

    // Emitting events to server
    //this.socket.emit('startGame', { username: 'Player1' });     // public host joined

    this.isRunning = true;
    this.loop(0);
  }

  update(deltaTime) {
    // Update game logic here, e.g., move sprites, check for collisions

    // for (const sprite of this.sprites) {
    //   sprite.update(deltaTime);
    // }
    this.generateClouds(deltaTime);

    for (const lane of this.lanes) {
      lane.update(deltaTime);
    } 
  }

// document.addEventListener("DOMContentLoaded", () => {
//     const socket = io('http://localhost:3000/dino');

//     console.log('Host TV public.js - looks into Model for that game');

// // DinoHostTV.js
// const gameId = document.getElementById('gameContainer').getAttribute('data-gameid');


// console.log('gemeId='+ gameId);

//     // Your initialization logic    
//     const canvas = document.getElementById('gameCanvas');
//     const ctx = canvas.getContext('2d');
 

//     draw(canvas, ctx); 


// });



  draw() {
    // Clear canvas
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Draw sky
    this.ctx.fillStyle = '#87CEEB';       // blue sky
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // Draw ground
    this.ctx.fillStyle = '#228B22';       // green grass
    this.ctx.fillRect(0, this.canvas.height - 100, this.canvas.width, 100);

    // Draw clouds
    for (const cloud of this.cloudPool) {
      if (cloud.isOnScreen) {
        cloud.draw(this.ctx);
      }
    }

    // Calculate height for each lane
    const laneHeight = (5/6) * this.canvas.height / this.lanes.length;

    // Draw each lane
    let yPosition = (1/6) * this.canvas.height;
    for (const lane of this.lanes) {
      lane.draw(this.ctx, yPosition, laneHeight);
      yPosition += laneHeight;
    } 
    
    // Draw each sprite
    // for (const sprite of this.sprites) {
    //   sprite.draw(this.ctx);
    // }
  }

  generateClouds(deltaTime) {
    this.cloudTimer += deltaTime;
  
    const adjustedCloudTime = (this.cloudPool.filter(cloud => !cloud.isOnScreen).length < 3)
                              ? this.baseCloudTime * 2.5    // rare to generate
                              : this.baseCloudTime * 0.7;   // more faster to generate
  
    if (this.cloudTimer >= adjustedCloudTime) {
      // Reuse an off-screen cloud if available
      const offScreenCloud = this.cloudPool.find(cloud => !cloud.isOnScreen);
  
      if (offScreenCloud) {
        offScreenCloud.isOnScreen = true;
        offScreenCloud.xPos = this.canvas.width;
        offScreenCloud.yPos = Math.floor(60 - Math.random() * 20);
        offScreenCloud.velocityY = Math.random() * 4 - 2;
        this.cloudTimer = 0;
      } else {
        console.log("No off-screen clouds available for recycling.");
      }
    }
  
    // Update cloud positions and mark those that are out of the view as off-screen
    this.cloudPool.forEach(cloud => {
      cloud.update(deltaTime);
      if (cloud.xPos + cloud.width < 0) {
        cloud.isOnScreen = false;
      }
    });
  }
    
}
 
const game = new DinoHostTV('gameCanvas');  // Create a new instance of Game class
game.start();  // Call the start method on that instance
