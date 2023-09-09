// D:\Games\Unity\Drago\GPT-Sep-Fold\aww\public\DinoGame\js\Client.js 

// Extract GameID from URL
const urlParts = window.location.href.split('/');
const gameId = urlParts[urlParts.length - 2]; // Assuming GameID is always the second last part of the URL

// Initialize the game client
function initializeGameClient( ) {
  const socket = io('http://localhost:3000/dino');

  // Emitting event to join the game
  //socket.emit('joinGame', { username, gameId });

  // Emit rejoinGame event
  console.log("socket.emit('rejoinGame'");
  console.log('Client socket id after Joining from Lobby and before rejoining in Client.js:', socket.id);
  socket.emit('rejoinGame', { gameId: gameId });

  //console.log("socket.emit('joinGame'");

  // ... rest of your logic
  // Listening for updates in player positions
  socket.on('updatePositions', (data) => {
    const positionList = document.getElementById('position-list');
    positionList.innerHTML = data.map(player => `<li>${player.username}: ${player.position}</li>`).join('');
  });

  // Set the user's avatar and name
  //document.getElementById('avatar-icon').src = '/path/to/avatar/icon.jpg';
  //document.getElementById('avatar-name').innerText = 'Your Name';

  document.getElementById('jump-button').addEventListener('click', () => {
    // Emit jump event to server
    console.log("socket.emit('jump-ed'");
    socket.emit('jump', { username: 'Player1' });
  });
  
}



// Entry point for your game client
document.addEventListener('DOMContentLoaded', () => {
  // Fetch gameId and username from some source (DOM, local storage, etc.)
  //const username = document.getElementById('username').value;

  // Initialize the game client
  initializeGameClient( );
});


