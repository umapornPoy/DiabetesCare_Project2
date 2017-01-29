var app = angular.module('Diabetes', ['ngRoute','ui.bootstrap']);
app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider

    .when('/', {
        templateUrl: 'Home/Home',
        controller: 'HomeController'
    })
     .when('/CalSugar', {
         templateUrl: 'CalSugar/CalSugar',
         controller: 'CalSugarController'
     })
        .when('/EditProfile', {
            templateUrl: 'Register/EditProfile',
            controller: 'EditProfileController'
        })
         .when('/RecordSugar', {
             templateUrl: 'Record/RecordSugar',
             controller: 'RecordSugarController'
         })
         .when('/AddFood', {
             templateUrl: 'CalSugar/AddFood',
             controller: 'AddFoodController'
         })
     .otherwise({
         templateUrl: '/'
     })

}]);