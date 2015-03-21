/**
 * Created by aakhmerov on 21.03.15.
 */
define([
    'jquery',
    'underscore',
    'backbone',
    'views/SimpleView',
    'models/playWords/PlayerLocationModel',
    'text!templates/playWords/playerView.html',
    //dirty hack for handlebars loading wait
    'handlebars'
], function ($, _, Backbone, SimpleView,PlayerLocationModel, playerView,Handlebars) {

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
            console.log(this.location.toJSON());
            _.bindAll(this, 'render');
            this.render();
        },


        render: function () {
            this.$el.html(this.template({}));
            return this;
        }
    });

    return PlayerView;
});
