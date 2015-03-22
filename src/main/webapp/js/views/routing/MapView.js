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
                this.map.displayRoute(["Boston, MA", [ 43.6445, -72.2427]], function (response) {
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