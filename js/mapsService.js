/**
 * Maps Service
 */
myApp.service('mapsService',
    function mapsService($window, $q, GOOGLE_API_KEY) {

        function loadScripts() {
            var scripts = {
              maps:            'https://maps.googleapis.com/maps/api/js?key=' + GOOGLE_API_KEY + '&libraries=places&callback=initMap',
              markerClusterer: 'https://cdnjs.cloudflare.com/ajax/libs/js-marker-clusterer/1.0.0/markerclusterer.js'
            };

            for (var s in scripts) {
                var script = document.createElement('script');
                script.src = scripts[s];
                document.body.appendChild(script);
            }
        }

        var deferred = $q.defer();

        $window.initMap = function() {
            deferred.resolve();
        };

        if ($window.attachEvent) {
            $window.attachEvent('onload', loadScripts());
        } else {
            $window.addEventListener('load', loadScripts(), false);
        }

        return deferred.promise;
    }
);
