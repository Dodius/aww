// D:\Games\Unity\Drago\GPT-Sep-Fold\aww\public\DinoGame\js\Client.js 

// Initialize Socket.IO client
const socket = io('http://localhost:3000');

socket.on('connect', () => {
  // Emitting event to join the game
  socket.emit('joinGame', { username: 'Player1' });
  
  // Listening for updates in player positions
  socket.on('updatePositions', (data) => {
    const positionList = document.getElementById('position-list');
    positionList.innerHTML = data.map(player => `<li>${player.username}: ${player.position}</li>`).join('');
  });

  // Set the user's avatar and name
  document.getElementById('avatar-icon').src = '/path/to/avatar/icon.jpg';
  document.getElementById('avatar-name').innerText = 'Your Name';
});

document.getElementById('jump-button').addEventListener('click', () => {
  // Emit jump event to server
  socket.emit('jump', { username: 'Player1' });
});
