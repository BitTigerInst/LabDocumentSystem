/**
 * Created by paul on 2/10/16.
 */
(function () {
  'use strict';

  function HomeCtrl($scope, $rootScope, UserService) {

    $scope.user = null;
    $scope.allUsers = [];
    $scope.deleteUser = deleteUser;

    loadCurrentUser();
    loadAllUsers();

    function loadCurrentUser() {
      UserService.GetByUsername($rootScope.globals.currentUser.username)
        .then(function (user) {
          $scope.user = user;
        });
    }

    function loadAllUsers() {
      UserService.GetAll()
        .then(function (users) {
          $scope.allUsers = users;
        });
    }

    function deleteUser(id) {
      UserService.Delete(id)
        .then(function () {
          loadAllUsers();
        });
    }
  }

  angular.module('labDoc').controller('HomeCtrl', HomeCtrl);

})();
