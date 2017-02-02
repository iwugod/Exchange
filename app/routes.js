// app/routes.js

// load the cart model
var CtList = require('./models/cart');
/*var OrderList = require('./models/order');*/


// expose the routes to our app with module.exports
module.exports = function(app) {

    // api ---------------------------------------------------------------------
    // get all cart
    app.get('/api/cart', function(req, res, next) {

        // use mongoose to get all cart in the database
        CtList.find(function(err, cart) {

            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err)
                res.send(err)
            res.json(cart); // return all cart in JSON format
        });
    });

    
    app.get('/api/cart/:_id', function(req, res, next) {
        CtList.findOne({
            _id : req.params._id
        }, function(err, cart) {
            if (err)
                res.send(err);
            res.json(cart); // return all cart in JSON format
        });
    });


    // create ORDER and send back all cart after creation
     app.post('/api/cart', function(req, res, next) {
        // create a cart, information comes from AJAX request from Angular
        CtList.create({
            title : req.body.title,
            description : req.body.description,
            price : req.body.price,
            //image : req.body.filename
        }, function(err, cart) {
            if (err)
                res.send(err);

            // get and return all the cart after you create another
            CtList.find(function(err, cart, next) {
                if (err)
                    res.send(err)
                res.json(cart);
            });
        });

    });

    

     app.delete('/api/cart/:_id', function(req, res, next) {
        CtList.remove({
            _id : req.params._id
        }, function(err, cart) {
            if (err)
                res.send(err);

             // get and return all the cart after you create another
            CtList.find(function(err, cart, next) {
                if (err)
                    res.send(err)
                res.json(cart);
            });
        });
    });

    app.put('/api/cart/:_id',function(req, res) {
        CtList.findById({
            _id : req.params._id
        }, function(err, cart) {
            if(err)
                res.send(err)
            cart.quantity = req.body.quantity;
            
            cart.save(function(err){
                if(err)
                res.send(err);
                res.send(cart + "Updated");
            })
        });
    });
 

};