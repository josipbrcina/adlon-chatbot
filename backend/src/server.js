'use strict';

const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const SocketHandler = new (require('./SocketHandler.js'))();

io.on('connection', (socket) => {
  SocketHandler.onConnect();

  socket.on('disconnect', () => {
    SocketHandler.onDisconnect();
  });

  socket.on('chat message', (msg) => {
    SocketHandler.onMessage({ msg, socket });
  });
});

http.listen(3000, '0.0.0.0', () => { // eslint-disable-line no-magic-numbers
  console.log('Listening on *:3000');
});
