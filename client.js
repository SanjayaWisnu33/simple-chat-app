const socket = io(); // Assuming you have socket.io installed

const messages = document.getElementById('messages');
const messageInput = document.getElementById('message');
const username = prompt('Enter your username:'); // Prompt the user for their username

messageInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        const messageText = messageInput.value.trim();
        if (messageText !== '') {
            sendMessage(messageText);
        }
    }
});

function sendMessage(messageText) {
    const messageElement = document.createElement('li');
    messageElement.textContent = `${username}: ${messageText}`;
    messageElement.classList.add('sender'); // Add the "sender" class to user's messages
    messages.appendChild(messageElement);

    socket.emit('chat message', messageText);
    messageInput.value = '';
}

socket.on('chat message', (message) => {
    const messageElement = document.createElement('li');
    messageElement.textContent = message;
    messageElement.classList.add('receiver'); // Add the "receiver" class to received messages
    messages.appendChild(messageElement);
});