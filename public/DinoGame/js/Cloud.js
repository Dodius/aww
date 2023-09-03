// File: Cloud.js
import Sprite from './Sprite.js';

export default class Cloud extends Sprite {
  constructor(imagePath, srcX, srcY, width, height, velocityX, velocityY) {
    super(imagePath, srcX, srcY, width, height, velocityX, velocityY); 
    // Any specific properties for Cloud can go here
  }

  // You can also override the parent class methods
  update(deltaTime) {
    // Custom update logic specific to Cloud


    this.xPos += this.velocityX * (deltaTime / 100);
    this.yPos += this.velocityY * (deltaTime / 100);

    if ( this.yPos > 60 || this.yPos < 40 ) this.velocityY *= -1;


    //super.update(deltaTime);  // Call the parent class update method

     // Additional logic here
  }

  // Other specific methods can go here
}


