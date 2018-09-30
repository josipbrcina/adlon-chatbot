const assert = require('assert');
const MessageHandler = require('./../src/Messages/MessageHandler');

describe('MessageHandler', () => {
  describe('#matchExpression', () => {
    it('should return match', () => {
      const messageHandler = new MessageHandler();
      const informationMessages = messageHandler.getInformationMessages();

      assert.deepEqual(
        messageHandler.matchExpression('hello', informationMessages),
        {
          regex: /^.*?\b(hi|hello|yo|hey)\b.*?$/mi,
          messages: [
            'Hello Alice, my name is Peter, I\'m Adlon bot! Nice to meet you!',
            'Hi Alice, how can I help you!',
            'Hey Alice, how\'s going? Tell me, are you interested in something about our hotel?'
          ],
        }
      );
    });

    it('should return undefined', () => {
      const messageHandler = new MessageHandler();
      const informationMessages = messageHandler.getInformationMessages();
      const matched = messageHandler.matchExpression('fooo', informationMessages);

      assert.equal(typeof matched, 'undefined');
    });
  });

  describe('#setInformationMessages and #getInformationMessages', () => {
    it('should set and return empty array', () => {
      const messageHandler = new MessageHandler();
      messageHandler.setInformationMessages();

      assert.deepEqual([], messageHandler.getInformationMessages());
    });
  });

  describe('#setBookingMessages and #getBookingMessages', () => {
    it('should set and return an array with one item', () => {
      const messageHandler = new MessageHandler();

      assert.equal(messageHandler.setBookingMessages(['foo']) instanceof MessageHandler, true);
      assert.deepEqual(['foo'], messageHandler.getBookingMessages());
    });
  });

  describe('#setInformationCallbacks and #getInformationCallbacks', () => {
    it('should set and return an array with one item', () => {
      const messageHandler = new MessageHandler();

      assert.equal(messageHandler.setInformationFallbacks(['foo']) instanceof MessageHandler, true);
      assert.deepEqual(['foo'], messageHandler.getInformationFallbacks());
    });
  });

  describe('#setBookingCallbacks and #getBookingCallbacks', () => {
    it('should set and return an object with booking fallbacks', () => {
      const messageHandler = new MessageHandler();
      messageHandler.setBookingFallbacks({
        days: {
          messages: [
            'testing'
          ]
        },
        room: {},
      });

      assert.deepEqual({
        days: {
          messages: [
            'testing'
          ]
        },
        room: {},
      }, messageHandler.getBookingFallbacks());
    });
  });

  describe('#getResponseMessageObject', () => {
    it('should return default output', () => {
      const messageHandler = new MessageHandler();

      assert.deepEqual({
          message: 'Oops something went wrong...',
          status: false,
          botState: 'information',
        },
        messageHandler.getResponseMessageObject('foo', 'foo')
      );
    });

    it('should return default output', () => {
      const messageHandler = new MessageHandler();

      assert.deepEqual({
          message: 'Oops something went wrong...',
          status: false,
          botState: 'information',
        },
        messageHandler.getResponseMessageObject('foo', 'foo')
      );
    });

    it('should return final success output', () => {
      const messageHandler = new MessageHandler();

      assert.deepEqual({
          message: 'Thank you so much for booking a room in our hotel! == Thank you for talking ' +
          'with me, I am Peter, AdlonBot for Adlon Kemplinski Berlin! ' +
          'Can I help you with anything else? ==',
          status: true,
          botState: 'information',
          restartBookingData: true,
        },
        messageHandler.getResponseMessageObject('yes', 'booking')
      );
    });

    it('should return final cancel output', () => {
      const messageHandler = new MessageHandler();

      assert.deepEqual({
          message: 'YOUR BOOKING ORDER WAS SUCCESSFULLY CANCELED! == Thank you for talking ' +
          'with me, I am Peter, AdlonBot for Adlon Kemplinski Berlin! Can I help you ' +
          'with anything else? ==',
          status: true,
          botState: 'information',
          restartBookingData: true,
        },
        messageHandler.getResponseMessageObject('cancel', 'booking')
      );
    });

    it('should return fallback not found msg output', () => {
      const messageHandler = new MessageHandler();

      assert.deepEqual({
          message: 'Ooops something went wrong...',
          status: false,
          botState: 'booking',
        },
        messageHandler.getResponseMessageObject('boo', 'booking')
      );
    });
  });
});
