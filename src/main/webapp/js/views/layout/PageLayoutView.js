define([
    'jquery',
    'underscore',
    'backbone',
    'views/layout/HeaderView',
    'views/layout/Page404',
    'views/layout/FooterView',
    'text!templates/layout/simpleTemplate.html' ,
    //dirty hack for handlebars loading wait
    'handlebars'
], function($, _, Backbone, EmptyHeader, Page404, EmptyFooter, simpleTemplate,Handlebars) {

    var PageLayoutView = Backbone.View.extend({

        template : Handlebars.compile(simpleTemplate),
        //defaults to NavigationHeader view function
        headerContent : EmptyHeader,
        //defaults to EmptyContent view function
        mainContent :  Page404,
        //defaults to EmptyFooter view function
        footerContent : EmptyFooter,
        //defaults of header options
        headerOptions : {
            el : '#header'
        },
        mainContentOptions : {
            el : '#main'
        },

        footerContentOptions : {
            el : "#footer"
        },

        initialize : function(options) {
            this.options = $.extend({}, this.options, options);
            //instantiate appropriate views based on component functions
            if (options.mainContent !== undefined && options.mainContent !== null) {
                this.mainContent = options.mainContent;
            }

            if (options.headerContent !== undefined && options.headerContent !== null) {
                this.headerContent = options.headerContent;
            }
            //copy header options overriding defaults if they are present
            this.headerOptions = $.extend({}, this.headerOptions, this.options.headerOptions);
            //copy main content options passed from view of upper level
            this.mainContentOptions = $.extend({}, this.mainContentOptions, this.options.mainContentOptions);

            if (options.footerContent !== undefined && options.footerContent !== null) {
                this.footerContent = options.footerContent;
            }
        },

        remove : function (attributes) {
            if (!_.isEmpty(this.headerView)) {
                this.headerView.remove();
            }
            if (!_.isEmpty(this.mainView)) {
                this.mainView.remove();
            }
            if (!_.isEmpty(this.footerView)) {
                this.footerView.remove();
            }
            Backbone.View.prototype.remove.call(this, attributes);
        },

        render: function() {
            //compile handlebars template with appropriate markup of components
            var html = this.template();
            //append appropriate content to root element right away after compilation
            this.$el.html(html);

            this.headerView = new this.headerContent(this.headerOptions);

            this.mainView = new this.mainContent(this.mainContentOptions);

            this.footerView = new this.footerContent(this.footerContentOptions);

            this.headerView.render();
            this.footerView.render();
            return this;
        }

    });

    return PageLayoutView;

});
