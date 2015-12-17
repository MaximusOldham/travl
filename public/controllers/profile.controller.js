(function() {



angular.module("app")
  .controller("ProfileController", ProfileController);

ProfileController.$inject = ["$scope", "uiGmapGoogleMapApi"];

function ProfileController($scope, uiGmapGoogleMapApi){
  var vm = this;

  vm.test = "yay";

  $scope.map = {
     center: {
       latitude:   34.04,
       longitude: -118.25
     },
     zoom: 12
   };

   $scope.marker = {
   id: 0,
   coords: {
       latitude: 34.05,
       longitude: -118.2
   },
   options: { draggable: false },
   };
}

})();
