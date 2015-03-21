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
        },

        initialize: function (options) {
            this.options = $.extend({}, options);
        },


        render: function () {
            this.$el.empty();
            this.$el.append(this.template(this.model.toJSON()));
            return this;
        }
    });

    return LocationDisplayView;
});
