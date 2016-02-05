'use strict';

angular.module('lyk-app').directive('mainBar', function() {
  return {
    restrict: 'E',
    controller: 'mainBarCtrl',
    templateUrl: './views/partials/mainBar.html'
  };
});
