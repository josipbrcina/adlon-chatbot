const constants = require('../Constants/constants');

/**
 * Class BookingHandler - responsible for handling booking data
 */
class BookingHandler {
  /**
   * BookingHandler constructor
   */
  constructor() {
    console.log('Bootstraping Booking handler...');

    console.log('[BOOKING_HANDLER] Setting initial booking data and scope...');
    this.scope = null;
    this.data = {
      date: null,
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
