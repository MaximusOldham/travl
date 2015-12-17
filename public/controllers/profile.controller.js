angular.module("app")
  .controller("ProfileController", ProfileController);

ProfileController.$inject = [];

function ProfileController(){
  var vm = this;

  vm.test = "yay"
}
