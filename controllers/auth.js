

const User =  require('../modles/user')
const donation = require('../modles/donation')
const { body, validationResult } = require('express-validator');
var expressjwt = require('express-jwt');
const formidable = require('formidable')
const _ = require('lodash')
const fs = require('fs')
var jwt = require('jsonwebtoken');

exports.signout = ("/signout",(req,res) =>{
    res.clearCookie("token");
    res.json({
        message: "User is SignOut successfully"
    })
})

exports.signup = ((req,res) =>{

    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(422).json({
            error: errors.array() [0].msg
        })
    }

    const user =   new User(req.body)
    user.save((err,user) =>{
      if(err){
          return res.status(400).json({
              err:"NOT ABLE TO SAVE USER IN DB"
          })
      }
      res.json({
          name: user.name,
          email: user.email,
          id: user._id
      })
    })
})

exports.signin = (req,res) => {
    const errors = validationResult(req)
    const {email,password} =  req.body;
    if(!errors.isEmpty()){
        return res.status(422).json({
            error: errors.array() [0].msg
        })
    }

   User.findOne({email},(err,user) =>{
       if(err || !user){
          return res.status(400).json({
               error: "USER email does not exists"
           })
       }
       if(!user.authenticate(password)){
        return res.status(401).json({
          error: "Email and password is not match"
         })
       }
       const token = jwt.sign({_id: user._id}, process.env.SECRET)
       res.cookie("token",token,{expire:new Date() + 9999})

       const {_id,name,email,role} =  user
       return res.json({token,user: {_id,name,email, role}})
   }) 
}  



exports.donation =  async (req,res) =>{
   


    const post = req.body;
    const  {name,phoneNumber, address,bloodGroup,photo} = post
    if(!name || !phoneNumber || !address || !bloodGroup || !photo){
        return res.status(400).json({
            error:"Please Fill all the Field"
        })
    }
    const newPost =  new donation(post) 
    try {
      await newPost.save()
      res.status(201).json(newPost)
    } catch (error) {
        res.status(409).json({message: error.message})
    }

 
}


exports.donationGet = async (req,res) => {
      
        const donationPost =   donation
        await donationPost.find().exec((err,item) =>{
            if(err){
                res.status(400).json({error: "No  Donation found"})
            }
            res.json(item)
           
        })
       
        
    

}