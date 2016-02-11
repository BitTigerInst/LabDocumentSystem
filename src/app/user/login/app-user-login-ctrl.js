/**
 * Created by paul on 2/10/16.
 */
(function () {
  'use strict';

  function LoginCtrl($location, AuthenticationService, FlashService) {

    $scope.login = login;

    (function initController() {
      // reset login status
      AuthenticationService.ClearCredentials();
    })();

    function login() {
      $scope.dataLoading = true;
      AuthenticationService.Login($scope.username, $scope.password, function (response) {
        if (response.success) {
          AuthenticationService.SetCredentials($scope.username, $scope.password);
          $location.path('/');
        } else {
          FlashService.Error(response.message);
          $scope.dataLoading = false;
        }
      });
    };
  }

  angular.module('labDoc').controller('LoginCtrl', LoginCtrl);

})();
