const constants = require('./Constants/constants');

/**
 * Class ChatBot - basically controller that handles I/O
 */
class ChatBot {
  /**
   * ChatBot constructor
   * @constructor
   * @param {object} messageHandler
   * @param {object} bookingHandler
   */
  constructor(messageHandler, bookingHandler) {
    console.log('Bootstraping ChatBot...');

    console.log('[CHAT_BOT] Adding MessageHandler...');
    this.setMessageHandler(messageHandler);

    console.log('[CHAT_BOT] Adding BookingHandler...');
    this.setBookingHandler(bookingHandler);

    console.log(`[CHAT_BOT] Setting initial state to ${constants.information}`);
    this.setState(constants.information);

    console.log('ChatBot bootstrap completed! ChatBot is now active...');
  }

  /**
   * Get bot output message based on user input
   * @param {string} inputMsg
   * @returns {string}
   */
  getResponseMessage(inputMsg) {
    const messageHandler = this.getMessageHandler();
    const bookingHandler = this.getBookingHandler();

    const currentState = this.getState();
    let bookingScope = bookingHandler.getScope();

    // Response from MessageHandler
    const response = messageHandler.getResponseMessageObject(inputMsg, currentState, bookingScope);

    // If bot state is set to booking and status is ok we should probably update Booking data
    if (response.status === true && response.botState === constants.booking) {
      try {
        if (bookingScope !== null) {
          bookingHandler.setData(bookingScope, inputMsg);
          const bookingData = bookingHandler.getAllData();
          const bookingDataKeys = Object.keys(bookingData);
          const currentScopeIndex = bookingDataKeys.indexOf(bookingScope);

          bookingHandler.setScope(bookingDataKeys[currentScopeIndex + 1]); // Change scope to next step
        } else {
          // In case we switched from information state for the first time
          bookingHandler.setScope(constants.days);
        }
      } catch (error) {
        return error.message;
      }
    }

    // Let's update bot state
    this.setState(response.botState);

    let checkoutMessage = null;

    // Restart booking data if response has flag that it was last booking step
    if (response.restartBookingData) {
      bookingHandler.restartData();
    }

    // If scope is "checkout" get booking order information
    if (bookingHandler.getScope() === constants.checkout && this.getState() === constants.booking) {
      checkoutMessage = bookingHandler.getCheckoutMessage();
    }

    return checkoutMessage !== null ? `${checkoutMessage} ${response.message}` : response.message;
  }

  /**
   * Set MessageHandler
   * @param {MessageHandler|*} handler
   * @returns {ChatBot}
   */
  setMessageHandler(handler) {
    this.messageHandler = handler;

    return this;
  }

  /**
   * Get MessageHandler
   * @returns {MessageHandler|*}
   */
  getMessageHandler() {
    return this.messageHandler;
  }

  /**
   * Set BookingHandler
   * @param {BookingHandler|*} handler
   * @returns {ChatBot}
   */
  setBookingHandler(handler) {
    this.bookingHandler = handler;

    return this;
  }

  /**
   * Get BookingHandler
   * @returns {BookingHandler|*}
   */
  getBookingHandler() {
    return this.bookingHandler;
  }

  /**
   * Set bot state - information or booking
   * @param {string} state
   * @returns {ChatBot}
   */
  setState(state) {
    this.state = state;

    return this;
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
