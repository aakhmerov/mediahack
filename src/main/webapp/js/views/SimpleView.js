define([
    'jquery',
    'underscore',
    'backbone',
    //dirty hack for handlebars loading wait
    'handlebars'
], function ($, _, Backbone) {

    var SimpleView = Backbone.View.extend({

        forbidden: 403,

        initialize: function (options) {
            _.bindAll(this, 'parseUrlParams', 'isMobile');
        },

        parseUrlParams: function (query) {
            var res = {};
            if (!query) {
                return res;
            }
            var vars = query.split("&");
            for (var i = 0; i < vars.length; i++) {
                var pair = vars[i].split("=");
                pair[0] = decodeURIComponent(pair[0]).replace('[]', '');
                pair[1] = decodeURIComponent(pair[1]);
                // first entry with this name
                if (typeof res[pair[0]] === "undefined") {
                    res[pair[0]] = pair[1];
                    // second entry with this name
                } else if (typeof res[pair[0]] === "string") {
                    var arr = [ res[pair[0]], pair[1] ];
                    res[pair[0]] = arr;
                    // third or later entry with this name
                } else {
                    res[pair[0]].push(pair[1]);
                }
            }
            return res;
        },

        isMobile: function() {
            var mq = window.matchMedia("(min-width: 768px)");
            return !mq.matches;
        }
    });

    return SimpleView;
});