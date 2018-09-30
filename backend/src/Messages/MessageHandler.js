const messages = require('./messages');
const constants = require('../Constants/constants');

/**
 * Class MessageHandler used for parsing user I/O
 */
class MessageHandler {
  /**
   * MessageHandler Constructor
   * @constructor
   */
  constructor() {
    console.log('Bootstraping Message Handler...');

    console.log('[MESSAGE_HANDLER] Adding information messages...');
    this.setInformationMessages(messages.information.messages);

    console.log('[MESSAGE_HANDLER] Adding information fallback messages...');
    this.setInformationFallbacks(messages.information.fallbacks);

    console.log('[MESSAGE_HANDLER] Adding booking messages...');
    this.setBookingMessages(messages.booking.messages);

    console.log('[MESSAGE_HANDLER] Adding booking fallback messages...');
    this.setBookingFallbacks(messages.booking.fallbacks);

    console.log('MessageHandler bootstraping finished!');
  }

  /**
   * Get appropriate response object with message and status TRUE|FALSE depending on message
   * response. If it's matched regex it's true if not it's a fallback and that's false. That depends
   * on current bot state (information or booking) and user input message
   * @param inputMsg
   * @param scope
   * @param bookingScope
   */
  getResponseMessageObject(inputMsg, scope, bookingScope = null) {
    /* Default output - status flag is used so ChatBot can know should he update maybe booking data
     via booking handler in case bot state is in booking mode */
    let output = {
      message: 'Oops something went wrong...',
      status: false,
    };

    let messages = {};
    let fallbacks = {};

    switch (scope) {
      case constants.information: {
        messages = this.getInformationMessages();
        fallbacks = this.getInformationFallbacks();
        break;
      }

      case constants.booking: {
        messages = this.getBookingMessages();
        fallbacks = this.getBookingFallbacks();
        break;
      }

      default: {
        return output;
      }
    }

    const foundExpression = this.matchExpression(inputMsg, messages);

    // Set random message from list of messages and appropriate status
    if (typeof foundExpression !== 'undefined') {
      output.message = foundExpression.messages[Math.floor(Math.random() * foundExpression.messages.length)];
      output.status = true;
    } else {
      output.message = scope === constants.information ?
        fallbacks[Math.floor(Math.random() * fallbacks.length)] :
        bookingScope !== null ?
          fallbacks[bookingScope] :
          'Ooops something went wrong...';
    }

    return output;
  }

  /**
   * Check if message matches any defined regex
   * @param {string} inputMsg
   * @param {Array} messages
   */
  matchExpression(inputMsg, messages) {
    return messages.find(message => message.regex.test(inputMsg) === true);
  }

  /**
   * Set information messages
   * @param {object} informationMessagesObject
   */
  setInformationMessages(informationMessagesObject) {
    this.informationMessages = informationMessagesObject;
  }

  /**
   * Get information messages
   * @returns {object}
   */
  getInformationMessages() {
    return this.informationMessages;
  }

  /**
   * Set booking messages
   * @param {object} informationMessagesObject
   */
  setBookingMessages(informationMessagesObject) {
    this.bookingMessages = informationMessagesObject;
  }

  /**
   * Get booking messages
   * @returns {object}
   */
  getBookingMessages() {
    return this.bookingMessages;
  }

  /**
   * Set information fallback messages
   * @param {object} fallbacks
   */
  setInformationFallbacks(fallbacks = []) {
    this.informationFallbacks = fallbacks;
  }

  /**
   * Get information fallback messages
   * @returns {object}
   */
  getInformationFallbacks() {
    return this.informationFallbacks;
  }

  /**
   * Set booking fallback messages
   * @param {object} bookingFallbacksObject
   */
  setBookingFallbacks(bookingFallbacksObject = {}) {
    this.bookingFallbacks = bookingFallbacksObject;
  }

  /**
   * Get information fallback messages
   * @returns {object}
   */
  getBookingFallbacks() {
    return this.bookingFallbacks;
  }
}

module.exports = MessageHandler;
