/**
 * Created by aakhmerov on 21.03.15.
 */
define([
    'jquery',
    'underscore',
    'backbone',
    'views/SimpleView',
    'models/playWords/PlayerLocationModel',
    'views/playWords/LocationDisplayView',
    'text!templates/playWords/playerView.html',
    //dirty hack for handlebars loading wait
    'handlebars'
], function ($, _, Backbone, SimpleView,PlayerLocationModel,LocationDisplayView, playerView,Handlebars) {

    var PlayerView = SimpleView.extend({

        template: Handlebars.compile(playerView),

        events: {
        },

        initialize: function (options) {
            this.options = $.extend({}, options);
            this.location = new PlayerLocationModel ({
                w3w : JSON.parse(window.localStorage.getItem ("w3w")),
                place : window.localStorage.getItem ("place")
            });
            this.locationView = new LocationDisplayView({model:this.location});
            _.bindAll(this, 'render');
            this.render();
        },


        render: function () {
            this.$el.empty();
            this.$el.append(this.template({}));
            this.$el.find('.location').append(this.locationView.render().$el);
            return this;
        }
    });

    return PlayerView;
});
