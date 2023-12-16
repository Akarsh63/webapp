const bcrypt=require('bcrypt')
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const usersmodel=require('../pages/usersmodel')
const adminsmodel=require('../pages/adminmodel')
const facultymodel=require('../pages/facultymodel')
const middleware=require('../middleware')
const otpGenerator=require('otp-generator')
const nodemailer = require('nodemailer');

const otpmodel=require('../pages/otpmodel')
require("dotenv").config();
router.get('/test', (req, res) => res.send('book route testing!'));
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'iitjguesthouse@gmail.com',
      pass: 'yfeaofygjkudhifc'
    }
});
router.post('/register',async (req,res)=>{
    const {username,email,password,confirmpassword}=req.body;
    const user =await usersmodel.findOne({username});
    const useronverification=await otpmodel.findOne({username});
    if (user || useronverification){
        return res.status(400).json({message:"Username already exists"})
    }
    
    const isEmailDomainAllowed = (email) => {
        const allowedDomains = ['iitj.ac.in'];
        const domain = email.split('@')[1];
        return allowedDomains.includes(domain);
      };
    if(!isEmailDomainAllowed(email)){
        return res.status(400).json({message:"Email domain is not allowed"})
    }
    const userwithemail =await usersmodel.findOne({email});
    const useronverificationwithemail=await otpmodel.findOne({email});
    if (userwithemail || useronverificationwithemail){
        return res.status(400).json({message:"Email already exists"})
    }
    if(password!=confirmpassword){
        return res.status(400).json({message:"Passwords doesn't match"})
    }
    
    // return res.status(200).json({message:"User registered Successfully"})
    const otp=otpGenerator.generate(6,{
        digits:true,lowerCaseAlphabets:false,upperCaseAlphabets:false,specialChars:false
    })
    const hashedotp=await bcrypt.hash(otp,10);
    const newotp =new otpmodel({username,'role':'student',email,'otp':hashedotp});
    await newotp.save();

    var mailOptions={
        to: email,
       subject: "Otp for registration is: ",
       html: "<h3>OTP for account verification is </h3>"  + "<h1 style='font-weight:bold;'>" + otp +"</h1>" // html body
     };
     
     transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);   
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        res.render('otp');
    });
    return res.status(200).json({"Info":{username,password,email}})
})
router.put('/clearotp',async(req,res)=>{
    const {username,email}=req.body;
    const user =await otpmodel.findOne({email});
    if(user){
        const final=await otpmodel.findByIdAndDelete(user._id);
    }
    return res.status(200).json({message:"OTP cleared"})
})
router.post('/resendotp',async(req,res)=>{
    const {username,email}=req.body;
    const user =await otpmodel.findOne({email});
    if(user){
        const final=await otpmodel.findByIdAndDelete(user._id);
    }
    const otp=otpGenerator.generate(6,{
        digits:true,lowerCaseAlphabets:false,upperCaseAlphabets:false,specialChars:false
    })
    const hashedotp=await bcrypt.hash(otp,10);
    const newotp =new otpmodel({username,'role':'student',email,'otp':hashedotp});
    await newotp.save();
    var mailOptions={
        to: email,
       subject: "Otp for registration is: ",
       html: "<h3>OTP for account verification is </h3>"  + "<h1 style='font-weight:bold;'>" + otp +"</h1>" // html body
     };
     transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);   
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        res.render('otp');
    });
    return res.status(200).json({message:'Resent OTP'});
})
router.post('/verifyotp',async(req,res)=>{
    const {username,password,email,otp}=req.body;
    const user =await otpmodel.findOne({email});
    if(!user){
        return res.status(400).json({message:"SORRY, OTP EXPIRED!"})
    }
    const isotpvalid=await bcrypt.compare(otp,user.otp);
    if(isotpvalid){
        const hashedpassword=await bcrypt.hash(password,10);
        const newuser =new usersmodel({username,email,'password':hashedpassword})
        await newuser.save()
        const final=await otpmodel.findByIdAndDelete(user._id);
        return res.status(200).json({message:"User registered Successfully"})
    }
    else{
        return res.status(400).json({message:"Wrong OTP"})
    }
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
        else{
        return res.status(200).json({token})}
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
    // const ispasswordvalid=password===user.password
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
router.post('/facultyregister',async(req,res)=>{
    const {username,email,password,confirmpassword}=req.body;

    const faculty=await facultymodel.findOne({username});
    const facultyverification=await otpmodel.findOne({username});
    if(faculty || facultyverification){
        return res
        .status(404)
        .json({message:"Username already exists"});
    }
    
    const isEmailDomainAllowed=(email)=>{
        const allowedDomains = ['iitj.ac.in'];
        const domain=email.split('@')[1];
        const domain1=email.split('@')[0];
        const dotIndex=domain1.includes('.');
        if(!allowedDomains.includes(domain)){
            return false;
        }
        if (!/^[a-zA-Z]+$/.test(domain1)) {
            return false;
        }
        return allowedDomains.includes(domain);
    };
    if(!isEmailDomainAllowed(email)){
        return res.status(400).json({message:"Email domain is not allowed"})
    }
    const facultywithemail =await facultymodel.findOne({email});
    const facultyonverificationwithemail=await otpmodel.findOne({email});
    if (facultywithemail || facultyonverificationwithemail){
        return res.status(400).json({message:"Email already exists"})
    }
    if(password!=confirmpassword){
        return res.status(400).json({message:"Passwords doesn't match"})
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new faculty account
    const newFaculty = new facultymodel({ username, email, password: hashedPassword });
    await newFaculty.save();

    // const otp=otpGenerator.generate(6,{
    //     digits:true,lowerCaseAlphabets:false,upperCaseAlphabets:false,specialChars:false
    // })
    // const hashedotp=await bcrypt.hash(otp,10);
    // const newotp =new otpmodel({username,email,'otp':hashedotp});
    // await newotp.save();
    // var mailOptions={
    //     to:email,
    //     subject:'Otp for registration is:',
    //     html:"<h1>The Otp for Registration is </h1>"+"<h3 style=font-weight:bold;>"+ otp +"</h3>"
    // }
    // transporter.sendMail(mailOptions,(error,info)=>{
    //     transporter.sendMail(mailOptions, (error, info) => {
    //         if (error) {
    //             return console.log(error);
    //         }
    //         console.log('Message sent: %s', info.messageId);   
    //         console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    //         res.render('otp');
    //     });
       // return res.status(200).json({"Info":{username,password,email}})
   //})
    // const hashedPassword = await bcrypt.hash(password, 10);

    //     // Create a new faculty account
    //     const newFaculty = new facultymodel({ username, email, password: hashedPassword });
    //     await newFaculty.save();

        // Redirect to the faculty login page
        return res.status(200).json({ message: "Faculty account created successfully" });
})

//faculty login
router.post('/facultylogin',async(req,res)=>{
    const {username,password}=req.body;
    console.log(username);
    const user=await facultymodel.findOne({username});
    if(!user){
        return res
        .status(400)
        .json({message:"User Not found"})
    }
    const ispasswordvalid=await bcrypt.compare(password,user.password);
    console.log(password);
    if(!ispasswordvalid){
        return res
        .status(400)
        .json({message:"password is incorrect"})
    }
    const token = jwt.sign({id:user._id},process.env.SECRET_KEY,{ expiresIn: '36000000s'},(err,token)=>{
        if(err){
            throw err;
        }else{
            return res.status(200).json({token});
        }
        
    });
    // return res.status(200).json({message:"LOGIN Successfull",userId:user._id})
})

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