module.exports = {
    title: 'Teresa & Manuel',
    head: [
        ['link', { href: 'https://fonts.googleapis.com/css?family=Abril+Fatface|Lato:light,normal,bold&display=swap', rel: 'stylesheet' }]
    ],
    chainWebpack: (config) => {
        config.module.rules.delete('svg');
        config.module.rule('images')
            .test(/\.(svg|png|jpe?g|gif|webp)(\?.*)?$/);
    },
};
