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
            .get('cdn/stories', { 'starts_with': 'photos' })
            .then((response) => {
                const photos = response.data.stories.find(story => story.content.password === password());

                if (photos) {
                    console.log(200, {
                        lovebirdsDropboxLink: photos.content.lovebirdsDropboxLink,
                        lovebirdsWeTransferLink: photos.content.lovebirdsWeTransferLink,

                        weddingCeremonyDropboxLink: photos.content.weddingCeremonyDropboxLink,
                        weddingCeremonyWeTransferLink: photos.content.weddingCeremonyWeTransferLink,

                        partyDropboxLink: photos.content.partyDropboxLink,
                        partyWeTransferLink: photos.content.partyWeTransferLink,

                        groupPicturesDropboxLink: photos.content.groupPicturesDropboxLink,
                        groupPicturesWeTransferLink: photos.content.groupPicturesWeTransferLink,

                        guestAdditionsDropboxLink: photos.content.guestAdditionsDropboxLink,
                        guestAdditionsWeTransferLink: photos.content.guestAdditionsWeTransferLink,
                    });
                } else {
                    respond(404);
                }
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
