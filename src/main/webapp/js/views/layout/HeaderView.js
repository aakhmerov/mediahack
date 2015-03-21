define([
    'jquery',
    'underscore',
    'backbone',
    'views/SimpleView',
    'text!templates/layout/headerTemplate.html',
    //dirty hack for handlebars loading wait
    'handlebars'
], function($, _, Backbone, SimpleView, headerTemplate,Handlebars) {

    var Header = SimpleView.extend({

        template : Handlebars.compile(headerTemplate),

        events: {
            'click .js-navigation__btn': 'toggleNavMenu',
            'click .js-logout' : 'logout'
        },

        homePage : "#",

        initialize : function() {
            _.bindAll(this, 'render', 'toggleNavMenu','navigateHome');
        },

        navigateHome : function () {
            window.router.navigate(this.homePage,{trigger : true,  replace: true});
            window.location.reload();
        },

        toggleNavMenu: function() {
            this.$el.find('.navigation').toggleClass('is-open');
        },

        render: function() {
            //compile handlebars template
            this.$el.empty();
            this.$el.append(this.template());
            return this;
        }

    });
    return Header;
});