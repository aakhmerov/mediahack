// Require.js allows us to configure shortcut alias
// Their usage will become more apparent further along in the tutorial.
require.config({
    paths: {
        jquery: 'libs/ext/jquery.min',
        underscore: 'libs/ext/underscore-min',
        backbone: 'libs/ext/backbone-min',
        handlebars: 'libs/ext/handlebars.min',
        templates: '/templates',
        text: 'libs/ext/text',
        async: 'libs/require/async',
        gmaps: 'libs/gmaps/gmaps-amd',
        json: 'libs/require/json'
    },
    waitSeconds: 200,
    shim: {
        underscore : {
            exports : '_'
        },
        jquery : {
            exports : 'jQuery'
        },
        backbone: {
            deps : ['underscore','jquery'],
            exports: 'Backbone'
        },
        handlebars: {
            exports: 'Handlebars'
        }
    }

});

require([
    // Load our app module and pass it to our definition function
    'app'

], function(App) {
    // The "app" dependency is passed in as "App"
    // Again, the other dependencies passed in are not "AMD" therefore don't pass a parameter to this function
    App.initialize();
});
