const StoryblokClient = require('storyblok-node-client');

let Storyblok = new StoryblokClient({
  privateToken: process.env.STORYBLOK_TOKEN,
});

exports.handler = function (event, context, callback) {
  const password = event.queryStringParameters.password;

  Storyblok
    .get('stories', {
      'starts_with': 'guests',
    })
    .then((response) => {
      const guests = response.body.stories;
      const result = guests.find(guest => guest.content.password === password);
      callback(null, {
        statusCode: !result ? 400 : 200,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(!result ? {} : {
          name: result.name,
          email: result.content.email,
          phone: result.content.phone,
          attending: result.content.attending,
          vegetarian: result.content.vegetarian,
          message: result.content.message,
        }, undefined, 2),
      });
    })
    .catch((error) => {
      callback(error);
    });
};
