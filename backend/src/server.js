'use strict';

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var SocketHandler = require('./socketHandler.js');
const socketHandler = new SocketHandler.SocketHandler();


io.on('connection', function(socket){

  socketHandler.onConnect();

  socket.on('disconnect', function(){
    socketHandler.onDisconnect();
  });

  socket.on('chat message', function(msg){
    socketHandler.onMessage({msg, socket});
  });

});

http.listen(3000, '0.0.0.0', function(){ // eslint-disable-line no-magic-numbers
  console.log('listening on *:3000');
});
