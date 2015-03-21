/**
 * Created by Greg on 21.02.2015.
 */
define('gmaps', ['async!https://maps.googleapis.com/maps/api/js?libraries=places'],
    function () {
        return window.google.maps;
    }
);
