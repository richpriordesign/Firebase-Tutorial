myApp.factory('Authentication', 
              ['$rootScope', '$location', '$firebaseObject', '$firebaseAuth', 
               function($rootScope, $location, $firebaseObject, $firebaseAuth) {
    
  var ref = firebase.database().ref();
  var auth = $firebaseAuth();
  var myObject;

  auth.$onAuthStateChanged(function(authUser){ //if the Authenitcation state has changed
    if(authUser){ //if authUser exists
        var userRef=ref.child('users').child(authUser.uid) //ref references the var ref above. This is traversing the Firebase database. You can find the uid variable from the database.
        var userObj = $firebaseObject(userRef) //Firebase object, added into the factory above
        $rootScope.currentUser=userObj;
    }else{
        $rootScope.currentUser='';
    }  
  });
                   
myObject = {
    login: function(user) {
          auth.$signInWithEmailAndPassword(
            user.email,
            user.password
          ).then(function(user){
              $location.path('/success')
          }).catch(function(error){
              $rootScope.message = error.message;
          }); //signInWithEmailAndPassword: Refers to var auth above
//          $rootScope.message = "Welcome " + $rootScope.user.email;

      }, //login
      
      logout: function(){
          return auth.$signOut(); //Tells it to look at FireBase function called signout
      }, //logout
      
      requireAuth: function(){
        return auth.$requireSignIn();  
      }, //if true it will return it, makes sure you have to be logged in to see the page. check the success in app.js
      
      register: function(user){
        auth.$createUserWithEmailAndPassword(
        user.email,
        user.password
      ).then(function(regUser){
         $rootScope.message = "Welcome " + user.firstname + ", Thanks for registering";
            myObject.login(user); //user gets passed in the register function above
         var regRef = ref.child('users')
           .child(regUser.uid).set({
               date: firebase.database.ServerValue.TIMESTAMP,
               regUser: regUser.uid,
               firstname: user.firstname,
               lastname: user.lastname,
               email: user.email
           }); //Sends info to the database
         //This refers to the var ref = firebase.database().ref(); specifically it refers to var ref. So now var regRef is for var refs children

      }).catch(function(error){
          $rootScope.message = error.message;
      });
      } //register
  }; //return
                  
return myObject;
                   
}]);

      
// myApp.factory('Authentication',
//   ['$rootScope', '$location', '$firebaseObject', '$firebaseAuth',
//   function($rootScope, $location, $firebaseObject, $firebaseAuth) {

//   var ref = firebase.database().ref();
//   var auth = $firebaseAuth();
//   var myObject;

//   auth.$onAuthStateChanged(function(authUser) {
//     if(authUser) {
//       var userRef = ref.child('users').child(authUser.uid);
//       var userObj = $firebaseObject(userRef);
//       $rootScope.currentUser = userObj;
//     } else {
//       $rootScope.currentUser = '';
//     }
//   });

//   myObject = {
//     login: function(user) {
//       auth.$signInWithEmailAndPassword(
//         user.email,
//         user.password
//       ).then(function(user) {
//         $location.path('/success');
//       }).catch(function(error) {
//         $rootScope.message = error.message;
//       }); //signInWithEmailAndPassword
//     }, //login

//     logout: function() {
//       return auth.$signOut();
//     }, //logout

//     requireAuth: function() {
//       return auth.$requireSignIn();
//     }, //require Authentication

//     register: function(user) {
//       auth.$createUserWithEmailAndPassword(
//         user.email,
//         user.password
//       ).then(function(regUser) {
//         var regRef = ref.child('users')
//           .child(regUser.uid).set({
//             date: firebase.database.ServerValue.TIMESTAMP,
//             regUser: regUser.uid,
//             firstname: user.firstname,
//             lastname: user.lastname,
//             email: user.email
//           }); //userinfo
//           myObject.login(user);
//       }).catch(function(error) {
//         $rootScope.message = error.message;
//       }); //createUserWithEmailAndPassword
//     } //register

//   }; //return


//   return myObject;

// }]); //factory