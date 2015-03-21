// Filename: router.js
/**
 * Base router of the application
 * all pages urls should be aggregated here and actions
 * taken appropriately
 */
define([
    'jquery',
    'underscore',
    'backbone',
    'views/layout/PageLayoutView',
    'handlebars'
], function ($, _, Backbone, PageLayoutView, Handlebars) {

    var AppRouter = Backbone.Router.extend({
        routes: {
            '': 'pageSearchLanding',
            'playRide': 'pageLanding',
            'ride': 'pageRide',
            '*actions': 'page404'
        },

        //timeout in minutes
        // should be equal or greater then autologout time on backend
        loginTimeout: 10,
        idleTime: 0,
        idleInterval: null,

        initialize: function () {
            _.bindAll(this, 'pageLanding','pageRide', 'page404', 'showPage', 'removeCurrentView');
        },

        scrollToTop: function () {
            $("html, body").animate({ scrollTop: 0 }, "slow");
        },

        showPage: function (MainView, HeaderView, FooterView) {
            this.removeCurrentView();
            var pageContainer = $('<div></div>').attr({id: 'page'});
            $('body').append(pageContainer);
            this.showParams.headerContent = HeaderView;
            this.showParams.mainContent = MainView;
            var page = new PageLayoutView(this.showParams);
            page.render();
            this.setView(page);
            this.scrollToTop();
        },

        removeCurrentView: function () {
            if (!_.isEmpty(this.view)) {
                this.view.undelegateEvents();
                //todo find out way not to recreate header/footer every time - that looks weird
                this.view.remove();
                this.view.$el.empty();
            }
            this.view = null;
        },

        setView: function (view) {
            this.view = view;
        },

        pageSearchLanding : function (e, query) {
            this.showParams = {
                el: '#page',
                mainContentOptions: {
                    params: query
                }
            };
            require(['views/landing/SearchLandingView'], this.showPage);
        },

        pageRide :function (e, query) {
            this.showParams = {
                el: '#page',
                mainContentOptions: {
                    params: query
                }
            };
            require(['views/ride/RideView'], this.showPage);
        },


        pageLanding: function (e, query) {
            this.showParams = {
                el: '#page',
                mainContentOptions: {
                    params: query
                }
            };
            require(['views/landing/LoginLandingView'], this.showPage);
        },

        page404: function () {
            console.log('nothing yet');
        }
    });

    var initialize = function () {

        var appRouter = new AppRouter();
        window.router = appRouter;
        Backbone.history.start();

        Handlebars.registerHelper('if_eq', function (v1, v2, options) {
            if (v1 == v2) {
                return options.fn(this);
            }
            return options.inverse(this);
        });

        Handlebars.registerHelper("contains", function( value, array, options ){
            array = ( array instanceof Array ) ? array : [array];
            return (array.indexOf(value) > -1) ? options.fn( this ) : "";
        });

    };
    return {
        initialize: initialize
    };
});
