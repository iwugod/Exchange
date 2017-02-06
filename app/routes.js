// app/routes.js

// load the cart model
var CtList = require('./models/cart');
//Image upload
var multer = require('multer');
var upload = multer({dest:__dirname+ '/public/uploads/'});
var fs = require('fs');


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
   /*  app.post('/api/cart', function(req, res, next) {
        // create a cart, information comes from AJAX request from Angular
        CtList.create({
            title : req.body.title,
            description : req.body.description,
            price : req.body.price,
            image : req.body.file
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

    });*/

    // create ORDER and send back all cart after creation
     app.post('/api/cart', upload.any(), function(req, res, next) {
         //console.log(req.files);
          //console.log(req.body);
          if(req.files) {
              req.files.forEach(function(file){
                  console.log(file);
                  var filename = (new Date).valueOf()+ "-"+file.originalname
                  fs.rename(file.path, 'public/uploads/'+filename, function(err){
                      if(err) throw err;
                      console.log("uploaded...")
                      //save to mongoose
                      CtList.create({
                           title : req.body.title,
                            description : req.body.description,
                            price : req.body.price,
                            image : filename
                      }, function(err, cart){
                          if(err)
                          res.send(err);

                          CtList.find(function(err, cart, next) {
                              if(err)
                                    res.send(err);
                                res.json(cart);
                          });
                      });
                  });
              });
          };
        // create a cart, information comes from AJAX request from Angular
       /* CtList.create({
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
        });*/

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