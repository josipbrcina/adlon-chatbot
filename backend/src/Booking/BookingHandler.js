const constants = require('../Constants/constants');

/**
 * Class BookingHandler - responsible for handling booking data
 */
class BookingHandler {
  /**
   * BookingHandler constructor
   * @constructor
   */
  constructor() {
    console.log('Bootstraping Booking handler...');

    console.log('[BOOKING_HANDLER] Setting initial booking data and scope...');
    this.scope = null;
    this.data = {
      days: null,
      email: null,
      room: null,
      price: null
    };

    console.log('BookingHandler bootstraping finished!');
  }

  /**
   * Set current scope
   * @param scope
   */
  setScope(scope) {
    this.scope = scope;
  }

  /**
   * Get current scope
   * @returns {null|*}
   */
  getScope() {
    return this.scope;
  }

  /**
   * Set booking data
   * @param key
   * @param value
   */
  setData(key, value) {
    if (!this.validateKey(key)) {
      throw new Error('Invalid booking property provided!');
    }
    if (key === constants.email) {
      const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; // eslint-disable-line
      if (emailRegex.test(value) === false) {
        throw new Error('Invalid email format! Please try again!');
      }
    }
    this.data[key] = value;
  }

  /**
   * Get booking data
   * @param key
   * @returns {*}
   */
  getData(key) {
    if (!this.validateKey(key)) {
      throw new Error('That key doesn\'t exist!');
    }
    return this.data[key];
  }

  /**
   * Get full data object
   * @returns {object}
   */
  getAllData() {
    return this.data;
  }

  /**
   * Validate booking key
   * @param key
   * @returns {boolean}
   */
  validateKey(key) {
    const keys = [
      'date',
      'email',
      'room',
      'price'
    ];

    return keys.indexOf(key) !== -1;
  }
}

module.exports = BookingHandler;
