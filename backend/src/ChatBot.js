const constants = require('./Constants/constants');

/**
 * Class ChatBot - basically controller that handles I/O
 */
class ChatBot {
  /**
   * ChatBot constructor
   * @constructor
   * @param messageHandler
   * @param bookingHandler
   */
  constructor(messageHandler, bookingHandler) {
    console.log('Bootstraping ChatBot...');

    console.log('[CHAT_BOT] Adding MessageHandler...');
    this.setMessageHandler(messageHandler);

    console.log('[CHAT_BOT] Adding BookingHandler...');
    this.setBookingHandler(bookingHandler);

    console.log(`[CHAT_BOT] Setting initial state to ${constants.information}`);
    this.setState(constants.information);

    console.log('ChatBot bootstrap complete. ChatBot is now active...');
  }

  getResponseMessage(inputMsg) {
    const messageHandler = this.getMessageHandler();
    const bookingHandler = this.getBookingHandler();

    const currentState = this.getState();
    let bookingScope = bookingHandler.getScope();

    const response = messageHandler.getResponseMessageObject(inputMsg, currentState, bookingScope);

    if (response.status === true && response.botState === constants.booking) {
      try {
        // In case of first time switch from information to booking process
        bookingScope = bookingScope === null ? constants.email : bookingScope;

        bookingHandler.setData(bookingScope, inputMsg);
        const bookingData = bookingHandler.getAllData();
        const bookingDataKeys = Object.keys(bookingData);
        const currentScopeIndex = bookingDataKeys.indexOf(bookingScope);

        bookingData.setScope(bookingDataKeys[currentScopeIndex + 1]); // Change scope to next step
      } catch (error) {
        return error.message;
      }
    }

    this.setState(response.botState);

    return response.message;
  }

  /**
   * Set MessageHandler
   * @param handler
   */
  setMessageHandler(handler) {
    this.messageHandler = handler;
  }

  /**
   * Get MessageHandler
   * @returns {object}
   */
  getMessageHandler() {
    return this.messageHandler;
  }

  /**
   * Set BookingHandler
   * @param {object} handler
   */
  setBookingHandler(handler) {
    this.bookingHandler = handler;
  }

  /**
   * Get BookingHandler
   * @returns {object}
   */
  getBookingHandler() {
    return this.bookingHandler;
  }

  /**
   * Set bot state - information or booking
   * @param {string} state
   */
  setState(state) {
    this.state = state;
  }

  /**
   * Get current bot state
   * @returns {string}
   */
  getState() {
    return this.state;
  }
}

module.exports = ChatBot;
