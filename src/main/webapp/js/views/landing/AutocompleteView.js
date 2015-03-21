define([
    'jquery',
    'underscore',
    'backbone',
    'views/SimpleView',
    'gmaps',
    'text!templates/landing/autocompleteTemplate.html',
    //dirty hack for handlebars loading wait
    'handlebars'
], function ($, _, Backbone, SimpleView, Gmaps, template, Handlebars) {

    var ACVIew = SimpleView.extend({

        template: Handlebars.compile(template),

        autocomplete: null,
        selected: null,
        defaultLocation: null,

        acService: new Gmaps.places.AutocompleteService(),
        placesService: new Gmaps.places.PlacesService($('<div/>')[0]),

        initialize: function () {
            _.bindAll(this, 'render', 'attachAC', 'updateSelected', 'getSelected', 'fillInDefault', 'applyPrediction', 'retrieveGeoForPlace');
            this.render();
        },

        attachAC: function() {
            var options = {
               
            };
            this.autocomplete = new Gmaps.places.Autocomplete(this.$el.find('.ac')[0], options);
            Gmaps.event.addListener(this.autocomplete, 'place_changed', this.updateSelected);
        },

        fillInDefault: function(location) {
            if (location) {
                this.acService.getPlacePredictions({ input: location }, this.applyPrediction);
            } else  {
                this.trigger('ready');
            }
        },

        applyPrediction: function(predictions) {
            if (!predictions.length) {
                this.trigger('ready');
                return;
            }
            this.$el.find('.ac').val(predictions[0].description);
            this.retrieveGeoForPlace(predictions[0].place_id);
        },

        retrieveGeoForPlace: function(placeId) {
            this.placesService.getDetails({ placeId: placeId }, this.updateSelected);
        },

        updateSelected: function(place) {
            var location = place ? place.geometry.location : this.autocomplete.getPlace().geometry.location;
            this.selected = {lat: ''+ location.k.toFixed(2), lng: ''+location.D.toFixed(2)};
            if (place) {
                this.trigger('ready');
            }
        },

        getSelected: function() {
            return this.selected;
        },

        render: function () {
            this.$el.html(this.template());
            this.attachAC();
            this.fillInDefault();
            return this;
        }
    });

    return ACVIew;
});