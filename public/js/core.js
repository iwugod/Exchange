var app = angular.module('myApp',['ngRoute','cartController', 'cController', 'cartService']);

app.config(function($routeProvider) {
    $routeProvider
    .when("/",{
        templateUrl : "main.html",
        controller : "mainController"
    })
    .when("/add", {
        templateUrl : "add.html",
        controller : "mainController"
    })
    .when("/view", {
        templateUrl : "view.html",
        controller : "viewController"
    })
   .otherwise({
        template : "<h1>None</h1><p>Nothing has been selected,</p>"
    });

  //$locationProvider.html5Mode(true);
})