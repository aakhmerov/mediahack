define([
    'jquery',
    'underscore',
    'backbone',
    'views/SimpleView',
    'views/landing/AutocompleteView',
    'models/w3w/W3wModel',
    'text!templates/landing/landingTemplate.html',
    //dirty hack for handlebars loading wait
    'handlebars'
], function ($, _, Backbone, SimpleView,AutocompleteView,W3wModel, landingTemplate, Handlebars) {

    var LandingView = SimpleView.extend({

        template: Handlebars.compile(landingTemplate),

        events: {
            'click ':'handleClick'
        },

        acView: null,

        initialize: function (options) {
            this.options = $.extend({}, options);
            this.options.params = this.parseUrlParams(this.options.params);
            _.bindAll(this, 'render','search','searchAndRide','handleWords');
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
            var data = {position: this.place.lat + ',' + this.place.lng};
            this.w3w = new W3wModel(data);
            $.when(this.w3w.fetch()).then(this.handleWords);
        },

        handleWords : function () {
            console.log(this.w3w.toJSON());
        },

        render: function () {
            this.$el.html(this.template({}));
            this.acView = new AutocompleteView({el: this.$el.find('.ac-container')});
            return this;
        }
    });

    return LandingView;
});
