//service

angular.module('myApp')

// super simple service
// each function returns a promise object 

.factory('Carts', function($http){

    return {
        get : function() {
            return $http.get('/api/cart');
        },
        getByID : function(id) {
            return $http.get('/api/cart/' + id)
        },

        /*create : function() {
            return $http.post('/api/cart');
        },*/

         put : function(id, quantity) {
            return $http.put('/api/cart/'+ id,{quantity:quantity});
        },

        delete : function(id) {
            return $http.delete('/api/cart/' + id);
        },

    }
})