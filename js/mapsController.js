/**
 * Maps Controller
 */
myApp.controller('mapsController',
  ['$scope', '$rootScope',
      function($scope, $rootScope) {
          $scope.searchQuery = null;
          $scope.places      = ['Argentina', 'New Zealand', 'Australia', 'Italy'];

          $scope.googleMapArgs = {
            width: '100%',
            height: '100%'
          };

          $scope.search = function(event) {
            $rootScope.$broadcast('search', {
              data: event.target.attributes.data.value
            });
          };
      }
  ]
);
