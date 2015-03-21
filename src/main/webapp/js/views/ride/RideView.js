/**
 * Created by aakhmerov on 21.03.15.
 */
define([
    'jquery',
    'underscore',
    'backbone',
    'views/SimpleView',
    'collections/Elements',

    'text!templates/ride/rideTemplate.html',
    //dirty hack for handlebars loading wait
    'handlebars'
], function ($, _, Backbone, SimpleView, Elements, landingTemplate, Handlebars) {

    var RideView = SimpleView.extend({
        CLIENT_ID : '3bfc971fe4a14065a3f68c0bb0e6d040', // Your client id
        my_secret : '2030d51fcb844d9e8dceb3a13f4ec9c9', // Your secret
        REDIRECT_URI : 'http://localhost:9000/#ride', // Your redirect uri
        scopes : 'user-read-private user-read-email',
        TOKEN_URL : '/api/token',

        template: Handlebars.compile(landingTemplate),

        events: {

        },

        filters: {

        },

        elements: null,

        acView: null,
        listView: null,
        mapView: null,

        initialize: function (options) {
            this.options = $.extend({}, options);
            _.bindAll(this, 'render');
            this.code = window.location.href.split('?')[1].split('=')[1].split('#')[0];

            $.ajax({
                url: this.TOKEN_URL,
                headers: {
                    "Accept" : "application/json; charset=utf-8",
                    'Authorization': 'Basic ' + window.btoa(this.CLIENT_ID + ":" + this.my_secret)
                },
                type: 'POST',
                data: {
                    'grant_type': 'authorization_code',
                    'code' : this.code,
                    'redirect_uri' : this.REDIRECT_URI
                },
                success: function(data, textStatus, jqXHR){
                    console.log(data);
                    //data - response from server
                }
            });

            this.render();
        },

        getUserInfo : function (response) {
            console.log(response);
        },

        render: function () {
            this.$el.html(this.template({}));
            return this;
        }
    });

    return RideView;
});
