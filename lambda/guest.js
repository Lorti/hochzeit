const StoryblokClient = require('storyblok-js-client');
const headers = require('./util/cors.js');

exports.handler = function (event, context, callback) {
    function password() {
        return event.headers.authorization.substring(6);
    }

    function respond(statusCode, body = {}) {
        callback(null, {
            statusCode,
            headers,
            body: JSON.stringify(body, undefined, 2),
        });
    }

    function get() {
        const Storyblok = new StoryblokClient({
            accessToken: process.env.STORYBLOK_ACCESS_TOKEN,
        });

        Storyblok
            .get('cdn/stories', {
                'starts_with': 'guests',
            })
            .then((response) => {
                const guests = response.data.stories;
                const guest = guests.find(guest => guest.content.password === password());

                if (guest) {
                    respond(200, {
                        name: guest.name,
                        id: guest.id,
                        email: guest.content.email,
                        phone: guest.content.phone,
                        attending: guest.content.attending,
                        vegetarian: guest.content.vegetarian,
                        message: guest.content.message,
                    });
                } else {
                    respond(404);
                }
            })
            .catch((error) => {
                callback(error);
            });
    }

    async function post() {
        const {
            id,
            email,
            phone,
            attending,
            vegetarian,
            message,
        } = JSON.parse(event.body);

        const Storyblok = new StoryblokClient({
            oauthToken: process.env.STORYBLOK_OAUTH_TOKEN,
        });

        let story;
        try {
            const result = await Storyblok.get(`spaces/${process.env.STORYBLOK_SPACE_ID}/stories/${id}`, {});
            story = result.data.story;
        } catch (error) {
            console.log(error);
        }

        if (story.content.password !== password()) {
            respond(403);
            return;
        }

        try {
            await Storyblok.put(`spaces/${process.env.STORYBLOK_SPACE_ID}/stories/${id}`, {
                story: {
                    name: story.name,
                    slug: story.slug,
                    id,
                    content: {
                        _uid: story.content._uid,
                        component: story.content.component,
                        password: story.content.password,
                        email,
                        phone,
                        attending,
                        vegetarian,
                        message,
                    },
                },
                publish: 1,
            });
            respond(204);
        } catch (error) {
            console.log(error);
        }
    }

    const methods = {
        OPTIONS() {
            respond(204);
        },
        GET: get,
        POST: post,
    };

    methods[event.httpMethod]();
};
