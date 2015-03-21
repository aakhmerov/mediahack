/**
 * Created by aakhmerov on 21.03.15.
 */
define([
    'jquery',
    'underscore',
    'backbone',
    'views/SimpleView',
    'collections/Elements',

    'text!templates/ride/rideTemplate.html',
    //dirty hack for handlebars loading wait
    'handlebars'
], function ($, _, Backbone, SimpleView, Elements, landingTemplate, Handlebars) {

    var LandingView = SimpleView.extend({

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
