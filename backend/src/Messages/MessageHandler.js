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
    console.log('[MESSAGE_HANDLER] Bootstraping Message Handler...');

    console.log('[MESSAGE_HANDLER] Adding information messages...');
    this.setInformationMessages(messages.information.messages);

    console.log('[MESSAGE_HANDLER] Adding information fallback messages...');
    this.setInformationFallbacks(messages.information.fallbacks);

    console.log('[MESSAGE_HANDLER] Adding booking messages...');
    this.setBookingMessages(messages.booking.messages);

    console.log('[MESSAGE_HANDLER] Adding booking fallback messages...');
    this.setBookingFallbacks(messages.booking.fallbacks);

    console.log('[MESSAGE_HANDLER] MessageHandler bootstraping completed!');
  }

  /**
   * Get appropriate response object with message and status TRUE|FALSE depending on message
   * response. If it's matched regex it's true if not it's a fallback and that's false. That depends
   * on current bot state (information or booking) and user input message
   * @param {string} inputMsg
   * @param {string} chatBotState
   * @param {string|null} bookingScope
   */
  getResponseMessageObject(inputMsg, chatBotState, bookingScope = null) {
    /* Default output - status flag is used so ChatBot can know should he update maybe booking data
     via booking handler in case bot state is in booking mode. */
    let output = {
      message: 'Oops something went wrong...',
      status: false,
      botState: constants.information,
    };

    let messages = [];
    let fallbacks = {};

    switch (chatBotState) {
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
      output.botState = foundExpression.botState || constants.information;
      output.restartBookingData = foundExpression.restartBookingData || false;
      // If it's last step of booking state, modify response message depending on user input
      if (output.restartBookingData === true &&
        (inputMsg.toLowerCase() === 'yes' || inputMsg.toLowerCase() === 'confirm')
      ) {
        output.message = `Thank you so much for booking a room in our hotel! ${output.message}`;
      }
      if (output.restartBookingData === true &&
        (inputMsg.toLowerCase() === 'no' || inputMsg.toLowerCase() === 'cancel')
      ) {
        output.message = `YOUR BOOKING ORDER WAS SUCCESSFULLY CANCELED! ${output.message}`;
      }
    } else {
      // If user input did not match any defined regex send fallback message as response
      output.message = chatBotState === constants.information ?
        fallbacks[Math.floor(Math.random() * fallbacks.length)] :
        bookingScope !== null ?
          fallbacks[bookingScope].messages[Math.floor(Math.random() * fallbacks[bookingScope].messages.length)] :
          'Ooops something went wrong...';
      output.botState = chatBotState === constants.information ?
        constants.information :
        constants.booking;
    }

    return output;
  }

  /**
   * Check if message matches any defined regex
   * @param {string} inputMsg
   * @param {Array} messages
   * @return {object|undefined}
   */
  matchExpression(inputMsg, messages = []) {
    return messages.find(message => message.regex.test(inputMsg) === true);
  }

  /**
   * Set information messages
   * @param {object} informationMessagesObject
   * @return {MessageHandler}
   */
  setInformationMessages(informationMessagesObject) {
    this.informationMessages = informationMessagesObject;

    return this;
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
   * @return {MessageHandler}
   */
  setBookingMessages(informationMessagesObject) {
    this.bookingMessages = informationMessagesObject;

    return this;
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
   * @return {MessageHandler}
   */
  setInformationFallbacks(fallbacks = []) {
    this.informationFallbacks = fallbacks;

    return this;
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
   * @return {MessageHandler}
   */
  setBookingFallbacks(bookingFallbacksObject = {}) {
    this.bookingFallbacks = bookingFallbacksObject;

    return this;
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
