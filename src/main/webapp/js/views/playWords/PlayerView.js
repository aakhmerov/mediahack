/**
 * Created by aakhmerov on 21.03.15.
 */
define([
    'jquery',
    'underscore',
    'backbone',
    'views/SimpleView',
    'text!templates/player/player.html',
    //dirty hack for handlebars loading wait
    'handlebars'
], function ($, _, Backbone, SimpleView, player,Handlebars) {

    var PlayerView = SimpleView.extend({

        template: Handlebars.compile(player),

        events: {
            'click .js-next' : 'handleNext',
            'click .js-prev' : 'handlePrev'
        },

        initialize: function (options) {
            this.options = $.extend({}, options);
            _.bindAll(this, 'render','handleNext','handlePrev','playTrack');
        },

        handleNext : function () {
            Backbone.Events.trigger('nextTrack');
        },

        handlePrev : function () {
            Backbone.Events.trigger('prevTrack');
        },

        playTrack : function () {
            if (!this.audio) {
                this.audio = new Audio(this.model.get('preview_url'));
                this.audio.onended = this.handleNext;
            } else {
                this.audio.pause();
                this.audio.currentTime = 0;
                this.audio.src = this.model.get('preview_url');
            }
            this.audio.play();
        },

        render: function () {
            this.$el.empty();
            var data = {};
            if (this.model) {
                data = this.model.toJSON();
            }
            this.$el.append(this.template(data));
            return this;
        }
    });

    return PlayerView;
});