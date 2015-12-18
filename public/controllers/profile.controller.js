(function() {


angular.module("app")
  .controller("ProfileController", ProfileController);

ProfileController.$inject = ["$scope", "uiGmapGoogleMapApi", "userDataService", "$log"];

function ProfileController($scope, uiGmapGoogleMapApi, userDataService, $log){
  var vm = this;

  vm.test = "yay";

  if (vm.currentUser === undefined) {
    userDataService.currentUserData().then(function(res) {
      vm.currentUser = res.data.data;
      $log.log("Is this me?", vm.currentUser);
    })
  }


  $scope.map = {
     center: {
       latitude:   34.04,
       longitude: -118.25
     },
     zoom: 12
   };

   $scope.markers = {
   id: 0,
   coords: {
       latitude: 34.05,
       longitude: -118.2
   },
   options: { draggable: false },
   };
}

})();
