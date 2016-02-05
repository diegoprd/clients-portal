'use strict';

angular.module('cp-app').controller('ClientsListCtrl', ['lodash', '$scope', 'ClientsService', '$localStorage', '$location', '$routeParams',function(_ , $scope, ClientsService, $localStorage, $location, $routeParams) {

  $scope.setView = function(selectedView) {
    $scope.view = selectedView;
  };

  $scope.search = function(anotherCriteria) {

    if (anotherCriteria) {
      $scope.criteria = anotherCriteria;
    }

    ClientsService.search($scope.criteria).then(
      function(data){
        $scope.clients = data;
      },
      function(err){
        $scope.clients = {status: 'Rockandroll'};
      });
  };

  $scope.startSearch = function(category) {

    $scope.setView('LIST');

    if (!category) {
      return;
    }

    $scope.criteria[category.property] = category.value;
    $scope.search();

  };

  $scope.toLogin = function() {
    $location.url('/login');
  };

  $scope.logOut = function() {
    delete $localStorage.authentication;
    $location.url('/');
  };

  $scope.addClient = function() {
    $location.url('/clientForm');
  };

  var initialize = function() {

    $scope.criteria = {};

    console.log('habia:', $localStorage.authentication);

    var admin = $localStorage.authentication;

    if (admin && admin.token === $routeParams.id ) {
      $scope.user = {
        authenticated: true,
        fullname: admin.fullname
      };
      $scope.setView('LIST');
      return;
    }

    $scope.user = null;
    $scope.setView('CATEGORIES');
    $scope.categories = ClientsService.getCategories();

  }

  initialize();

}]);