define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/layout/page404Template.html',
    //dirty hack for handlebars loading wait
    'handlebars'
], function($, _, Backbone, emptyContentTemplate,Handlebars) {

    var Page404 = Backbone.View.extend({

        template : Handlebars.compile(emptyContentTemplate),

        initialize : function() {
//            nothing to do here
        },

        render: function() {
            //compile handlebars template
            var data = {
                error_box_msg : 'this page does not exist <br/> go <a href="/">home</a>'
            };
            this.$el.html(this.template(data));
            return this;
        }

    });

    return Page404;

});