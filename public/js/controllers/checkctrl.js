
angular.module('myApp')

.controller('checkController', function($scope,userOrder, Carts){
    //$scope.order = Carts.data.firstname;
    //getter method for order
    $scope.selection = userOrder.get();

    $scope.updateCart = function() {
        angular.forEach(userOrder.get(), function(item) {
            let _id =item._id;
            let quantity = item.quantity;
            console.log(quantity);
            Carts.put(_id,quantity)
            .success(function(data){
                console.log(data);
            })
        })
    }

});
    
