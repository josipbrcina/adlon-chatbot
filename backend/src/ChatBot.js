const constants = require('./Constants/constants');

/**
 * Class ChatBot - basically controller that handles I/O
 */
class ChatBot {
  constructor(messageHandler, bookingHandler) {
    console.log('Bootstraping ChatBot...');

    console.log('[CHAT_BOT] Adding MessageHandler...');
    this.setMessageHandler(messageHandler);

    console.log('[CHAT_BOT] Adding BookingHandler...');
    this.setBookingHandler(bookingHandler);

    console.log(`[CHAT_BOT] Setting initial state to ${constants.information}`);
    this.currentState = constants.information;

    console.log('ChatBot bootstrap complete. ChatBot is now active...');
  }

  getResponseMessage(inputMsg) {
    return `Hey Alice, you said ${inputMsg} and I'm not fully functional atm sorry...`;
  }

  setMessageHandler(handler) {
    this.messageHandler = handler;
  }

  getMessageHandler() {
    return this.messageHandler;
  }

  setBookingHandler(handler) {
    this.bookingHandler = handler;
  }

  getBookingHandler() {
    return this.bookingHandler;
  }
}

module.exports = ChatBot;
