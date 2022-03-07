const express = require('express');
const socketio = require('socket.io');
const http = require('http');

const app = express();
const server = http.createServer(app)
const io = socketio(server)
const PORT = process.env.PORT || 3000


io.on('connection', (socket) => {
  console.log('a user connected!');

  socket.on('join', (conversationId) => {
    socket.join(conversationId.conversationId);
  });

  socket.on('chat message', (message) => {
    console.log(message.userId);
    console.log(message.message);
    console.log(message.conversationId);

    io.to(message.conversationId).emit('chat message', {
      message: message.message,
      userId: message.userId,
    });
  });

  socket.on('chat request', (message) => {
    console.log(message);

    io.emit('chat request', {message});
  });
});

server.listen(PORT, ()=>console.log(`Server has start on port ${PORT}`));
