const assert = require('assert');
const BookingHandler = require('./../src/Booking/BookingHandler');

describe('BookingHandler', () => {
  describe('#setScope', () => {
    it('should set "days"', () => {
      const bookingHandler = new BookingHandler();
      bookingHandler.setScope('days');
      assert.equal(bookingHandler.getScope(), 'days');
    });
  });

  describe('#getScope', () => {
    it('should return "email"', () => {
      const bookingHandler = new BookingHandler();
      bookingHandler.setScope('email');
      assert.equal(bookingHandler.getScope(), 'email');
    });
  });

  describe('#setData', () => {
    it('should set days to 3', () => {
      const bookingHandler = new BookingHandler();
      bookingHandler.setData('days', 3);
      assert.equal(bookingHandler.getData('days'), 3);
    });

    it('should set room to "deluxe"', () => {
      const bookingHandler = new BookingHandler();
      bookingHandler.setData('room', "deluxe");
      assert.equal(bookingHandler.getData('room'), "deluxe");
    });

    it('should set price automatically after room is set', () => {
      const bookingHandler = new BookingHandler();
      bookingHandler.setData('room', "deluxe");
      assert.equal(bookingHandler.getData('price'), 330);
      bookingHandler.setData('room', 'executive');
      assert.equal(bookingHandler.getData('price'), 290);
      bookingHandler.setData('room', 'superior deluxe');
      assert.equal(bookingHandler.getData('price'), 400);
    });

    it('should set email', () => {
      const bookingHandler = new BookingHandler();
      bookingHandler.setData('email', "test@test.com");
      assert.equal(bookingHandler.getData('email'), "test@test.com");
    });

    it('should throw Error - INVALID EMAIL FORMAT', () => {
      const bookingHandler = new BookingHandler();
      try {
        bookingHandler.setData('email', "test.com");
      } catch (error) {
        assert.equal(error.message, 'Invalid email format! Please try again!')
      }
    });

    it('should throw Error - INVALID EMAIL FORMAT', () => {
      const bookingHandler = new BookingHandler();
      try {
        bookingHandler.setData('email', "test.com");
      } catch (error) {
        assert.equal(error.message, 'Invalid email format! Please try again!')
      }
    });

    it('should throw Error - INVALID KEY PROVIDED', () => {
      const bookingHandler = new BookingHandler();
      try {
        bookingHandler.setData('foo', "test.com");
      } catch (error) {
        assert.equal(error.message, 'Invalid booking property provided!')
      }
    });
  });

  describe('#getData', () => {
    it('should return throw error - invalid key provided', () => {
      const bookingHandler = new BookingHandler();
      try {
        bookingHandler.getData('foo');
      } catch (error) {
        assert.equal(error.message, 'That key doesn\'t exist!');
      }
    });
  });

  describe('#getAllData', () => {
    it('should return All Booking data (OBJECT)', () => {
      const bookingHandler = new BookingHandler();
      assert.deepEqual(
        bookingHandler.getAllData(),
        {
          days: 1,
          room: null,
          email: null,
          checkout: null,
          price: null,
        }
      )
    });
  });

  describe('#validateKey', () => {
    it('should return false - KEY DOES NOT EXIST', () => {
      const bookingHandler = new BookingHandler();
      assert.equal(bookingHandler.validateKey('foo'), false);
    });
  });

  describe('#getCheckoutMessage', () => {
    it('should return checkout message summary', () => {
      const bookingHandler = new BookingHandler();
      assert.equal(typeof bookingHandler.getCheckoutMessage(), 'string');
    });
  });

  describe('#restartData', () => {
    it('should restart all booking data', () => {
      const bookingHandler = new BookingHandler();
      bookingHandler.setScope('room');
      bookingHandler.setData('days', 2);
      bookingHandler.restartData();
      assert.equal(bookingHandler.getScope(), null);
      assert.deepEqual(
        bookingHandler.getAllData(),
        {
          days: 1,
          room: null,
          email: null,
          checkout: null,
          price: null,
        }
      )
    });
  });
});
