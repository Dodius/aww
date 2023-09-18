// D:\Games\Unity\Drago\GPT-Sep-Fold\aww\public\DinoGame\js\DinoHost.js 

 
document.addEventListener("DOMContentLoaded", () => {
    const socket = io('http://localhost:3000/dino');

console.log('Host - shows some statistics');


socket.onAny((event, ...args) => {
  console.log('DinoHost (onAny):', event, args);
});
 

const gameId = document.getElementById('gameContainer').getAttribute('data-gameid');
console.log('gemeId='+ gameId);

var qrcode = new QRCode(document.getElementById("qrcode"), {
    text: "http://localhost:3000/Dino/" + gameId + "/player-client",
    width: 128,
    height: 128,
  });

  document.getElementById('qrtext').innerText = "http://localhost:3000/Dino/" + gameId + "/player-client";
  

  //hostGameCreated
socket.on('hostGameCreated', (gameId) => {                    // i got it already in the Lobby and window.location.href... 
  console.log('i just got an "hostGameCreated": ', gameId); 
});



socket.on('updateUserList', (userList) => {

  console.log('Joch, I got "updateUserList": ', userList);

  // Update the dashboard using the userList array.
  const userCount = userList.length;
  document.getElementById("userCount").innerText = userCount;
  

  userList.forEach(user => {
    const listItem = document.createElement('li');
    listItem.textContent = user.username;
    document.getElementById("userNames").appendChild(listItem);
  });

  //const usernames = userList.join(",<br> ");
  //document.getElementById("userNames").innerText = usernames;
});

});