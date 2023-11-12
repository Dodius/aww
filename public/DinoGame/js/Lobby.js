// D:\Games\Unity\Drago\GPT-Sep-Fold\aww\public\DinoGame\js\Lobby.js 
 
document.addEventListener("DOMContentLoaded", () => {
  const socket = io('http://localhost:3000/dino');

  // Form elements
  const newGameForm = document.getElementById('new-game-form');
  const joinGameForm = document.getElementById('join-game-form');

  const activeGamesList = document.getElementById('activeGamesList');
  const activeGamesCount = document.getElementById('activeGamesCount');

  const connectedUsersCount = document.getElementById('connectedUsersCount');
  const connectedUsersList = document.getElementById('connectedUsersList');
  
  console.log('Alive in "Lobby.js"');

  socket.on('connect', () => {
    console.log(`Connected with server-side socket ${socket.id}`);
  });


  socket.onAny((event, ...args) => {
    console.log('DinoHost (onAny):', event, args);
  });

  
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

  // socket.on('gameCreated', (data) => {
  //   console.log('Game created:', data);
  //   window.location.href = `/Dino/${data.gameId}/display`;
  // });

  socket.on('localGameCreated', (data) => {               // local "Create and Play", just started a new game and waiting for siblings
    console.log('Game created:', data);
    window.location.href = `/Dino/${data.gameId}/internet-player`;
  });

  socket.on('hostGameCreated', (data) => {                // Barmen requested, created and now shold be redirected to barcode
    console.log('Game created:', data);
    alert('Game created:', data);
    window.location.href = `/Dino/${data.gameId}/host-dashboard`;
  });

  
  socket.on('gameJoined', (data) => {
    console.log('Game joined:', data);
    window.location.href = `/Dino/${data.gameId}/client`;
  });

  // Listen for the 'updateGameList' event from the server
  socket.on('updateGameList', (data) => {
    // Clear the current list
    activeGamesList.innerHTML = '';
    
    console.log("Received updateGameList", data);

    // Update the UI to reflect the new list of active games
    data.forEach((game) => {
      const listItem = document.createElement('li');
      listItem.textContent = `Game ID: ${game.id}, Host: ${game.host}`;
      activeGamesList.appendChild(listItem);
      game.users.forEach(user => {
        console.log(user);
        if (user.role === 'hoster') {
          // Do something special for the hoster
        } else if (user.role === 'player') {
          // Do something special for players
        } // ... and so on
      });
    });

    // Update the count
    activeGamesCount.textContent = data.length;
  });

  

  socket.on('updateUserList', (users) => {
    //alert("i've got 'updateUserList'");
    console.log("i've got 'updateUserList'",users);

    connectedUsersList.innerHTML = '';
    users.forEach(user => {
      const listItem = document.createElement('li');
      listItem.textContent = user.username;
      connectedUsersList.appendChild(listItem);
    });

    connectedUsersCount.textContent = users.length;
  });
 

});