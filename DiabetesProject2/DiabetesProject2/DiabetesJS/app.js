﻿var app = angular.module('Diabetes', ['ngRoute']);
app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider

    .when('/', {
        templateUrl: 'Home/Home'
    })      
     .when('/CalSugar', {
         templateUrl: 'CalSugar/CalSugar',
         controller: 'CalSugarController'
        })
     .otherwise({
         templateUrl: '/'
     })

}]);