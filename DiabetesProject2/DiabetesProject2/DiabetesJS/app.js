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
     
         .when('/AddFood', {
             templateUrl: 'CalSugar/AddFood',
             controller: 'AddFoodController'
         })
         .when('/RecordSugar', {
             templateUrl: 'RecordSugar/RecordSugar',
             controller: 'RecordSugardController'
         })
        .when('/FoodDetail', {
            templateUrl: 'CalSugar/FoodDetail',
            controller: 'FoodDetailController'
        })
         .when('/ShowFood', {
             templateUrl: 'CalSugar/ShowFood',
             controller: 'ShowFoodController'
         })
         .when('/Nutrients', {
             templateUrl: 'Nutrition/Nutrients',
             controller: 'NutrientsController'
         })
     .otherwise({
         templateUrl: '/'
     })

}]);