(function() {
  "use strict";

  angular
    .module("app")
    .config(configure);

  configure.$inject = ["$httpProvider", "$stateProvider", "$urlRouterProvider"];

  function configure($httpProvider, $stateProvider, $urlRouterProvider) {
    // console.log("Adding tokenSigningService interceptor.");
    $httpProvider.interceptors.push("tokenSigningService");

    $urlRouterProvider.otherwise("/home");

    $stateProvider
      .state("home", {
        url: "/home",
        templateUrl: "templates/home.html"
      })
      .state("profile", {
        url: "/profile",
        templateUrl: "templates/profile.html",
        controller: "ProfileController",
        controllerAs: "vm"
      })
      .state("edit", {
        url: "/edit",
        templateUrl: "templates/edit.html",
        controller: "EditController",
        controllerAs: "vm"
      })
      .state("add", {
        url: "/add",
        templateUrl: "templates/add.html",
        controller: "AddController",
        controllerAs: "vm"
      })

  }

})();
