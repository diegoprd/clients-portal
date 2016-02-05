'use strict';

angular.module('cp-app').controller('ClientsListCtrl', ['lodash', '$scope', 'ClientsService', function(_ , $scope, ClientsService) {

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

  var initialize = function() {

    $scope.criteria = {};
    $scope.setView('CATEGORIES');

    $scope.categories = ClientsService.getCategories();

  }

  initialize();

}]);