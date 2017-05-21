myApp.controller('RegistrationController', 
                 ['$scope', 'Authentication', 
                  function($scope, Authentication) {
    
  $scope.login = function(){
    Authentication.login($scope.user);
  };
  
  $scope.register = function(){
    Authentication.register($scope.user);  
  };
                      
  $scope.logout = function(){ //gets logout function from authentication.js 
      Authentication.logout(); //runs it and executes via ng-click="logout()" in HTML
  };
}]);

/**** ORIGINAL CODE ****/

// myApp.controller('RegistrationController', 
//   ['$scope', 'Authentication', 
//   function($scope, Authentication) {

//   $scope.login = function() {
//     Authentication.login($scope.user);
//   };

//   $scope.logout = function() {
//     Authentication.logout();
//   };

//   $scope.register = function() {
//     Authentication.register($scope.user);
//   }; //register

// }]); //Controller