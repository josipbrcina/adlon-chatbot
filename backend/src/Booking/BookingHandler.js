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
    console.log('[BOOKING_HANDLER] Bootstraping Booking handler...');

    console.log('[BOOKING_HANDLER] Setting initial booking data and scope...');
    this.scope = null;
    this.data = {
      days: 1,
      room: null,
      email: null,
      checkout: null,
      price: null,
    };

    console.log('[BOOKING_HANDLER] BookingHandler bootstraping completed!');
  }

  /**
   * Set current scope
   * @param scope
   * @return {BookingHandler}
   */
  setScope(scope) {
    this.scope = scope;

    return this;
  }

  /**
   * Reset Booking scope
   * @returns {BookingHandler}
   */
  resetScope() {
    this.scope = null;

    return this;
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
   * @param {string} key
   * @param {string|number} value
   * @return {BookingHandler}
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

    // Automatically calculate price if room type is set since days property was set before the room
    if (key === constants.room) {
      const deluxePrice = 330;
      const superiorPrice = 400;
      const executivePrice = 290;

      if (value.toLowerCase() === 'deluxe') {
        this.data[constants.price] = this.data[constants.days] * deluxePrice;
      }

      if (value.toLowerCase() === 'executive') {
        this.data[constants.price] = this.data[constants.days] * executivePrice;
      }

      if (value.toLowerCase() === 'superior' || value.toLowerCase() === 'superior deluxe') {
        this.data[constants.price] = this.data[constants.days] * superiorPrice;
      }
    }

    this.data[key] = value;

    return this;
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
      'days',
      'email',
      'room',
      'price',
    ];

    return keys.indexOf(key) !== -1;
  }

  /**
   * Clear booking data
   * @returns {BookingHandler}
   */
  restartData() {
    this.resetScope();
    this.data = {
      days: 1,
      room: null,
      email: null,
      checkout: null,
      price: null,
    };

    return this;
  }

  /**
   * Get output message of complete booking order
   * @returns {string}
   */
  getCheckoutMessage() {
    const data = this.getAllData();

    return `Hey Alice. You have requested to book a ${data[constants.room]} room for
    ${data[constants.days]} ${parseInt(data[constants.days]) === 1 ? 'day' : 'days'} and that will 
    cost you ${data[constants.price]}$. Your email for confirmation is ${data[constants.email]}.`;
  }
}

module.exports = BookingHandler;
