/**
 * Created by aakhmerov on 21.03.15.
 */
define([
    'jquery',
    'underscore',
    'backbone'
], function ($, _, Backbone) {
    var W3wModel = Backbone.Model.extend({
//        url : 'http://api.what3words.com/w3w?key=5IBGX5LJ&string=',
        url : 'http://api.what3words.com/position?key=5IBGX5LJ&position={{lat}},{{long}}',
        initialize: function (options) {
            if (options) {
                this.url = this.url + options.position;
            }
        }

    });
    return W3wModel;
});