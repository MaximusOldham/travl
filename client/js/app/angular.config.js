(function() {
  "use strict";

  angular
    .module("app")
    .config(configure);

  configure.$inject = ["$httpProvider"];

  function configure($httpProvider) {
    // console.log("Adding tokenSigningService interceptor.");
    $httpProvider.interceptors.push("tokenSigningService");
  }

})();
