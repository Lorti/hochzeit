const StoryblokClient = require('storyblok-node-client');

let Storyblok = new StoryblokClient({
    privateToken: process.env.STORYBLOK_TOKEN,
});

const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json',
};

exports.handler = function (event, context, callback) {
    if (event.httpMethod === 'OPTIONS') {
        callback(null, {
            statusCode: 204,
            headers,
        });
        return;
    }

    const { password } = JSON.parse(event.body);

    Storyblok
        .get('stories', {
            'starts_with': 'guests',
        })
        .then((response) => {
            const guests = response.body.stories;
            const result = guests.find(guest => guest.content.password === password);

            callback(null, {
                statusCode: !result ? 400 : 200,
                headers,
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
