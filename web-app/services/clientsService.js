'use strict';

angular.module('cp-app').service('ClientsService', ['lodash', '$http', '$q', 'ConfigurationService',function (_, $http, $q, ConfigurationService) {

  /**
   * Triggers a Reviews search using only the given search params.
   */
  var search = function(criteria) {
    var deferred = $q.defer();
    var endPoint = ConfigurationService.api.baseUrl.concat('/search');

    console.log('We are about to request the clients to the following url', endPoint);


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

  var getCategories = function() {

    return [
      {
        value: 'female',
        title: 'Female',
        property: 'gender',
        img: 'https://static.wixstatic.com/media/34df51_5f961b2cb2a44981b77a39c4b0a1b21e.jpg/v1/fill/w_222,h_374,al_c,q_80,usm_0.66_1.00_0.01/34df51_5f961b2cb2a44981b77a39c4b0a1b21e.jpg'
      },
      {
        value: 'male',
        title: 'Male',
        property: 'gender',
        img: 'https://static.wixstatic.com/media/34df51_88c7814fa7a94c9781d8c837329b8e5a.jpg/v1/fill/w_222,h_374,al_c,q_80,usm_0.66_1.00_0.01/34df51_88c7814fa7a94c9781d8c837329b8e5a.jpg'
      },
      {
        value: 'kid',
        title: 'Kids',
        property: 'gender',
        img: null
      },
      {
        value: true,
        title: 'International',
        property: 'international',
        img: 'https://static.wixstatic.com/media/34df51_02316da7d6184dc1a6d43fe81728d85e.jpg/v1/fill/w_222,h_374,al_c,q_80,usm_0.66_1.00_0.01/34df51_02316da7d6184dc1a6d43fe81728d85e.jpg'
      }
    ];

  };

  return {
    search: search,
    getCategories: getCategories
  };

}]);