(function() {
 "use strict";

 angular
   .module("app")
   .config(loadGoogleMapsSDK);

 loadGoogleMapsSDK.$inject = ["uiGmapGoogleMapApiProvider"];

 function loadGoogleMapsSDK(uiGmapGoogleMapApiProvider) {
   uiGmapGoogleMapApiProvider.configure({
     key: 'AIzaSyA7iYfttaAwBpfIspsoOH09gJhFo-psYW8',
     v: '3.20',  //defaults to latest 3.X anyhow
     libraries: 'weather,geometry,visualization'
   });
 }

})();
