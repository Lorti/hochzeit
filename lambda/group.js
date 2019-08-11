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
                'starts_with': 'groups',
            })
            .then((response) => {
                const groups = response.data.stories;
                const group = groups.find(group => group.content.password === password());

                if (group) {
                    respond(200, {
                        name: group.name,
                        id: group.id,
                        email: group.content.email,
                        guests: group.content.guests,
                        guests_editable: group.content.guests_editable,
                        message: group.content.message,
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
        const request = JSON.parse(event.body);

        const id = parseInt(request.id, 10);
        const email = String(request.email);
        const guests = request.guests.map(guest => ({
            component: 'group_member',
            name: String(guest.name),
            attending: Boolean(guest.attending),
            vegetarian: Boolean(guest.vegetarian),
            custom: Boolean(guest.custom),
        }));
        const message = String(request.message);

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
                        component: story.content.component,
                        password: story.content.password,
                        email,
                        guests,
                        guests_editable: story.content.guests_editable,
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
