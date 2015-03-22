/**
 * Created by aakhmerov on 21.03.15.
 */
define([
    'jquery',
    'underscore',
    'backbone',
    'views/SimpleView',
    'models/playWords/PlayerLocationModel',
    'collections/spotify/SearchByWordsCollection',
    'collections/spotify/TracksCollection',
    'views/playWords/LocationDisplayView',
    'views/playWords/PlayListView',
    'views/playWords/PlayerView',
    'text!templates/playWords/playerView.html',
    //dirty hack for handlebars loading wait
    'handlebars'
], function ($, _, Backbone, SimpleView,PlayerLocationModel,SearchByWordsCollection,TracksCollection,
             LocationDisplayView,PlayListView,PlayerView, playerView,Handlebars) {

    var PlayerPageView = SimpleView.extend({

        template: Handlebars.compile(playerView),

        events: {
        },

        initialize: function (options) {
            this.options = $.extend({}, options);
            _.bindAll(this, 'render','renderSongs','nextTrack','prevTrack','renderSongs','playCurrentTrack');
            this.location = new PlayerLocationModel ({
                w3w : JSON.parse(window.localStorage.getItem ("w3w")),
                place : window.localStorage.getItem ("place")
            });
//            this.
            this.locationView = new LocationDisplayView({model:this.location});
            this.searchCollections = [];
            for (var word in this.location.get('w3w').words) {
                var collection = new SearchByWordsCollection({word : this.location.get('w3w').words[word]});
                $.when(collection.fetch()).then(this.renderSongs);
                this.searchCollections.push(collection);
            }
            this.render();
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

                this.currentTrack = track;
                this.player.model = this.currentTrack;
                this.renderPlayList();
                this.playCurrentTrack();
                this.player.playTrack();
            }
        },

        prevTrack : function (event) {
            var track = this.unshiftedTracks.pop();
            if (track) {
                this.tracksCollection.unshift(this.currentTrack);
                
                this.currentTrack = track;
                this.player.model = this.currentTrack;
                this.renderPlayList();
                this.playCurrentTrack();
                this.player.playTrack();
            }
        },

        getCurrentTrack : function () {
            return this.tracksCollection.at(this.currentTrack);
        },

        render: function () {
            this.$el.empty();
            this.$el.append(this.template({}));
            this.$el.find('.location').append(this.locationView.render().$el);
            return this;
        }
    });

    return PlayerPageView;
});
