angular.module("app")
  .controller("AddController", AddController);

AddController.$inject = [];

function AddController(){
  var vm = this;

  vm.test = "yay"
}
