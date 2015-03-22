/**
 * Created by aakhmerov on 21.03.15.
 */
define([
    'jquery',
    'underscore',
    'backbone',
    'views/SimpleView',
    'text!templates/playWords/locationView.html',
    //dirty hack for handlebars loading wait
    'handlebars'
], function ($, _, Backbone, SimpleView, locationView,Handlebars) {

    var LocationDisplayView = SimpleView.extend({

        template: Handlebars.compile(locationView),

        events: {
            'click .switch' : 'toggleMap'
        },

        initialize: function (options) {
            this.options = $.extend({}, options);
            _.bindAll(this, 'render','toggleMap');

        },

        toggleMap : function (event) {
            Backbone.Events.trigger('toggleMap');
        },

        render: function () {
            this.$el.empty();
            var data = this.model.toJSON();
            data['3words'] = data.w3w.words.join('.');
            this.$el.append(this.template(data));
            return this;
        }
    });

    return LocationDisplayView;
});
