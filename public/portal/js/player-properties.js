// /public/js/player-properties.js 

console.log('\x1b[33m player-properties \x1b[0m');

function generateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

function generateSeed() {
    return generateRandomString(6); // or any desired length
}


document.getElementById('submit-username-button').addEventListener('click', function() {
    let newUsername = document.getElementById('new-username-input').value;
    fetch('/profile/update-username', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: newUsername }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            document.getElementById('username-text').innerText = newUsername;
        } else {
            alert(data.message);
        }
    })
    .catch((error) => {
        console.error('Error:', error);
    });
});


let currentStyleIndex = 0;
const avatarStyles  = ['adventurer', 'avataaars', 'big-ears', 'big-smile', 'lorelei', 'fun-emoji', 'personas'];
const maxAvatars = 10;
  
function submitAvatarToServer(style, seed) {
    fetch('/profile/update-avatar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
            avatarStyle: style, 
            avatarSeed: seed
        }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            document.getElementById('current-avatar').src = `https://api.dicebear.com/6.x/${style}/svg?seed=${seed}`;
            alert(data.message); 
        } else {
            alert(data.message);
        }
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

function generateAndDisplayAvatar() {
    let seed = generateSeed();
    let style = avatarStyles[currentStyleIndex];
    let newAvatarURL = `https://api.dicebear.com/6.x/${style}/svg?seed=${seed}`;

    let newAvatar = document.createElement('img');
    newAvatar.src = newAvatarURL;
    newAvatar.style.height = "4em";
    newAvatar.style.verticalAlign = "middle";
    newAvatar.alt = `Style: ${style}, Seed: ${seed}`;

    newAvatar.onclick = function() {
        submitAvatarToServer(style, seed);
    };

    let avatarsContainer = document.getElementById('previous-avatars-container');
    avatarsContainer.insertBefore(newAvatar, avatarsContainer.firstChild);

    while (avatarsContainer.childNodes.length > 10) {
        avatarsContainer.removeChild(avatarsContainer.lastChild);
    }
}

document.getElementById('theme-button').addEventListener('click', function() {
    currentStyleIndex = (currentStyleIndex + 1) % avatarStyles.length;
    generateAndDisplayAvatar();
});

document.getElementById('randomize-button').addEventListener('click', function() {
    generateAndDisplayAvatar();
});

