const messages = {
  information: {
    messages: {},
    fallbacks: []
  },
  booking: {
    messages: {},
    fallbacks: {
      scope: {
        date: {
          submitted: [],
          notSubmitted: []
        },
        room: {
          submitted: [],
          notSubmitted: []
        },
        email: {
          submitted: [],
          notSubmitted: []
        },
        price: {
          submitted: [],
          notSubmitted: []
        }
      }
    }
  }
};

module.exports = messages;
