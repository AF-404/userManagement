const express = require('express');
var router = express.Router()
var ObjectID= require('mongoose').Types.ObjectId
var nodeBase64 = require('nodejs-base64-converter');
const nodemailer = require("nodemailer");


var { user } = require('../models/user')

router.get('/',(req,res)=>{
    user.find((err,docs)=>{
        if(!err){
            res.send(docs)
        }else{
            console.log('Error while retrieving all records : '+JSON.stringify(err,undefined,2))
        }
    })
})

router.post('/',(req,res)=>{

    var newRecord= new user({
        name : req.body.name,
        address : req.body.address,
        email : req.body.email,
        phone : req.body.phone,
        password : nodeBase64.encode(req.body.password),
        type : 'user'
    })

    newRecord.save((err,docs)=>{
        if(!err){
            res.send(docs)
        }else{
            console.log('Error while register : '+JSON.stringify(err,undefined,2))
        }
    })
})

router.post('/email',(req,res)=>{

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'apptest1994.05@gmail.com',
          pass: 'apps1234'
        }
      });

    var mailOption ={
        from: 'apptest1994.05@gmail.com',
        to: req.body.email,
        subject: "change the privilege",
        text: req.body.msg
      }
    
      transporter.sendMail(mailOption,function(error,info){
        if(error){
            res.send(error);
        }else{
            console.log("Message sent: %s", info.response);
            res.send(info.response);
        }
      });
    
})

router.put('/:id',(req,res)=>{
    if(!ObjectID.isValid(req.params.id)){
        return res.status(400).send('No record with given id : '+req.params.id)
    }

    var updateRecords={
        type : req.body.type
    }

    user.findByIdAndUpdate(req.params.id, { $set: updateRecords},{new:true}, (err,docs)=>{
        if(!err){
            res.send(docs)
        }else{
            console.log('Error while updating records : '+JSON.stringify(err,undefined,2))
        }
    })
})

router.delete('/:id',(req,res)=>{
    if(!ObjectID.isValid(req.params.id)){
        return res.status(400).send('No record with given id : '+req.params.id)
    }

    user.findByIdAndRemove(req.params.id,(err,docs)=>{
        if(!err){
            res.send(docs)
        }else{
            console.log('Error while updating records : '+JSON.stringify(err,undefined,2))
        }
    })
})

module.exports = router