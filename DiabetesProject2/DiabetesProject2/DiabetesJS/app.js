﻿var app = angular.module('Diabetes', ['ngRoute']);
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
        .when('/Profile', {
            templateUrl: 'Register/Profile',
            controller: 'ProfileController'
        })
         .when('/AddFood', {
             templateUrl: 'CalSugar/AddFood',
             controller: 'AddFoodController'
         })
     .otherwise({
         templateUrl: '/'
     })

}]);