/**
 * Created by aakhmerov on 21.03.15.
 */
define([
    'jquery',
    'underscore',
    'backbone',
    'handlebars'
], function ($, _, Backbone,Handlebars) {
    var SpotifyUserPlaylistsModel = Backbone.Model.extend({
        urlTemplate : Handlebars.compile("v1/users/{{id}}/playlists"),

        initialize: function (options) {
            if (options) {
                this.url = this.urlTemplate(options);
            }
        },
        parse : function (data) {
            return data.items[0];
        }

    });
    return SpotifyUserPlaylistsModel;
});
