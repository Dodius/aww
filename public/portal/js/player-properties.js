// /public/js/player-properties.js 

console.log('\x1b[33m player-properties \x1b[0m');
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

document.getElementById('submit-avatar-button').addEventListener('click', function() {
    let newAvatarSeed = document.getElementById('new-avatar-input').value;
    fetch('/profile/update-avatar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ avatarSeed: newAvatarSeed }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            document.getElementById('avatar-image').src = `https://api.dicebear.com/6.x/adventurer/svg?seed=${newAvatarSeed}`;
        } else {
            alert(data.message);
        }
    })
    .catch((error) => {
        console.error('Error:', error);
    });
});

 