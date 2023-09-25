const socket = io(); // Assuming you have socket.io installed

const messages = document.getElementById('messages');
const messageInput = document.getElementById('message');
const username = prompt('Enter your username:'); // Prompt the user for their username

var userchat = document.getElementById("user-chat");
userchat.innerHTML = `<h1> Hello, ${username} </h1>`;

messageInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        const messageText = messageInput.value.trim();
        if (messageText !== '') {
            sendMessage(messageText);
        }
    }
});

function sendMessage(messageText) {
    // ini izin urang comment, biar ga double double dari pesan dari sendernya
    // const messageElement = document.createElement('li');
    // messageElement.textContent = `${username}: ${messageText}`;
    // messageElement.classList.add('sender'); // Add the "sender" class to user's messages
    // messages.appendChild(messageElement);
    socket.emit('chat message', `${username}: ${messageText}`);
    messageInput.value = '';
}

socket.on('chat message', (message) => {
    const messageElement = document.createElement('div');
    messageElement.textContent = message;
    // messageElement.classList.add(`${username}`); // Add the "receiver" class to received messages
    messageElement.classList.add('receiver'); // Add the "receiver" class to received messages
    messageElement.classList.add('alert'); // Add the "receiver" class to received messages
    // if (document.getElementsByClassName(`${username}`) == username)
    //     messageElement.classList.add('alert-primary');
    // else
    //     messageElement.classList.add('alert-secondary');
    messageElement.classList.add('alert-success'); // Add the "receiver" class to received messages
    messageElement.classList.add('text-wrap'); // Add the "receiver" class to received messages
    // messages.appendChild(messageElement); // yang terakhir di bawah
    messages.prepend(messageElement); // yang terakhir di atas
});