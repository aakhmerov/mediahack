define([
    'jquery',
    'underscore',
    'backbone',
    'views/SimpleView',
    'collections/Elements',

    'text!templates/landing/landingTemplate.html',
    //dirty hack for handlebars loading wait
    'handlebars'
], function ($, _, Backbone, SimpleView, Elements, landingTemplate, Handlebars) {

    var LandingView = SimpleView.extend({

        CLIENT_ID : '3bfc971fe4a14065a3f68c0bb0e6d040', // Your client id
        my_secret : '2030d51fcb844d9e8dceb3a13f4ec9c9', // Your secret
        REDIRECT_URI : 'http://mediahack.com/#ride', // Your redirect uri
        scopes : 'user-read-private user-read-email',

        getLoginURL : function (scopes) {
            return 'https://accounts.spotify.com/authorize?client_id=' + this.CLIENT_ID +
            '&redirect_uri=' + encodeURIComponent(this.REDIRECT_URI) +
            '&scope=' + encodeURIComponent(scopes.join(' ')) +
            '&response_type=code';
        },

        getUserData: function (accessToken) {
            return $.ajax({
                url: 'https://api.spotify.com/v1/me',
                headers: {
                    'Authorization': 'Bearer ' + accessToken
                }
            });
        },

        template: Handlebars.compile(landingTemplate),

        events: {
            'click .btn':'handleClick'
        },

        filters: {

        },

        elements: null,

        acView: null,
        listView: null,
        mapView: null,

        initialize: function (options) {
            this.options = $.extend({}, options);
            this.options.params = this.parseUrlParams(this.options.params);
            _.bindAll(this, 'render','getLoginURL','getUserData','login');
            this.elements = new Elements();
            this.render();
        },

        login : function () {
            var url = this.getLoginURL([
                'user-read-email'
            ]);
            var w = window.location = url;
        },

        handleClick : function (event) {
            this.login();
        },

        render: function () {
            this.$el.html(this.template({}));
            return this;
        }
    });

    return LandingView;
});
