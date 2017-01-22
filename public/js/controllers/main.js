angular.module('cartController', [])


.controller('mainController', function($scope, $http, Carts){
    $scope.formData = {};
    $scope.selectedCarts = {
        items: []
    };

// GET =====================================================================
    //when loading the landing page get all carts and show them
// use the service to get all the carts

    Carts.get('/api/cart')
    .success(function(data){
        $scope.carts = data;
    })
    .error(function(data){
        console.log('Error', + data);
    });

    //get id and related info from cart.get all 
    $scope.getElementID = function(index) {
        //console.log(index.quantity);
        $scope.selectedCarts.items.push({
           _id: index._id,
            title : index.title,
            quantity: index.quantity,
            description: index.description,
            price: index.price
        });
        
        $scope.cookie = $scope.selectedCarts.items;
        /**$cookies.putObject('data',$scope.selectedCarts.items);
        $scope.cookie = $cookies.getObject('data');
        console.log($scope.carts);**/
       
    }

    //Remove item from cart
     $scope.removeItem = function(index) {
        $scope.cookie.splice(index, 1);
    },

    //sum the total price of the transaction
    $scope.getTotal = function() {
        var total = 0;
        angular.forEach($scope.cookie, function(item) {
        $scope.sum =  total += item.price * item.quantity;
        //console.log(total);
    })

    },

     // CREATE ==================================================================
        // when submitting the add form, send the text to the node API
   $scope.createCart = function() {

       if(!$.isEmptyObject($scope.formData)) {

       $http.post('/api/cart',$scope.formData)
       .success(function(data){
           $scope.formData = {};
           $scope.carts = data;
       })
       .error(function(data){
         console.log('Error', +data);  
       });

    }
   },

    // delete ==================================================================
        // when for Admin item
      $scope.deleteCart = function(id) {
        Carts.delete(id)
        .success(function(data) {
            $scope.carts = data;
        })
        .error(function(data) {
                console.log('Error: ' + data);
        });
     };
})

.controller('viewController', function($scope) {
    $scope.order = {};

    $scope.getOrder = function() {
        $scope.order = "Hello";
    }
})


/*.directive('addToCart', function(){
    return {
       restrict:'AE',
        scope : {
           'myOptions': '='
        },
        link:function(scope, element, attrs) {
         console.log(scope.myOptions);
         
        },
        templateUrl: "add-to-cart.html",
    }
});
*/

