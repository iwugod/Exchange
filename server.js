//server.js

//setup

    var express  = require('express');
    var app      = express();                        // create our app w/ express
    var mongoose = require('mongoose');              // mongoose for mongodb
    var morgan   = require('morgan');                // log requests to the console (express4)
    var multer = require('multer');
    var bodyParser = require('body-parser');         // pull information from HTML POST (express4)
    var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
    //var cookies = require('angular-cookies');
    var database = require('./config/database');
    var port     = process.env.PORT || 3000;         // set the port

// configuration ===============================================================
    mongoose.connect(database.url);     // connect to mongoDB database on modulus.io

    app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
    app.use(morgan('dev'));                                         // log every request to the console
    app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
    app.use(bodyParser.json());                                     // parse application/json
    app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
    //app.use(cookies);

    /*//Multer
    var storage = multer.diskStorage({
        destination:function(req, file, cb) {
            cb(null, '/images/')
        },
        filename: function(req, file, cb) {
            var datetimestamps = Date.now();
            cb(null, file.filename + '_' + datetimestamps + '.' +file.originalname.
            split('.')[file.originalname.split('.').length-1]);
        },
    });

    var upload = multer({
        storage:storage
    }).single(file);
    */


    app.use(methodOverride());

    // serve all asset files from necessary directories
    app.use("/js", express.static(__dirname + "/app/models"));
    app.use("/img", express.static(__dirname + "/public/images"));
    app.use("/css", express.static(__dirname + "/public/js"));

    app.get('/', function (req, res) {
    res.sendfile(__dirname + '/public/index.html');
    });

    app.get('/add', function (req, res) {
    res.sendfile(__dirname + '/public/add.html');
    });


    // routes ======================================================================
    require('./app/routes.js')(app);

    // listen (start app with node server.js) ======================================
    app.listen(port);
    console.log("App listening on port : " + port);
