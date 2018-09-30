const assert = require('assert');
const MessageHandler = require('./../src/Messages/MessageHandler');
const BookingHandler = require('./../src/Booking/BookingHandler');
const ChatBot = require('./../src/ChatBot');

describe('ChatBot', () => {
  describe('#constructor', () => {
    it('should setup properly ChatBot instance', () => {
      const messageHandler = new MessageHandler();
      const bookingHandler = new BookingHandler();
      const chatBot = new ChatBot(messageHandler, bookingHandler);

      assert.equal(chatBot.getMessageHandler() instanceof MessageHandler, true);
      assert.equal(chatBot.getBookingHandler() instanceof BookingHandler, true);
    });
  });

  describe('#setMessageHandler and #getMessageHandler', () => {
    it('should set and return MessageHandler instance', () => {
      const messageHandler = new MessageHandler();
      const bookingHandler = new BookingHandler();
      const chatBot = new ChatBot(messageHandler, bookingHandler);

      assert.equal(chatBot.setMessageHandler(messageHandler) instanceof ChatBot, true);
      assert.equal(chatBot.getMessageHandler() instanceof MessageHandler, true);
    });
  });

  describe('#setBookingHandler and #getBookingHandler', () => {
    it('should set and return BookingHandler instance', () => {
      const messageHandler = new MessageHandler();
      const bookingHandler = new BookingHandler();
      const chatBot = new ChatBot(messageHandler, bookingHandler);

      assert.equal(chatBot.setBookingHandler(bookingHandler) instanceof ChatBot, true);
      assert.equal(chatBot.getBookingHandler() instanceof BookingHandler, true);
    });
  });

  describe('#setState and #getState', () => {
    it('should set and return ChatBot state', () => {
      const messageHandler = new MessageHandler();
      const bookingHandler = new BookingHandler();
      const chatBot = new ChatBot(messageHandler, bookingHandler);

      assert.equal(chatBot.setState('information') instanceof ChatBot, true);
      assert.equal(chatBot.getState(), 'information');
    });
  });

  describe('#getResponseMessage', () => {
    it('should return something went wrong', () => {
      const messageHandler = new MessageHandler();
      const bookingHandler = new BookingHandler();
      const chatBot = new ChatBot(messageHandler, bookingHandler);
      chatBot.setState('booking');

      assert.deepEqual('Ooops something went wrong...',
        chatBot.getResponseMessage('boo')
      );
    });
  });

  describe('#getResponseMessage', () => {
    it('should switch booking scope from days to room', () => {
      const messageHandler = new MessageHandler();
      const bookingHandler = new BookingHandler();
      bookingHandler.setScope('days');
      const chatBot = new ChatBot(messageHandler, bookingHandler);
      chatBot.setState('booking');
      chatBot.getResponseMessage('1');

      assert.equal(bookingHandler.getScope(), 'room');
    });

    it('should switch booking scope from null to days', () => {
      const messageHandler = new MessageHandler();
      const bookingHandler = new BookingHandler();
      const chatBot = new ChatBot(messageHandler, bookingHandler);
      chatBot.setState('information');
      chatBot.getResponseMessage('book room');

      assert.equal(bookingHandler.getScope(), 'days');
    });

    it('should restart booking data', () => {
      const messageHandler = new MessageHandler();
      const bookingHandler = new BookingHandler();
      bookingHandler.setScope('checkout');
      const chatBot = new ChatBot(messageHandler, bookingHandler);
      chatBot.setState('booking');
      chatBot.getResponseMessage('yes');

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

    it('should generate checkout message', () => {
      const messageHandler = new MessageHandler();
      const bookingHandler = new BookingHandler();
      bookingHandler.setScope('email');
      bookingHandler.setData('room', 'deluxe');
      const chatBot = new ChatBot(messageHandler, bookingHandler);
      chatBot.setState('booking');
      const responseMessage = chatBot.getResponseMessage('foo@foo.com');
      const messageToAppend = 'If you want to confirm your booking order type in "YES" please or' +
        ' if not you can cancel it by writing down "NO" or "CANCEL"';

      assert.equal(bookingHandler.getScope(), 'checkout');
      assert.deepEqual(
        `${bookingHandler.getCheckoutMessage()} ${messageToAppend}`,
        responseMessage
      )
    });

    it('should catch error and return error message', () => {
      const messageHandler = new MessageHandler();
      const bookingHandler = new BookingHandler();
      bookingHandler.setScope('foo');
      bookingHandler.setData('room', 'deluxe');
      const chatBot = new ChatBot(messageHandler, bookingHandler);
      chatBot.setState('booking');
      const responseMessage = chatBot.getResponseMessage('foo@foo.com');

      assert.equal('Invalid booking property provided!', responseMessage)
    });
  });
});
