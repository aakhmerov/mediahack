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
            var data = this.model.toJSON();
            data['3words'] = data.w3w.words.join('.');
            this.$el.append(this.template(data));
            return this;
        }
    });

    return LocationDisplayView;
});
