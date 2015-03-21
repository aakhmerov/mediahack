define([
    'jquery',
    'underscore',
    'backbone'
], function ($, _, Backbone) {
    var ElementModel = Backbone.Model.extend({

        url: 'api/elements',

        initialize: function (options) {}

    });
    return ElementModel;
});
