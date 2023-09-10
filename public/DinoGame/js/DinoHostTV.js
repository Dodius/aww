// D:\Games\Unity\Drago\GPT-Sep-Fold\aww\public\DinoGame\js\DinoHostTV.js 

document.addEventListener("DOMContentLoaded", () => {
    const socket = io('http://localhost:3000/dino');

    console.log('Host TV public.js - looks into Model for that game');

// DinoHostTV.js
const gameId = document.getElementById('gameContainer').getAttribute('data-gameid');


console.log('gemeId='+ gameId);

    // Your initialization logic    
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
 

    draw(canvas, ctx); 


});


function draw(canvas, ctx) {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw sky
    ctx.fillStyle = '#87CEEB';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw ground
    ctx.fillStyle = '#228B22';
    ctx.fillRect(0, canvas.height - 100, canvas.width, 100);

    // Draw clouds
    for (const cloud of cloudPool) {
      if (cloud.isOnScreen) {
        cloud.draw(ctx);
      }
    }

    // Calculate height for each lane
    const laneHeight = (5/6) * canvas.height / lanes.length;

    // Draw each lane
    let yPosition = (1/6) * canvas.height;
    for (const lane of lanes) {
      lane.draw(ctx, yPosition, laneHeight);
      yPosition += laneHeight;
    } 
    
    // Draw each sprite
    // for (const sprite of sprites) {
    //   sprite.draw(ctx);
    // }
  }