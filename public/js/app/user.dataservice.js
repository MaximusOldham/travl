(function() {
  "use strict";

  angular
    .module("app")
    .factory("userDataService", userDataService);

  userDataService.$inject = ["$log", "$http"];

  function userDataService($log, $http) {
    var user = {
      email:           "",
      name:            "",
      password:        "",
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
        })
      });
    }

    function clear() {
      $log.debug("Clearing user.");

      user.email    = "";
      user.name     = "";
      user.password = "";
    }

    function currentUserData() {
      $log.debug("Retrieving current user data.");

      return $http({
        url:     "http://localhost:3000/api/me",
        method:  "GET"
      });
    }
  }

})();
