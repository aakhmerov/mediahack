/**
 * Created by aakhmerov on 21.03.15.
 */
define([
    'jquery',
    'underscore',
    'backbone',
    'handlebars'
], function ($, _, Backbone,Handlebars) {
    var TrackModel = Backbone.Model.extend({
        urlTemplate : Handlebars.compile('api/v4/track/profile?api_key=JFICFDDZE8CPW8NDQ&id={{id}}'),
        initialize: function (options) {
            if (options) {
                this.url = this.urlTemplate(options);
            }
        }

    });
    return TrackModel;
});