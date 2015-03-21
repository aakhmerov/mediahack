/**
 * Created by aakhmerov on 21.03.15.
 */
define([
    'jquery',
    'underscore',
    'backbone',
    'models/spotify/SpotifyTrack',
    'handlebars'
], function ($, _, Backbone, SpotifyTrack,Handlebars) {
    var SpotifyTracksCollection = Backbone.Collection.extend({

        model: SpotifyTrack,
        urlTemplate: Handlebars.compile("v1/users/{{user}}/playlists/{{playList}}/tracks"),

        initialize: function(options) {
            if (options) {
                this.url = this.urlTemplate(options);
            }
        },

        parse : function (data) {
            return data.items;
        }

    });

    return SpotifyTracksCollection;
});