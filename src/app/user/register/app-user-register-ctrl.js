/**
 * Created by paul on 2/10/16.
 */
(function () {
  'use strict';

  function RegisterCtrl($location, $scope, UserService, FlashService) {

    $scope.register = function register() {
      $scope.dataLoading = true;
      UserService.Create($scope.user)
        .then(function (response) {
          if (response.success) {
            FlashService.Success('Registration successful', true);
            $location.path('/login');
          } else {
            FlashService.Error(response.message);
            $scope.dataLoading = false;
          }
        });
    }
  }

  angular.module('labDoc').controller('RegisterCtrl', RegisterCtrl);

})();