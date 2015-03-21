/**
 * Created by aakhmerov on 21.03.15.
 */
define([
    'jquery',
    'underscore',
    'backbone',
    'views/SimpleView',
    'text!templates/playWords/playList.html',
    //dirty hack for handlebars loading wait
    'handlebars'
], function ($, _, Backbone, SimpleView, playList,Handlebars) {

    var PlayListView = SimpleView.extend({

        template: Handlebars.compile(playList),

        events: {
        },

        initialize: function (options) {
            this.options = $.extend({}, options);
            _.bindAll(this, 'render','prepareList');
        },

        prepareList : function() {
            var data = [];
            for (var i = 0; i < this.model.length; i++) {
                var collection = this.model[i];
                if (collection) {
                    data = $.merge(data,collection.toJSON());
                }
            }

            return data;
        },

        render: function () {
            this.$el.empty();
            var data = this.prepareList();
            this.$el.append(this.template(data));
            return this;
        }
    });

    return PlayListView;
});