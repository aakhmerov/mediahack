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
        apiKey : 'c8j4mzepps2x2nductj5ytzd',

        template: Handlebars.compile(mapView),

        events: {
        },

        initialize: function (options) {
            this.options = $.extend({}, options);
            _.bindAll(this, 'render','isRendered','renderMap');
            this.mapRendered = false;
        },

        isRendered : function () {

        },
        renderMap : function () {
            if (!this.mapRendered) {
                tomtom.apiKey = this.apiKey;
                this.map = new tomtom.Map({
                    domNode: "map",
                    apiKey: this.apiKey,
                    zoom: 12
                });
                var points = this.model.get('legs')[0].points;
                var p1 = [points[0].latitude,points[0].longitude];
                var p2  = [points[(points.length-1)].latitude,points[(points.length-1)].longitude];
                this.map.displayRoute([p1, p2], function (response) {
                    // do something with the routing response here
                });
                this.mapRendered = true;
            }
        },
        render: function () {

            if (!this.mapRendered) {
                this.$el.empty();
                var data = {};
                this.$el.append(this.template(data));

            }

            return this;
        }
    });

    return MapView;
});