const messages = require('./messages');
const constants = require('../Constants/constants');

/**
 * Class MessageHandler used for parsing user I/O
 */
class MessageHandler {
  /**
   * MessageHandler Constructor
   */
  constructor() {
    console.log('Bootstraping Message Handler...');

    console.log('[MESSAGE_HANDLER] Adding information messages...');
    this.information = messages.information.messages;

    console.log('[MESSAGE_HANDLER] Adding booking messages...');
    this.booking = messages.booking.messages;

    console.log('MessageHandler bootstraping finished!');
  }

  /**
   * Get appropriate response message based on user input and current bot status
   * @param msg
   * @param scope
   * @param bookingLevel
   */
  getResponseMessage(msg, scope, bookingLevel = null) {

  }

  /**
   * Check if message matches defined regex
   * @param msg
   * @param regex
   */
  validateRegex(msg, regex) {

  }
}

module.exports = MessageHandler;
