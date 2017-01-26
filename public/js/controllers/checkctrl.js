(function(){
angular.module('myApp')

.controller('checkController', function($scope,userOrder){
    //$scope.order = Carts.data.firstname;
    //getter method for order
    $scope.selection = userOrder.get();
    
})

}());

