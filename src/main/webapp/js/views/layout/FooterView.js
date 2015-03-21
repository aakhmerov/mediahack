define([
    'jquery',
    'underscore',
    'backbone',
    'views/SimpleView',
    'text!templates/layout/footerTemplate.html',
    //dirty hack for handlebars loading wait
    'handlebars'
], function($, _, Backbone, SimpleView, footerTemplate, Handlebars) {

    var Footer = SimpleView.extend({

        template : Handlebars.compile(footerTemplate),

        initialize : function() {
            _.bindAll(this, 'render');
        },

        render: function() {
            //compile handlebars template
            this.$el.html(this.template());
            return this;
        }
    });

    return Footer;

});