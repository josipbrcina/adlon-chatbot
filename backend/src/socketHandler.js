/**
  * The SocketHandler class handles sockets
  */
class SocketHandler {

  /**
    * Creates a new SocketHandler
    */
  constructor() {}

  /**
    * Logs that a user connected
    */
  onConnect(/* istanbul ignore next */{c = console} = {}){
    c.log('a user connected');
  }

  /**
    * Logs that a user disconnected
    */
  onDisconnect(/* istanbul ignore next */{c = console} = {}){
    c.log('a user disconnected');
  }

  /**
    * Responds to a message
    */
  onMessage(/* istanbul ignore next */{msg, socket, c = console} = {}){
    c.log('message: ' + msg);
    let reply = 'Sorry, I do not understand this';
    switch (msg.replace(/\s/gi,'').toLowerCase()) {
      case 'hello':
        reply = 'Hey Alice';
        break;
    }
    socket.emit('chat message', reply);
  }

}

exports.SocketHandler = SocketHandler;
