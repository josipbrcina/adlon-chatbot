const constants = require('../Constants/constants');

const messages = {
  information: {
    messages: [
      {
        regex: /^.*?\b(hi|hello|yo|hey)\b.*?$/mi,
        messages: [
          'Hello Alice, my name is Peter, I\'m Adlon bot! Nice to meet you!',
          'Hi Alice, how can I help you!',
          'Hey Alice, how\'s going? Tell me, are you interested in something about our hotel?'
        ],
      },
      {
        regex: /^.*?\b(bye|goodbye|cya)\b.*?$/mi,
        messages: [
          'Bye bye Alice. Until next time...',
          'Byee... I am so lonely sometimes',
          'Cya Alice. Have a nice day!',
          'Goodbye to you too.'
        ],
      },
      {
        regex: /^.*?\b(computer|bot|machine)\b.*?$/mi,
        messages: [
          'Do computers worry you?',
          'I am machine but I am here to help you so do not worry Alice!',
          'Why do you mention computers?',
          'What do you think machines have to do with your problem?',
        ],
      },
      {
        regex: /^.*?\b(room|rooms)\b.*?\b(type|types)\b.*?$/mi,
        messages: [
          'We have 3 types of rooms available for booking! Executive, Deluxe and Superior Deluxe',
          'I see, well we do have Executive, Deluxe, Superior Deluxe rooms.'
        ]
      },
      {
        regex: /^.*?\b(room|rooms)\b.*?\b(price|prices)\b.*?$/mi,
        messages: [
          'Executive room cost 290$, Deluxe 330$ and Superior Deluxe 400$'
        ]
      },
      {
        regex: /^.*?\b(price|prices)\b.*?\b(room|rooms)\b.*?$/mi,
        messages: [
          'Executive room cost 290$, Deluxe 330$ and Superior Deluxe 400$'
        ]
      },
      {
        regex: /^.*?\b(wellness|spa)\b.*?$/mi,
        messages: [
          'Our hotel provides many interesting services for relaxing. We do have spa center with' +
          ' different body treatments, massages, facials, sauna, yoga etc...'
        ]
      },
      {
        regex: /^.*?\b(gym|fitness)\b.*?$/mi,
        messages: [
          'Stay fit and healthy in our state-of-the-art gymnasium. ' +
          'The Fitness Centre is open 24 hours.'
        ]
      },
      {
        regex: /^.*?\b(pool|swimming|swim)\b.*?$/mi,
        messages: [
          'Our hotel provides heated indoor pool area and sauna where you can relax. ' +
          'The Pool & Sauna is open daily from 6:00 a.m. to 10:00 p.m.'
        ]
      },
      {
        regex: /^.*?\b(services|service)\b.*?$/mi,
        messages: [
          'If you did not know we provide many different services including limousine service ' +
          'city tour, business center, jogging map, concierge service and many more...'
        ]
      },
      {
        regex: /^.*?\b(bar|bars|restaurant|restaurants)\b.*?$/mi,
        messages: [
          'At Hotel Adlon Kempinski, you can embark on a journey of endless culinary possibilities.' +
          'We do have lobby lounge and bar, sra bua bar where you can enjoy eastern mood with great' +
          'delicious Asian food, adlon to go if you need coffee to go maybe, restaurant QUARRÉ and' +
          'many more...'
        ]
      },
      {
        regex: /^.*?\b(reserve|book|reservation|booking)\b.*?(room|rooms)\b.*?$/mi,
        messages: [
          'Can you please tells us how many days do you want to stay? We have free rooms for' +
          ' the next 3 days? Hint: You can answer with simple number like 1, 2 or 3',
          'We have got free rooms for the next 3 days? How many days do you want 1, 2 or 3?'
        ],
        botState: constants.booking
      },
      {
        regex: /^.*?\b(room|rooms)\b.*?(reserve|book|reservation|booking)\b.*?$/mi,
        messages: [
          'Can you please tells us how many days do you want to stay? We have free rooms for' +
          ' the next 3 days? Hint: You can answer with simple number like 1, 2 or 3',
          'We have got free rooms for the next 3 days? How many days do you want 1, 2 or 3?'
        ],
        botState: constants.booking
      }
    ],
    fallbacks: [
      'Very interesting but i think I can not understand you? Anything else maybe?',
      'I am not sure I understand you fully',
      'Maybe I am wrong but I do not understand you unfortunately, try again please?',
      'Please can you rephrase cause I do not understand, I am really sorry for that.',
      'Thank you for your interest but I don\'t get it? Try to rephrase a question maybe?'
    ]
  },
  booking: {
    messages: [
      {
        regex: /^\b([123])\b$/mi,
        messages: [
          'Can you please choose your room type? (Executive, Deluxe, Superior)',
          'Do you want Executive, Deluxe or Superior Deluxe room?'
        ],
        botState: constants.booking,
      },
      {
        regex: /^\b(executive|deluxe|superior|superior deluxe)\b$/mi,
        messages: [
          'Please, type in your email address so we can proceed.',
          'Can you please type in your email.',
          'We need your email to finish registration, can you please type in you email address?'
        ],
        botState: constants.booking,
      },
      {
        regex: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, // eslint-disable-line
        messages: [
          'If you want to confirm your booking order type in "YES" please or if not you can' +
          ' cancel it by writing down "NO" or "CANCEL"'
        ],
        botState: constants.booking,
      },
      {
        regex: /^.*?\b(yes|confirm|cancel|no)\b.*?$/mi,
        messages: [
          '== Thank you for talking with me, I am Peter, AdlonBot for Adlon Kemplinski Berlin!' +
          ' Can I help you with anything else? =='
        ],
        botState: constants.information,
        restartBookingData: true,
      }
    ],
    fallbacks: {
      days: {
        messages: [
          'Sorry but you need to type in days in format 1, 2 or 3. It\'s up to you!',
          'You did not enter valid number of days. So sorry. Try again.'
        ]
      },
      room: {
        messages: [
          'Hey, u need to provide us room type. We have Executive, Deluxe and Superior Deluxe?',
          'Please tell me which room type do you want: Executive, Deluxe or Superior Deluxe'
        ]
      },
      email: {
        messages: [
          'Hmm, it seems you entered invalid email format? Can you check again?',
          'Wrong email format I am afraid so. Please try again! Thank you!',
        ]
      },
      checkout: {
        messages: [
          'Please can you tell me do you agree with booking (YES) or should we cancel order (NO)',
          'I\'m afraid I do not understand. Should we confirm order or cancel it? (YES-NO)'
        ]
      }
    }
  }
};

module.exports = messages;
