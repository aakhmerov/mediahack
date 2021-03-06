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
            _.bindAll(this, 'render','search','searchAndRide','handleWords','handleCurrentPosition');
            this.render();
            this.acView.on('ready', this.search);
            this.acView.fillInDefault("Berlin, Germany");
        },

        search: function() {
            this.place = this.acView.getSelected();
            console.log(this.place.lat + ',' + this.place.lng);
            this.$el.find('.ride').unbind( "click" );
            this.$el.find('.ride').on( "click",this.searchAndRide);
        },

        searchAndRide : function (event) {
            var data = {position: this.place.lat + ',' + this.place.lng};
            this.w3w = new W3wModel(data);
            $.when(this.w3w.fetch()).then(this.handleWords);
        },

        handleCurrentPosition : function (position) {
            window.localStorage.setItem("current",JSON.stringify(position.coords));
            router.navigate('playWords',{trigger: true});
        },

        handleWords : function () {
            window.localStorage.setItem("w3w",JSON.stringify(this.w3w.toJSON()));
            window.localStorage.setItem("place",this.$el.find('input').val());
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(this.handleCurrentPosition);
            }
        },

        render: function () {
            this.$el.empty();
            this.$el.append(this.template({}));
            this.acView = new AutocompleteView({el: this.$el.find('.ac-container')});
            return this;
        }
    });

    return LandingView;
});
