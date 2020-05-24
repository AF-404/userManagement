const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/mongoDB',{useNewUrlParser:true,useUnifiedTopology:true},
err => {
    if(!err){
        console.log("connection success!")
    }else{
        console.log("connection fail!" + JSON.stringify(err, undefined , 2))
    }
})