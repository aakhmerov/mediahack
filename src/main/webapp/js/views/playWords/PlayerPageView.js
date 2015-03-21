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
    'views/playWords/LocationDisplayView',
    'views/playWords/PlayListView',
    'views/playWords/PlayerView',
    'text!templates/playWords/playerView.html',
    //dirty hack for handlebars loading wait
    'handlebars'
], function ($, _, Backbone, SimpleView,PlayerLocationModel,SearchByWordsCollection,
             LocationDisplayView,PlayListView,PlayerView, playerView,Handlebars) {

    var PlayerPageView = SimpleView.extend({

        template: Handlebars.compile(playerView),

        events: {
        },

        initialize: function (options) {
            this.options = $.extend({}, options);
            _.bindAll(this, 'render','renderSongs');
            this.location = new PlayerLocationModel ({
                w3w : JSON.parse(window.localStorage.getItem ("w3w")),
                place : window.localStorage.getItem ("place")
            });
//            this.
            this.locationView = new LocationDisplayView({model:this.location});
            this.searchCollections = [];
            this.playListView = new PlayListView({model : this.searchCollections});
            for (var word in this.location.get('w3w').words) {
                var collection = new SearchByWordsCollection({word : this.location.get('w3w').words[word]});
                $.when(collection.fetch()).then(this.renderSongs);
                this.searchCollections.push(collection);
            }
            this.render();
        },

        renderSongs : function () {
            var allFetched = true;
            for (var i = 0; i < this.searchCollections.length; i++) {
                if (!this.searchCollections[i].fetched) {
                    allFetched = false;
                }
            }
            if (allFetched) {
                this.$el.find('.songs').empty();
                this.$el.find('.songs').append(this.playListView.render().$el);
            }
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
