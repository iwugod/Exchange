angular.module('cController', [])


.controller('viewController', function($scope, $http, Carts){
    $scope.order = {};
    
    $scope.getOrder = function(){
        $scope.order = "Hello";
    };
});