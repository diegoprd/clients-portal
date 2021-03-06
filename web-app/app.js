'use strict';

angular.module('cp-app', ['ngRoute','ngLodash', 'ngAnimate', 'ngStorage'])
  .config(function($routeProvider, $httpProvider) {

    delete $httpProvider.defaults.headers.common['X-Requested-With'];


    $routeProvider
      .when('/clients', {
        templateUrl: './views/pages/landing.html',
        controller: 'ClientsListCtrl'
      }).when('/client', {
        templateUrl: './views/pages/clients.html',
        controller: 'ClientsListCtrl'
      }).when('/clientForm', {
        templateUrl: './views/pages/clientForm.html',
        controller: 'ClientFormCtrl'
      }).when('/login', {
        templateUrl: './views/pages/login.html',
        controller: 'AuthenticationCtrl'
      }).otherwise({
        redirectTo: '/clients'
      });
});
