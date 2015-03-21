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

        my_client_id : '3bfc971fe4a14065a3f68c0bb0e6d040', // Your client id
        my_secret : '2030d51fcb844d9e8dceb3a13f4ec9c9', // Your secret
        redirect_uri : 'http://localhost:9000/#ride', // Your redirect uri
        scopes : 'user-read-private user-read-email',

        template: Handlebars.compile(landingTemplate),

        events: {

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
            _.bindAll(this, 'render');
            this.elements = new Elements();
            this.render();
        },


        render: function () {
            this.$el.html(this.template({}));
            return this;
        }
    });

    return LandingView;
});
