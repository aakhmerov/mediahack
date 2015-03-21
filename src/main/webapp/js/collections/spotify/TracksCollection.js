/**
 * Created by aakhmerov on 22.03.15.
 */
define([
    'jquery',
    'underscore',
    'backbone',
    'models/spotify/SpotifyTrack'
], function ($, _, Backbone, SpotifyTrack) {
    var TracksCollection = Backbone.Collection.extend({

        model: SpotifyTrack,

    });

    return TracksCollection;
});