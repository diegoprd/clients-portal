'use strict';

angular.module('cp-app').service('ConfigurationService', function () {

  return {
    api: {
      baseUrl: 'http://localhost:8012/api'
    }
  };

});