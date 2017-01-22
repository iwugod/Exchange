// app/models/cart.js

// load mongoose since we need it to define a model
var mongoose = require('mongoose');

module.exports = mongoose.model('Cart', {
    title : String,
    description:String,
    price: Number,
    quantity: {'type': Number, 'default': 0}
    //image: { data: Buffer, contentType: String }
});
