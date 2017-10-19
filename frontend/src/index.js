import io from 'socket.io-client';
import $ from 'jquery';

const socket = io('//localhost:3000');

$('form').submit(function(){
  socket.emit('chat message', $('#chat-input').val());
  $('#messages').append($('<li class="me">').text($('#chat-input').val()));
  $('#chat-input').val('');
  return false;
});

socket.on('chat message', function(msg){
  $('#messages').append($('<li>').text(msg));
});
