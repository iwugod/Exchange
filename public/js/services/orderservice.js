//service for user's order
angular.module('myApp')

.service('userOrder', function(){
     var selectedOrder = {
     };

     function set(data) {
         selectedOrder = data;
     }

     function get() {
         return selectedOrder;
     }
    
    return {
        set : set,
        get : get
    }
});