'use strict';

// Declare app level module which depends on views, and components
  angular.module('labDoc', [
    'ngRoute',
    'ngCookies',
    'ui.bootstrap'
  ]).
  config(['$routeProvider', function($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        controller: 'HomeCtrl',
        templateUrl: 'user/home/app-user-home-tmpl.html'
      })
      .when('/login', {
        controller: 'LoginCtrl',
        templateUrl: 'user/login/app-user-login-tmp.html'

      })
      .when('/register', {
        controller: 'RegisterCtrl',
        templateUrl: 'user/register/app-user-register-tmpl.html'

      })
      .otherwise({redirectTo: '/login'});
  }]).run(
    function ($rootScope, $location, $cookieStore, $http) {
      // keep user logged in after page refresh
      $rootScope.globals = $cookieStore.get('globals') || {};
      if ($rootScope.globals.currentUser) {
        $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
      }

      $rootScope.$on('$locationChangeStart', function (event, next, current) {
        // redirect to login page if not logged in and trying to access a restricted page
        var restrictedPage = ['/login', '/register'].indexOf($location.path()) === -1;
        var loggedIn = $rootScope.globals.currentUser;
        if (restrictedPage && !loggedIn) {
          $location.path('/login');
        }
      });
    }
  );
