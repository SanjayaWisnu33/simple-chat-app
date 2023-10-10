const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
  // Create a worker for each CPU core
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  // Listen for worker process exits and replace them
  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died`);
    cluster.fork();
  });
} else {
  const express = require('express');
  const http = require('http');
  const socketIo = require('socket.io');

  const app = express();
  const server = http.createServer(app);
  const io = socketIo(server);

  app.use(express.static(__dirname));

  io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('disconnect', () => {
      console.log('user disconnected');
    });

    socket.on('chat message', (message) => {
      io.emit('chat message', message);
    });
  });

  const PORT = process.env.PORT || 3000;
  server.listen(PORT, () => {
    console.log(`Worker ${cluster.worker.id} is listening on port ${PORT}`);
  });
}