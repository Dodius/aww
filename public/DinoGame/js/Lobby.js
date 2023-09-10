// D:\Games\Unity\Drago\GPT-Sep-Fold\aww\public\DinoGame\js\Lobby.js 
 
document.addEventListener("DOMContentLoaded", () => {
  const socket = io('http://localhost:3000/dino');
  
  // Form elements
  const newGameForm = document.getElementById('new-game-form');
  const joinGameForm = document.getElementById('join-game-form');

  // Handling new game creation
  newGameForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const gameName = document.getElementById('game-name').value;
    const gameType = document.getElementById('game-type').value;
    
    // Emitting a 'createGame' event to the server
    //socket.emit('createGame', { gameName, gameType });
     // Emitting an event to the server based on the game type selected
     if (gameType === 'createAndJoinGame') {
      console.log('emiting  "createAndJoinGame"', { gameName, gameType });
      socket.emit('createAndJoinGame', { gameName });
    } else if (gameType === 'hostGame') {
      console.log('emiting "hostGame', { gameName, gameType });
      socket.emit('hostGame', { gameName });
    }
  });

  // Handling game joining
  joinGameForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const gameId = document.getElementById('game-id').value;
    console.log('Client socket id before Joining from Lobby:', socket.id);
    socket.emit('joinGame', { gameId });  //JoinSimpleView  joinFullView
  });

  socket.on('gameCreated', (data) => {
    console.log('Game created:', data);
    window.location.href = `/Dino/${data.gameId}/display`;
  });


  socket.on('hostGameCreated', (data) => {
    console.log('Game created:', data);
    window.location.href = `/Dino/${data.gameId}/host-dashboard`;
  });

  
  socket.on('gameJoined', (data) => {
    console.log('Game joined:', data);
    window.location.href = `/Dino/${data.gameId}/client`;
  });
});