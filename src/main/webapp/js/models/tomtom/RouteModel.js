define([
    'jquery',
    'underscore',
    'backbone',
    'handlebars'
], function ($, _, Backbone,Handlebars) {
    var RouteModel = Backbone.Model.extend({
        urlTemplate : Handlebars.compile('https://api.tomtom.com/routing/1/calculateRoute/{{points}}/json?routeType=fastest&key=3dp3nspmp8esqdbepbv2swku'),
        initialize: function (options) {
            if (options.points) {
                this.url = this.urlTemplate(options);
            }
            this.fetched = false;
        },

        parse : function (data) {
            this.fetched = true;
            return data.routes[0];
        }

    });
    return RouteModel;
});