// D:\Games\Unity\Drago\GPT-Sep-Fold\aww\public\DinoGame\js\DinoHostTV.js 

 
document.addEventListener("DOMContentLoaded", () => {
    const socket = io('http://localhost:3000/dino');

console.log('Host - shows some statistics');

// DinoHostTV.js
const gameId = document.getElementById('gameContainer').getAttribute('data-gameid');


console.log('gemeId='+ gameId);

JsBarcode("#barcode", "http://localhost:3000/Dino/" + gameId + "/player-client");

  
socket.on('updateHostDashboard', (userList) => {
  // Update the dashboard using the userList array.
  const userCount = userList.length;
  document.getElementById("userCount").innerText = userCount;
  
  const usernames = userList.join(", ");
  document.getElementById("userNames").innerText = usernames;
});

});