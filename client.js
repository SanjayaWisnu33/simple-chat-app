const socket = io(); 

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
    
    socket.emit('chat message', `${username}: ${messageText}`);
    messageInput.value = '';
}

// Message handling
socket.on('chat message', (message) => {
    const messageElement = document.createElement('div');
    messageElement.textContent = message;
    
    messageElement.classList.add('receiver'); // Add the "receiver" class to received messages
    messageElement.classList.add('alert'); // Add the "receiver" class to received messages
    
    messageElement.classList.add('alert-success'); // Add the "receiver" class to received messages
    messageElement.classList.add('text-wrap'); // Add the "receiver" class to received messages
    
    messages.prepend(messageElement); // yang terakhir di atas
});