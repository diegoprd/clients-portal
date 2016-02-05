'use strict';

angular.module('cp-app').controller('AuthenticationCtrl', ['$scope', 'AuthenticationService', '$localStorage', '$location',function($scope, AuthenticationService, $localStorage, $location) {

  $scope.login = function() {
    AuthenticationService.authenticate($scope.user).then(
      function(data){

        $localStorage.authentication = data;

        $location.url('/clients?id='.concat(data.token));
      },
      function(err){
        $scope.errorMessage = "Something went wrong.";
      });
  };

  var initialize = function() {
    $scope.user = {};
  };

  initialize();

}]);