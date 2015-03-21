/**
 * Created by aakhmerov on 21.03.15.
 */
define([
    'jquery',
    'underscore',
    'backbone',
    'views/SimpleView',
    'collections/Elements',
    'models/spotify/SpotifyUserModel',
    'models/spotify/SpotifyUserPlaylistModel',
    'collections/spotify/SpotifyTracksCollection',
    'text!templates/ride/rideTemplate.html',
    //dirty hack for handlebars loading wait
    'handlebars'
], function ($, _, Backbone, SimpleView, Elements,SpotifyUserModel,
             SpotifyUserPlaylistModel,SpotifyTracksCollection, landingTemplate, Handlebars) {

    var RideView = SimpleView.extend({
        CLIENT_ID : '3bfc971fe4a14065a3f68c0bb0e6d040', // Your client id
        my_secret : '2030d51fcb844d9e8dceb3a13f4ec9c9', // Your secret
        REDIRECT_URI : 'http://mediahack.com/#ride', // Your redirect uri
        scopes : 'user-read-private user-read-email',
        TOKEN_URL : '/api/token',
        USER_URL : '/v1/me',

        template: Handlebars.compile(landingTemplate),

        events: {

        },

        filters: {

        },

        elements: null,

        acView: null,
        listView: null,
        mapView: null,

        initialize: function (options) {
            this.options = $.extend({}, options);
            _.bindAll(this, 'render','getUserInfo','fetchPlayLists','fetchTracks','playNextTrack');
            this.code = window.location.href.split('?')[1].split('=')[1].split('#')[0];

            $.ajax({
                url: this.TOKEN_URL,
                headers: {
                    "Accept" : "application/json; charset=utf-8",
                    'Authorization': 'Basic ' + window.btoa(this.CLIENT_ID + ":" + this.my_secret)
                },
                type: 'POST',
                data: {
                    'grant_type': 'authorization_code',
                    'code' : this.code,
                    'redirect_uri' : this.REDIRECT_URI
                },
                success: this.getUserInfo,
                error: function (xhr, ajaxOptions, thrownError) {
                    console.log(xhr.status);
                    console.log(thrownError);
                }
            });
        },

        getUserInfo : function (data, textStatus, jqXHR) {

            this.access = data;
            $.ajaxSetup({
                headers: {
                    'Authorization': 'Bearer ' + this.access.access_token
                }
            });
            this.spotifyUser = new SpotifyUserModel();
            $.when(this.spotifyUser.fetch()).then(this.fetchPlayLists);
        },

        fetchPlayLists : function () {
            this.playListModel = new SpotifyUserPlaylistModel(this.spotifyUser.toJSON());
            $.when(this.playListModel.fetch()).then(this.fetchTracks);
        },

        fetchTracks : function () {
            var data = {
                user : this.playListModel.get('owner').id,
                playList : this.playListModel.get('id')
            };
            this.tracksCollection = new SpotifyTracksCollection(data);
            $.when(this.tracksCollection.fetch()).then(this.render);
        },

        playNextTrack : function () {
            if (!this.audio) {
                this.audio = new Audio(this.tracksCollection.at(0).get('track').preview_url);
            } else {
                this.audio.stop();
                this.audio.src = this.tracksCollection.at(0).get('track').preview_url;
            }

            this.audio.play();
        },

        render: function () {
            this.$el.empty();
            this.playNextTrack();
            var data = {
                user : this.spotifyUser.toJSON(),
                playList : this.playListModel.toJSON(),
                tracks : this.tracksCollection.toJSON()
            };
            this.$el.append(this.template(data));
            return this;
        }
    });

    return RideView;
});
