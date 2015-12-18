(function() {
  "use strict";

  angular
    .module("app")
    .factory("userDataService", userDataService);

  userDataService.$inject = ["$log", "$http", "tokenService"];

  function userDataService($log, $http, tokenService) {
    var user = {
      email:           "",
      name:            "",
      password:        "",
      ppUrl:           "",
      create:          create,
      clear:           clear,
      currentUserData: currentUserData
    };

    return user;

    function create() {
      $log.debug("Attempting to create:", user);

      return $http({
        url:     "http://localhost:3000/api/users",
        method:  "POST",
        headers: {"Content-Type": "application/json"},
        data: angular.toJson({
          email:    user.email,
          name:     user.name,
          password: user.password,
          ppUrl:    user.ppUrl
        })
      });
    }

    function clear() {
      $log.debug("Clearing user.");

      user.email    = "";
      user.name     = "";
      user.password = "";
      user.ppUrl    = "";
    }

    function currentUserData() {
      $log.debug("Retrieving current user data.");

      return $http({
        url:     "http://localhost:3000/api/me",
        method:  "GET",
        headers: {"Authorization": "Bearer " + tokenService.get()}
      });
    }
  }

})();
