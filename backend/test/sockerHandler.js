const assert = require('assert');
const sinon = require('sinon');
const SocketHandler = require('./../src/SocketHandler');

describe('SocketHandler', () => {
  describe('#onConnect', () => {
    it('should log "A user connected!"', () => {
      const c = { log: sinon.spy() };
      const socketHandler = new SocketHandler();
      socketHandler.onConnect({c});
      assert.equal(c.log.callCount, 1 , "console.log has no been called exactly one times");
      assert.equal(c.log.getCall(0).args[0], 'A user connected!', 'Inappropriate message logged');
    });
  });

  describe('#onDisconnect', () => {
    it('should log "A user just disconnected..."', () => {
      const c = { log: sinon.spy() };
      const socketHandler = new SocketHandler();
      socketHandler.onDisconnect({c});
      assert.equal(c.log.callCount, 1 , "console.log has no been called exactly one times");
      assert.equal(c.log.getCall(0).args[0], 'A user just disconnected...', 'Inappropriate message logged');
    });
  });

  describe('#onMessage', () => {
    it('should respond with SERVICES MESSAGE"', () => {
      const input = {
        msg: 'hey',
        socket: {
          emit: sinon.spy()
        },
        c: { log: sinon.spy() }
      };
      const socketHandler = new SocketHandler();
      socketHandler.onMessage(input);
      assert.equal(input.c.log.callCount, 1 , "console.log has no been called exactly one times");
      assert.equal(
        input.c.log.getCall(0).args[0],
        'User sent message: hey', 'Inappropriate message logged'
      );
    });
  });
});
