/**
 * Created by aakhmerov on 21.03.15.
 */
define([
    'jquery',
    'underscore',
    'backbone'
], function ($, _, Backbone) {
    var SpotifyUserModel = Backbone.Model.extend({

        url : "v1/me",
        initialize: function (options) {},
        parse : function (data) {
            return data;
        }

    });
    return SpotifyUserModel;
});
