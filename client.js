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
    messageElement.classList.add('receiver'); // Add the "receiver" class to received messages
    messageElement.classList.add('alert'); // Add the "receiver" class to received messages
    messageElement.classList.add('alert-success'); // Add the "receiver" class to received messages
    messageElement.classList.add('text-wrap'); // Add the "receiver" class to received messages
    // messages.appendChild(messageElement); // yang terakhir di bawah
    messages.prepend(messageElement); // yang terakhir di atas
});