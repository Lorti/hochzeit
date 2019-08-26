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

        if (process.env.ADMIN_SECRET !== password()) {
            respond(403);
            return;
        }

        Storyblok
            .get('cdn/stories', {
                'starts_with': 'groups',
                'per_page': 50,
            })
            .then((response) => {
                const guests = response.data.stories.map((group) => ({
                    id: group.id,
                    name: group.name,
                    password: group.content.password,
                    email: group.content.email,
                    guests: group.content.guests,
                    guests_editable: group.content.guests_editable,
                    message: group.content.message,
                }));
                respond(200, guests);
            })
            .catch((error) => {
                callback(error);
            });
    }

    const methods = {
        OPTIONS() {
            respond(204);
        },
        GET: get,
    };

    methods[event.httpMethod]();
};
