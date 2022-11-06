const express=require('express');
const router=express.Router();
const User=require('../models/User');
const CryptoJS=require('crypto-js');
const jwt=require('jsonwebtoken');


//register api
router.post('/register', async(req,res)=>{
    const user=await User.findOne({username:req.body.username});
          if(user){
              return res.status(401).json('User already exist in our Database');
          }
    const newUser=new User({
        username:req.body.username,
        email:req.body.email,
        password:CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString(),

    });


    try{
         const savedUser=await newUser.save();
         res.status(201).json(savedUser);
    }catch(err){
         res.status(500).json(err);
    }
})

//login api

router.post('/login',async(req,res)=>{
      try{
          const user=await User.findOne({username:req.body.username});
          if(!user){
              return res.status(401).json('This username does not exist in our database');
          }

          const hashedPassword=CryptoJS.AES.decrypt(
              user.password,
              process.env.PASS_SEC
          );
          const OriginalPassword=hashedPassword.toString(CryptoJS.enc.Utf8);
          if(OriginalPassword!==req.body.password)
             return res.status(401).json('The password is incorrect');

          const accessToken=jwt.sign(
              {
                 id:user._id,
                // isAdmin:user.isAdmin,
              },
              process.env.JWT_SEC,
              {expiresIn: "0.5h"}
          );

          const {password, ...others}=user._doc;
          res.status(200).json({...others, accessToken});
      }catch(err){
          res.status(500).json(err);
      }
})














module.exports=router;