# Flexperto - Fullstack NodeJS Test

## Intro

Alice wants to stay a night in Berlin. She just won in the lottery and now googled up some fancy places to stay. She found the infamous [Adlon](https://www.google.de/maps/uv?hl=en&pb=!1s0x47a851c6881c041d:0x19e4dfebf31b7ed9!2m22!2m2!1i80!2i80!3m1!2i20!16m16!1b1!2m2!1m1!1e1!2m2!1m1!1e3!2m2!1m1!1e5!2m2!1m1!1e4!2m2!1m1!1e6!3m1!7e115!4shttps://picasaweb.google.com/lh/sredir?uname%3D104793711026383055318%26id%3D6142425933586138834%26target%3DPHOTO!5sadlon+hotel+-+Google+Search&imagekey=!1e3!2s-yeiYMx0JfdI/VT5H17aMhtI/AAAAAAAAAHk/QPmkJVHMy8YKwV663sf3y9PXWn92eIdrACLIBGAYYCw&sa=X&ved=0ahUKEwjMyO_wnvzWAhWE6xQKHe9oAvwQoioItQEwDg) and is browsing their site. Your task is to build a simple concierge Chat-Bot that helps Alice. First of all think of your user journey. It could be something like:

Alice has not yet decided wether she wants to stay with the Adlon and wants to now more about perks / surroundings

Alice has not decided yet which room to book and asks the concierge bot for help

Alice has decided to Book a Room a specific room and going through the booking process with the concierge bot

Once you clarified on your user journey, please note it here:

```
Alice ...
```

### The rules

  1. Build a Chat-Bot that helps Alice on her User journey
  2. Alice speaks plain english only.
  3. You can use whatever IDE you would like to
  4. Your ```docker exec -it {container_id} npm run verify``` in both frontend and backend should not break
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
