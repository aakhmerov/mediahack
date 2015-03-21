define([
    'jquery',
    'underscore',
    'backbone',
    'views/SimpleView',
    'views/landing/AutocompleteView',
    'text!templates/landing/landingTemplate.html',
    //dirty hack for handlebars loading wait
    'handlebars'
], function ($, _, Backbone, SimpleView,AutocompleteView, landingTemplate, Handlebars) {

    var LandingView = SimpleView.extend({

        template: Handlebars.compile(landingTemplate),

        events: {
            'click ':'handleClick'
        },

        acView: null,

        initialize: function (options) {
            this.options = $.extend({}, options);
            this.options.params = this.parseUrlParams(this.options.params);
            _.bindAll(this, 'render','search','searchAndRide');
            this.render();
            this.acView.on('ready', this.search);
            this.acView.fillInDefault("Berlin, Germany");
        },

        search: function() {
            this.place = this.acView.getSelected();
            this.$el.find('.ride').unbind( "click" );
            this.$el.find('.ride').on( "click",this.searchAndRide);
        },

        searchAndRide : function (event) {
            console.log(this.place.lat);
            console.log(this.place.lng);
        },

        render: function () {
            this.$el.html(this.template({}));
            this.acView = new AutocompleteView({el: this.$el.find('.ac-container')});
            return this;
        }
    });

    return LandingView;
});
