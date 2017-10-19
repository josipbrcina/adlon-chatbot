var assert = require('assert');
var sinon = require('sinon');
var SocketHandler = require('./../src/socketHandler');

describe('SocketHandler', function() {
  describe('#onConnect', function() {
    it('should log "a user connected"', function() {
      const c = { log: sinon.spy() };
      const socketHandler = new SocketHandler.SocketHandler();
      socketHandler.onConnect({c})
      assert.equal(c.log.callCount, 1 , "console.log has no been called exactly one times");
      assert.equal(c.log.getCall(0).args[0], 'a user connected', 'Inappropriate message logged');
    });
  });

  describe('#onDisconnect', function() {
    it('should log "a user disconnected"', function() {
      const c = { log: sinon.spy() };
      const socketHandler = new SocketHandler.SocketHandler();
      socketHandler.onDisconnect({c})
      assert.equal(c.log.callCount, 1 , "console.log has no been called exactly one times");
      assert.equal(c.log.getCall(0).args[0], 'a user disconnected', 'Inappropriate message logged');
    });
  });

  describe('#onMessage', function() {
    it('should respond with "Sorry, I do not understand this" by default', function() {
      const input = {
        msg: '',
        socket: {
          emit: sinon.spy()
        },
        c: { log: sinon.spy() }
      }
      const socketHandler = new SocketHandler.SocketHandler();
      socketHandler.onMessage(input)
      assert.equal(input.c.log.callCount, 1 , "console.log has no been called exactly one times");
      assert.equal(input.c.log.getCall(0).args[0], 'message: ', 'Inappropriate message logged');
      assert.equal(input.socket.emit.callCount, 1 , "console.log has no been called exactly one times");
      assert.equal(input.socket.emit.getCall(0).args[0], 'chat message', 'Wrong event emitted on socket');
      assert.equal(input.socket.emit.getCall(0).args[1], 'Sorry, I do not understand this', 'Wrong reply emitted on socket');
    });

    it('should respond with "Hey Alice', function() {
      const input = {
        msg: 'Hel l o',
        socket: {
          emit: sinon.spy()
        },
        c: { log: sinon.spy() }
      }
      const socketHandler = new SocketHandler.SocketHandler();
      socketHandler.onMessage(input)
      assert.equal(input.c.log.callCount, 1 , "console.log has no been called exactly one times");
      assert.equal(input.c.log.getCall(0).args[0], 'message: Hel l o', 'Inappropriate message logged');
      assert.equal(input.socket.emit.callCount, 1 , "console.log has no been called exactly one times");
      assert.equal(input.socket.emit.getCall(0).args[0], 'chat message', 'Wrong event emitted on socket');
      assert.equal(input.socket.emit.getCall(0).args[1], 'Hey Alice', 'Wrong reply emitted on socket');
    });
  });
});
