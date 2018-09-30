# Flexperto - Fullstack NodeJS Test

## Intro

Alice wants to stay a night in Berlin. She just won in the lottery and now googled up some fancy places to stay. She found the infamous [Adlon](https://www.google.de/maps/uv?hl=en&pb=!1s0x47a851c6881c041d:0x19e4dfebf31b7ed9!2m22!2m2!1i80!2i80!3m1!2i20!16m16!1b1!2m2!1m1!1e1!2m2!1m1!1e3!2m2!1m1!1e5!2m2!1m1!1e4!2m2!1m1!1e6!3m1!7e115!4shttps://picasaweb.google.com/lh/sredir?uname%3D104793711026383055318%26id%3D6142425933586138834%26target%3DPHOTO!5sadlon+hotel+-+Google+Search&imagekey=!1e3!2s-yeiYMx0JfdI/VT5H17aMhtI/AAAAAAAAAHk/QPmkJVHMy8YKwV663sf3y9PXWn92eIdrACLIBGAYYCw&sa=X&ved=0ahUKEwjMyO_wnvzWAhWE6xQKHe9oAvwQoioItQEwDg) and is browsing their site. Your task is to build a simple concierge Chat-Bot that helps Alice. First of all think of your user journey. It could be something like:

Alice has not yet decided wether she wants to stay with the Adlon and wants to now more about perks / surroundings

Alice has not decided yet which room to book and asks the concierge bot for help

Alice has decided to Book a Room a specific room and going through the booking process with the concierge bot

Once you clarified on your user journey, please note it here:

```
Alice says hello to bot!
Alice wants to know room types (executive, deluxe, superior deluxe). 
Alice wants to know about room prices.
Alice wants to know if hotel has got welness/spa center?
Alice wants to know if hotel has got gym/fitness center?
Alice wants to know if hotel has got pool for swimming?
Alice wants to know what type of services does hotel provide?
Alice wants to know if hotel has got different type of restaurants or bars?
Alice wants to reserve a room = type in RESERVE/BOOK A ROOM
===========================================
1. Alice wants to say how many days does she stay!
2. Alice wants to select room type. 
3. Alice needs to type in her email for confirmation.
4. Alice confirms or canceles her reservation.
```

### SAMPLE USAGE
**Alice**: hello<br/>
**AdlonBot**: Hi Alice, how can I help you!

**Alice**: What are you a machine? A bot?<br/>
**AdlonBot**: What do you think machines have to do with your problem?

**Alice**: What kind of room types do you have?<br/>
**AdlonBot**: I see, well we do have Executive, Deluxe, Superior Deluxe rooms.

**Alice**: Hmm, I'm wondering if you have gym maybe?<br/>
**AdlonBot**: 'Stay fit and healthy in our state-of-the-art gymnasium. 'The Fitness Centre is 
open 24 hours.'

**Alice**: And price of the rooms?<br/>
**AdlonBot**: Executive room cost 290$, Deluxe 330$ and Superior Deluxe 400$

**Alice**: Hmm great, then I would like to make room reservation<br/>

**AdlonBot**: We have got free rooms for the next 3 days? How many days do you want 1, 2 or 3?
**Alice**: 1<br/>

**AdlonBot**: Can you please choose your room type? (Executive, Deluxe, Superior)!<br/>
**Alice**: Deluxe!<br/>

**AdlonBot**: Please, type in your email address so we can proceed.<br/>
**Alice**: alice@gmail.com<br/>

**AdlonBot**: Hey Alice. You have requested to book a Deluxe room for
1 day and that will cost you 330$. 
Your email for confirmation is alice@gmail.com.<br/>
If you want to confirm your booking order type in "YES" please or if not you can
cancel it by writing down "NO" or "CANCEL"

**Alice**: YES<br/>
**AdlonBot**: Thank you so much for booking a room in our hotel! == Thank you for talking with 
me, I am Peter, AdlonBot for Adlon Kemplinski Berlin!
Can I help you with anything else? ==

**Alice**: bye byeee<br/>
**AdlonBot**: Byee... I am so lonely sometimes
### The rules

  1. Build a Chat-Bot that helps Alice on her User journey
  2. Alice speaks plain english only.
  3. You can use whatever IDE you would like to
  4. Your ```docker exec -it {container_id} npm run verify``` in AdlonBoth frontend and backend 
  should 
  not break
  5. You can savely assume that Alice is the only user of the chat bot. There is not need for authentication or concurrency concerns.
  6. Add documentation to this file that helps us understand how to use your chat-bot
  7. Create meaningfull commits


### The Hook


We really want you to show us your strengths. That's why we decided to design this task in a very open ended manner.

This means that we give you a guideline for 3 hours to solve the general task. How much time you actually spend is totally up to you. It can be less or even five times as much.


### How to proceed

Fork this repository on bitbucket and share with Caspar Bauer <caspar.bauer@flexperto.com>.
Then clone the repo and run ```docker-compose up``` in the root of this repo. Navigating your browser to ```http://localhost:4000``` you will receive a simple chat interface to get you started. Your socket.io backend runs at ```http://localhost:3000```. Please install packages by running ```docker exec -it {container_id} npm i --save {your-fancy-package}```. Otherwise the code will break in our runtime.

### Questions ?

Feel free to contact Caspar Bauer:

mail: caspar.bauer@flexperto.com

available at any time
