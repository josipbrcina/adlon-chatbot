import io from 'socket.io-client';
import $ from 'jquery';

const socket = io('//localhost:3000');

$('form').submit(() => {
  socket.emit('chat message', $('#chat-input').val());
  $('#messages').append($('<li class="me">').text($('#chat-input').val()));
  $('#chat-input').val('');
  const scrollHeight = 500;
  $('#messages-wrapper')
    .animate({scrollTop: $('#messages-wrapper')
      .prop('scrollHeight')}, scrollHeight);
  return false;
});

socket.on('chat message', (msg) => {
  $('#messages').append($('<li>').text(msg));
  const scrollHeight = 500;
  $('#messages-wrapper')
    .animate({scrollTop: $('#messages-wrapper')
      .prop('scrollHeight')}, scrollHeight);
});
