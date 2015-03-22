/**
 * Created by aakhmerov on 21.03.15.
 */
define([
    'jquery',
    'underscore',
    'backbone',
    'views/SimpleView',
    'models/playWords/PlayerLocationModel',
    'models/tomtom/RouteModel',
    'collections/spotify/SearchByWordsCollection',
    'collections/spotify/TracksCollection',
    'views/playWords/LocationDisplayView',
    'views/playWords/PlayListView',
    'views/playWords/PlayerView',
    'text!templates/playWords/playerView.html',
    //dirty hack for handlebars loading wait
    'handlebars'
], function ($, _, Backbone, SimpleView,PlayerLocationModel,RouteModel,SearchByWordsCollection,TracksCollection,
             LocationDisplayView,PlayListView,PlayerView, playerView,Handlebars) {

    var PlayerPageView = SimpleView.extend({

        template: Handlebars.compile(playerView),

        events: {
        },

        initialize: function (options) {
            this.options = $.extend({}, options);
            _.bindAll(this, 'render','renderSongs','nextTrack','prevTrack',
                'renderLocation','renderSongs','playCurrentTrack','initRoute');
            this.location = new PlayerLocationModel ({
                w3w : JSON.parse(window.localStorage.getItem ("w3w")),
                current : JSON.parse(window.localStorage.getItem ("current")),
                place : window.localStorage.getItem ("place")
            });
            this.initRoute();
            this.locationView = new LocationDisplayView({model:this.location});
            this.searchCollections = [];
            for (var word in this.location.get('w3w').words) {
                var collection = new SearchByWordsCollection({word : this.location.get('w3w').words[word]});
                $.when(collection.fetch()).then(this.renderSongs);
                this.searchCollections.push(collection);
            }
            this.render();
        },

        initRoute : function () {
            var pointsString = this.location.get('current').latitude + ',' + this.location.get('current').longitude + ":" +
                this.location.get('w3w').position[0] + "," + this.location.get('w3w').position[1];
            this.routeModel = new RouteModel ({points:pointsString});
            $.when(this.routeModel.fetch()).then(this.renderLocation);
            this.location.set('route',this.routeModel)
        },

        renderSongs : function () {
            var allFetched = true;
            var data = [];
            for (var i = 0; i < this.searchCollections.length; i++) {
                var collection = this.searchCollections[i];
                if (!collection.fetched) {
                    allFetched = false;
                    break;
                } else {
                    data = $.merge(data,collection.toJSON());
                }
            }
            if (allFetched) {
                this.tracksCollection = new TracksCollection(data);
                this.unshiftedTracks = new TracksCollection();

                this.currentTrack = this.tracksCollection.shift();

                this.player = new PlayerView({model : this.currentTrack});
                this.playListView = new PlayListView({model : this.tracksCollection});

                this.$el.find('.songs').empty();
                this.$el.find('.songs').append(this.playListView.render().$el);

                this.$el.find('.player-navigation').empty();
                this.$el.find('.player-navigation').append(this.player.render().$el);

                Backbone.Events.on('nextTrack',this.nextTrack);
                Backbone.Events.on('prevTrack',this.prevTrack);
                this.player.playTrack();
            }
        },

        playCurrentTrack : function () {
            this.player.render();
        },

        renderPlayList : function () {
            this.playListView.render();
        },

        nextTrack : function (event) {
            var track = this.tracksCollection.shift();
            if (track) {
                this.unshiftedTracks.push(this.currentTrack);
                this.changeTo(track);
            }
        },

        changeTo : function (track) {
            this.currentTrack = track;
            this.player.model = this.currentTrack;
            this.renderPlayList();
            this.playCurrentTrack();
            this.player.playTrack();
        },

        prevTrack : function (event) {
            var track = this.unshiftedTracks.pop();
            if (track) {
                this.tracksCollection.unshift(this.currentTrack);
                this.changeTo(track);
            }
        },

        getCurrentTrack : function () {
            return this.tracksCollection.at(this.currentTrack);
        },

        renderLocation : function () {
            this.$el.find('.location').empty();
            this.$el.find('.location').append(this.locationView.render().$el);
        },

        render: function () {
            this.$el.empty();
            this.$el.append(this.template({}));
            this.renderLocation();
            return this;
        }
    });

    return PlayerPageView;
});
