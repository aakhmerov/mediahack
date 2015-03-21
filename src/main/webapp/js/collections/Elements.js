define([
    'jquery',
    'underscore',
    'backbone',
    'models/Element'
], function ($, _, Backbone, Element) {
    var Elements = Backbone.Collection.extend({

        model: Element,
        defaultUrl: 'api/elements',
        url : null,
        queryObj:  {},
        page: 0,

        initialize: function() {
            _.bindAll(this, 'query', 'fetch', 'nextPage', 'prevPage');
        },

        query: function(data) {
            if (!data) {
                return this.queryObj;
            }
            this.queryObj = data;
        },

        nextPage: function() {
            if (this.length) {
                this.page++;
                this.queryObj.page = this.page;
                return this.fetch();
            }
        },

        prevPage: function() {
            this.page = this.page <= 0 ? 0 : this.page - 1;
            this.queryObj.page = this.page;
            return this.fetch();
        },

        fetch:  function() {
            this.url = this.defaultUrl + '/?' + $.param(this.queryObj);
            return Backbone.Collection.prototype.fetch.call(this);
        }
    });

    return Elements;
});