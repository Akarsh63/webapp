const bcrypt=require('bcrypt')
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const usersmodel=require('../pages/usersmodel')
const adminsmodel=require('../pages/adminmodel')
const middleware=require('../middleware')
require("dotenv").config();
router.get('/test', (req, res) => res.send('book route testing!'));

router.post('/register',async (req,res)=>{
    const {username,email,password}=req.body;
    const user =await usersmodel.findOne({username});
    if (user){
        return res.status(400).json({message:"Username already exists"})
    }
    const hashedpassword=await bcrypt.hash(password,10);
    const newuser =new usersmodel({username,email,'password':hashedpassword})
    await newuser.save()
    return res.status(200).json({message:"User registered Successfully"})
})

router.post('/login',async (req,res)=>{
    const {username,password}=req.body;
    const user =await usersmodel.findOne({username});
    if (!user){
       return res
           .status(400)
           .json({message:"No Existing User Found!"})
    }
    const ispasswordvalid=await bcrypt.compare(password,user.password);
    if (!ispasswordvalid){
        return res
                 .status(400)
                 .json({message:'Username or Password is incorrect!'})
    }
    const token = jwt.sign({ id: user._id },process.env.SECRET_KEY,{expiresIn:36000000},(err,token)=>{
        if(err) throw err;
        res.status(200).json({token})
    });
})

router.post('/adminlogin',async (req,res)=>{
    const {username,password}=req.body;
    const user =await adminsmodel.findOne({username});
    if (!user){
       return res
           .status(400)
           .json({message:"No Existing Admin Found!"})
    }
    const ispasswordvalid=await bcrypt.compare(password,user.password);
    if (!ispasswordvalid){
         return res
                  .status(400)
                  .json({message:'Password is incorrect'})
     }
     const token = jwt.sign({ id: user._id },process.env.SECRET_KEY,{expiresIn:36000000},(err,token)=>{
        if(err) throw err;
        res.status(200).json({token})
    });
})
router.post('/newadmin',middleware,async (req,res)=>{
    let exist=await adminsmodel.findById(req.userid);
    if(!exist){
      res.status(400).send('Admin not found')
    }
    const {username,password}=req.body;
    try{
        const user =await adminsmodel.findOne({username});
        if (!user){
            const hashedpassword=await bcrypt.hash(password,10);
            const newadmin=new adminsmodel({"username":username,"password":hashedpassword});
            await newadmin.save();
            return res.status(200).json({message:"Admin added Successfully!"})
        }
        return res.status(400).json({message:"Admin already exists!"});
    }
    catch(err){
       return res.status(500).json({"error":err})
    }
   
});
// router.get('/home/:userId',async (req,res)=>{
//     console.log(req.params.userId)
//     const user =await usersmodel.findById(req.params.userId);
//     if (!user){
//        return res
//            .status(400)
//            .json({message:"No Existing Users Found!"})
//     }
//     res.status(200).json(user.username)
// })

module.exports=router;