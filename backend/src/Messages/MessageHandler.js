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
    let messages = {};
    let fallbacks = {};
    let output = {
      message: 'Hmm something went wrong...',
      status: false,
    };

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

    const foundExpression = this.matchExpression(inputMsg, Object.keys(messages));

    if (foundExpression) {
      output.message = messages[foundExpression][Math.floor(Math.random() * fallbacks.length)];
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
   * @param {Array} expressions
   */
  matchExpression(inputMsg, expressions = []) {
    let foundExpression = null;

    expressions.map(expression => {
      if (expression.test(inputMsg) === true) {
        foundExpression = expression;
      }
    });

    return foundExpression;
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
