/**
 * Maps Directive
 */
myApp.directive('mapsDirective',
    function(mapsService) {
        return {
            restrict: 'EA',
            scope: {
                param: '='
            },
            template: '<div id="map"></div>',
            replace: true,
            controller:
              function($scope, $element, $attrs, mapsService) {
                $scope.map = null;

                var method = function() {
                    var initAttribute = function() {
                        mapsService.then(mapConfig);
                    };

                    var mapConfig = function() {
                        $scope.mapOptions = {
                            center: {
                              lat: -28.024,
                              lng: 140.887
                            },
                            zoom: 3
                        };

                        method.initMap();
                    };

                    ////////////////////////////////////////////////////////////////////////////////
                    // Google Places API
                    ////////////////////////////////////////////////////////////////////////////////

                    /**
                    *  Callback for Google Places API Service.
                    */
                    function placesCallback(results, status) {
                      if (status == google.maps.places.PlacesServiceStatus.OK) {
                        var place = results[0];

                        if (place.geometry) {
                          var bounds = new google.maps.LatLngBounds();

                          if (place.geometry.viewport) {
                            bounds.union(place.geometry.viewport);
                          } else {
                            bounds.extend(place.geometry.location);
                          }

                          map.fitBounds(bounds);

                        } else {
                          console.log("Returned place contains no geometry");
                        }
                      }
                    }

                    /**
                    *  Searchs a place using Google Places API.
                    */
                    $scope.searchPlace = function(query, map) {
                      var request = {
                        query: query,
                        fields: ['name', 'geometry']
                      };

                      $scope.service.findPlaceFromQuery(request, placesCallback);
                    };

                    ////////////////////////////////////////////////////////////////////////////////
                    // initMarkerClusterer
                    ////////////////////////////////////////////////////////////////////////////////

                    var initMarkerClusterer = function(map) {
                      var locations = [
                        {lat: -31.563910, lng: 147.154312},
                        {lat: -33.718234, lng: 150.363181},
                        {lat: -33.727111, lng: 150.371124},
                        {lat: -33.848588, lng: 151.209834},
                        {lat: -33.851702, lng: 151.216968},
                        {lat: -34.671264, lng: 150.863657},
                        {lat: -35.304724, lng: 148.662905},
                        {lat: -36.817685, lng: 175.699196},
                        {lat: -36.828611, lng: 175.790222},
                        {lat: -37.750000, lng: 145.116667},
                        {lat: -37.759859, lng: 145.128708},
                        {lat: -37.765015, lng: 145.133858},
                        {lat: -37.770104, lng: 145.143299},
                        {lat: -37.773700, lng: 145.145187},
                        {lat: -37.774785, lng: 145.137978},
                        {lat: -37.819616, lng: 144.968119},
                        {lat: -38.330766, lng: 144.695692},
                        {lat: -39.927193, lng: 175.053218},
                        {lat: -41.330162, lng: 174.865694},
                        {lat: -42.734358, lng: 147.439506},
                        {lat: -42.734358, lng: 147.501315},
                        {lat: -42.735258, lng: 147.438000},
                        {lat: -43.999792, lng: 170.463352}
                      ];

                      var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

                      var markers = locations.map(function(location, i) {
                        return new google.maps.Marker({
                          position: location,
                          label: labels[i % labels.length]
                        });
                      });

                      $scope.markerCluster = new MarkerClusterer(map, markers, {imagePath: 'https://cdn.jsdelivr.net/npm/js-marker-clusterer@1.0.0/images/m'});
                    };

                    ////////////////////////////////////////////////////////////////////////////////
                    // initMap
                    ////////////////////////////////////////////////////////////////////////////////

                    var initMap = function() {
                        map = $scope.map;

                        if (! map) {
                            map = new google.maps.Map($element[0], $scope.mapOptions);

                            initMarkerClusterer(map);

                            $scope.service = new google.maps.places.PlacesService(map);

                            //$scope.searchPlace('Italy', map); //works!!
                        }
                    };

                    return {
                        initAttribute: initAttribute,
                        mapConfig:     mapConfig,
                        initMap:       initMap
                    };
                }();

                var init = function () {
                    method.initAttribute();
                }();
              },
            link: function(scope, element, attrs) {
              scope.receivedData = 'none';

              scope.$on('search', function(event, result) {
                scope.receivedData = result.data;
                scope.searchPlace(scope.receivedData, scope.map);
              });
            }
        };
    }
);
