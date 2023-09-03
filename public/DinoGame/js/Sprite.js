// D:\Games\Unity\Drago\GPT-Sep-Fold\aww\public\DinoGame\js\Sprite.js
export default class Sprite {
  constructor(spriteSheet, x, y, width, height,velocityX , velocityY ,frames) {
    this.spriteSheet = new Image();
    this.spriteSheet.src = spriteSheet;
    this.x = x;           // position and size on Sprite Map
    this.y = y;
    this.width = width;
    this.height = height;

    this.xPos = 400;           // initial position on ctx
    this.yPos = 100;
    this.isOnScreen = true;

    this.velocityX = velocityX;
    this.velocityY = velocityY;
    this.frames = frames || []; // Array of {x, y, width, height} objects for each frame
    this.currentFrame = 0;
    this.frameCount = 0; // Count the number of game loops to change the sprite image
  }

  update(deltaTime) {
    
    if (this.frames.length > 1) {
      // Update frame logic only if more than one frame exists// Logic for updating the frame
      this.frameCount++;

      this.currentFrame = (this.currentFrame + 1) % this.frames.length;
      const { x, y, width, height } = this.frames[this.currentFrame];

      if (this.frameCount >= 10) { // Change sprite every 10 frames (adjust as needed)
      this.frameCount = 0;
      }
    }
       
    //this.xPos += this.velocityX * (deltaTime / 100);
    //this.yPos += this.velocityY * (deltaTime / 100);
  }

  draw(ctx) {
    //console.log("Drawing sprite");
    // your drawing logic here
    //alert("i'm alive in D:\Games\Unity\Drago\GPT-Sep-Fold\aww\public\DinoGame\js\Sprite.js" );

    // ctx.fillStyle = '#FF0000';
    // ctx.fillRect(100, 100, 50, 50);

    // console.log(this.spriteSheet, 
    //   this.x, this.y,               //srcX, srcY, 
    //   this.width, this.height,      //srcWidth, srcHeight, 
    //   this.xPos, this.yPos,         //destX, destY,
    //   this.width, this.height);     //destWidth, destHeight

    // Draw a part of the image onto the canvas 
    ctx.drawImage(
        this.spriteSheet, 
        this.x, this.y,               //srcX, srcY, 
        this.width, this.height,      //srcWidth, srcHeight, 
        this.xPos, this.yPos,         //destX, destY,
        this.width, this.height);     //destWidth, destHeight
  } 
 

  static someStaticMethod() {
    console.log("A static method");
  }
}
