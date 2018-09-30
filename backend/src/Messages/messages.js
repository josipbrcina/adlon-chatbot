const messages = {
  information: {
    messages: {
      '^.*?\b(hi|hello|yo|hey)\b.*?$/mi': [
        'Hello Alice, my name is Peter, I\'m Adlon bot! Nice to meet you!',
        'Hi Alice, how can I help you!',
        'Hey Alice, how\'s going? Tell me, are you interested in something about our hotel?'
      ],
      '^.*?\b(computer|bot|machine)\b.*?$/mi': [
        'Do computers worry you?',
        'I am machine but I am here to help you so do not worry Alice?',
        'Why do you mention computers?',
        'What do you think machines have to do with your problem?',
      ],
      '^.*?\b(room|rooms)\b.*?\b(type|types)\b.*?$/mi': [
        'We have 3 types of rooms available for booking! Executive, Deluxe and Superior Deluxe',
        'I see, well we do have Executive, Deluxe, Superior Deluxe rooms.'
      ],
      '^.*?\b(room|rooms)\b.*?\b(price|prices)\b.*?$/mi': [
        'Executive room cost 290$, Deluxe 330$ and Superior Deluxe 400$'
      ],
      '^.*?\b(price|prices)\b.*?\b(room|rooms)\b.*?$/mi': [
        'Executive room cost 290$, Deluxe 330$ and Superior Deluxe 400$'
      ],
      '^.*?\b(wellness|spa)\b.*?$/mi': [
        'Our hotel provides many interesting services for relaxing. We do have spa center with' +
        ' different body treatments, massages, facials, sauna, yoga etc...'
      ],
      '^.*?\b(gym|fitness)\b.*?$/mi': [
        'Stay fit and healthy in our state-of-the-art gymnasium. ' +
        'The Fitness Centre is open 24 hours.'
      ],
      '^.*?\b(pool|swimming|swim)\b.*?$/mi': [
        'Our hotel provides heated indoor pool area and sauna where you can relax. ' +
        'The Pool & Sauna is open daily from 6:00 a.m. to 10:00 p.m.'
      ],
      '^.*?\b(services|service)\b.*?$/mi': [
        'If you did not know we provide many different services including limousine service ' +
        'city tour, business center, jogging map, concierge service and many more...'
      ],
      '^.*?\b(bar|bars|restaurant|restaurants)\b.*?$/mi': [
        'At Hotel Adlon Kempinski, you can embark on a journey of endless culinary possibilities.' +
        'We do have lobby lounge and bar, sra bua bar where you can enjoy eastern mood with great' +
        'delicious Asian food, adlon to go if you need coffee to go maybe, restaurant QUARRÉ and' +
        'many more...'
      ],
      '^.*?\b(reserve|book|reservation|booking)\b.*?(room|rooms)\b.*?$/mi': [
        'So you want to book a room? That\'s grate! Can you tell me a date when do you want to ' +
        'book a room? f.e. (Nov 23-25)'
      ],
      '^.*?\b(room|rooms)\b.*?(reserve|book|reservation|booking)\b.*?$/mi': [
        'So you want to book a room? That\'s grate! Can you tell me a date when do you want to ' +
        'book a room? f.e. (Nov 23-25)'
      ],
    },
    fallbacks: [
      'Very interesting but i think I can not understand you? Anything else maybe?',
      'I am not sure I understand you fully',
      'Maybe I am wrong but I do not understand you unfortunately, try again please?',
      'Please can you rephrase cause I do not understand, I am really sorry for that.',
      'Thank you for your interest but I don\'t get it? Try to rephrase a question maybe?'
    ]
  },
  booking: {
    messags: {
      scope: {
        date: {},
        room: {},
        email: {},
        price: {}
      }
    },
    fallbacks: {
      scope: {
        date: {},
        room: {},
        email: {},
        price: {}
      }
    }
  }
};

module.exports = messages;
