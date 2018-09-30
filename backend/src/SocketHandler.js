const MessageHandler = new(require('./Messages/MessageHandler'))();
const BookingHandler = new (require('./Booking/BookingHandler'))();

const ChatBot = new (require('./ChatBot'))(MessageHandler, BookingHandler);

/**
 * The SocketHandler class handles sockets
 */
class SocketHandler {
  /**
   * Logs that a user connected
   */
  onConnect(/* istanbul ignore next */{ c = console } = {}) {
    c.log('A user connected!');
  }

  /**
   * Logs that a user disconnected
   */
  onDisconnect(/* istanbul ignore next */{ c = console } = {}) {
    c.log('A user just disconnected...');
  }

  /**
   * Responds to a message
   */
  onMessage(/* istanbul ignore next */{ msg, socket, c = console } = {}) {
    c.log(`User sent message: ${msg}`);
    const responseMessage = ChatBot.getResponseMessage(msg);
    socket.emit('chat message', responseMessage);
  }
}

module.exports = SocketHandler;
