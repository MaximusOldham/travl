(function() {


angular.module("app")
  .controller("ProfileController", ProfileController);

ProfileController.$inject = ["$scope", "uiGmapGoogleMapApi", "userDataService", "$log", "$state"];

function ProfileController($scope, uiGmapGoogleMapApi, userDataService, $log, $state){
  var vm = this;

  vm.userProfile = {};
  if (userDataService.userData == null) {
    userDataService.currentUserData().then(function(res) {
      vm.userProfile.currentUser = res.data.data;
      userDataService.userData = res.data.data;
      $log.log("Is this me?", vm.userProfile.currentUser);
    });
  } else {
    vm.userProfile.currentUser = userDataService.userData;
  }

  vm.saveProfile = function() {
    userDataService.saveProfile(vm.userProfile.currentUser);
    $state.go('profile');
  };

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
