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
    var SearchByWordsCollection = Backbone.Collection.extend({

        model: SpotifyTrack,
        urlTemplate: Handlebars.compile("v1/search?q={{word}}&type=track"),

        initialize: function(options) {
            this.fetched = false;
            if (options) {
                this.url = this.urlTemplate(options);
            }
        },

        parse : function (data) {
            this.fetched = true;
            return data.tracks.items;
        }

    });

    return SearchByWordsCollection;
});