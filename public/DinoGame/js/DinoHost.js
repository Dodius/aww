// D:\Games\Unity\Drago\GPT-Sep-Fold\aww\public\DinoGame\js\DinoHostTV.js 

 
document.addEventListener("DOMContentLoaded", () => {
    const socket = io('http://localhost:3000/dino');

console.log('Host - shows some statistics');

// DinoHostTV.js
const gameId = document.getElementById('gameContainer').getAttribute('data-gameid');


console.log('gemeId='+ gameId);


});