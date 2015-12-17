angular.module("app")
  .controller("EditController", EditController);

EditController.$inject = [];

function EditController(){
  var vm = this;

  vm.test = "yay"
}
