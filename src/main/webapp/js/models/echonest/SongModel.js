/**
 * Created by aakhmerov on 21.03.15.
 */
define([
    'jquery',
    'underscore',
    'backbone',
    'handlebars'
], function ($, _, Backbone,Handlebars) {
    var SongModel = Backbone.Model.extend({
        urlTemplate : Handlebars.compile('api/v4/song/profile?api_key=JFICFDDZE8CPW8NDQ&id={{song}}&bucket=artist_location&bucket=artist_hotttnesss_rank&bucket=song_type'),
        initialize: function (options) {
            if (options) {
                this.url = this.urlTemplate(options);
            }
        }

    });
    return SongModel;
});