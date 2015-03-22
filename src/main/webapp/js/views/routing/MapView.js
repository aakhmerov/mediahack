/**
 * Created by aakhmerov on 22.03.15.
 */
define([
    'jquery',
    'underscore',
    'backbone',
    'views/SimpleView',
    'text!templates/routing/mapView.html',
    //dirty hack for handlebars loading wait
    'handlebars'
], function ($, _, Backbone, SimpleView, mapView,Handlebars) {

    var MapView = SimpleView.extend({

        template: Handlebars.compile(mapView),

        events: {
        },

        initialize: function (options) {
            this.options = $.extend({}, options);
            _.bindAll(this, 'render','isRendered');
            this.rendered = false;
        },

        isRendered : function () {

        },
        render: function () {
            this.$el.empty();
            var data = {};
            this.$el.append(this.template(data));
            return this;
        }
    });

    return MapView;
});