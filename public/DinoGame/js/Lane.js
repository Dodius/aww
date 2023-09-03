// D:\Games\Unity\Drago\GPT-Sep-Fold\aww\public\DinoGame\js\Lane.js 

export default class Lane {
    constructor(canvas, context, user) {
      this.canvas = canvas;
      this.context = context;
      this.user = user;
      // ... Initialize cactuses and other objects
    }
  
    update(deltaTime) {
      // ... Your update logic
    }
  
    draw() {
      // Draw user avatar at the edge of the lane
      this.context.drawImage(this.user.avatar, this.canvas.width - 50, 10, 40, 40);
      // ... Your drawing logic
    }
  }
  