const mongoose = require('mongoose')

var user = mongoose.model('user',{
    name : {type:String},
    address : {type:String},
    email : {type:String},
    phone : {type:String},
    password : {type:String},
    type : {type:String}
})

module.exports = { user }