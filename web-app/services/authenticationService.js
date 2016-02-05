'use strict';

angular.module('cp-app').service('AuthenticationService', ['lodash', '$http', '$q', 'ConfigurationService', function (_, $http, $q, ConfigurationService) {

  /**
   * Triggers a Reviews search using only the given search params.
   */
  var authenticate = function(criteria) {
    var deferred = $q.defer();
    var endPoint = ConfigurationService.api.baseUrl.concat('/signin');

    console.log('We are about to request the authenticate to the following url', endPoint);

    $http.post(endPoint, criteria )
      .success(function (data, status) {
        if (data) {
          deferred.resolve(data);
        }
      })
      .error(function (data, status) {
        deferred.reject({status: status});
      });

    return deferred.promise;
  };

  return {
    authenticate: authenticate
  };

}]);