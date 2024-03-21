const express = require('express');
const router = express.Router();
const usermodel=require('../models/usermodel');
const transactionmodel=require('../models/transactionmodel')

router.get("/",((req,res)=>{
    console.log('hi')
    res.send("Router is running!");
}))

router.post('/customer',(async(req,res)=>{
    const {name,email,balance} = req.body;
    try{
        const newuser=new usermodel({"username":name,"email":email,"balance":balance});
        await newuser.save();
        res.status(200).send('User saved successfully!')
    }
    catch(err){
        console.log(err)
        res.status(400).send('Failed to save the user');
    }
}))

router.get('/customer',(async(req,res)=>{
    const {userid} = req.body;
    try{
        const user=await usermodel.findById(userid);
        res.status(200).json({"message":user})
    }
    catch(err){
        console.log(err)
        res.status(400).json({"message":'Failed to get the user'});
    }
}))

router.get('/customers',(async (req,res)=>{
     const customers =await usermodel.find();
     res.status(200).json({"message":customers})
}))

router.post('/transaction',(async(req,res)=>{
    const {senderid,recieverid,amount}=req.body;
    try{
        const sender= await usermodel.findById(senderid);
        const reciver = await usermodel.findById(recieverid);
        const senderBalance = parseFloat(sender.balance);
        const receiverBalance = parseFloat(reciver.balance);
        sender.balance=(senderBalance-amount).toString();
        await sender.save();
        reciver.balance=(receiverBalance+amount).toString();
        await reciver.save();
        const newtransaction= new transactionmodel({ "senderid":senderid,
                                                    "sendername":sender.username,
                                                    "recieverid":recieverid,
                                                    "recievername":reciver.username,
                                                    "amount":amount});
        newtransaction.save()
        console.log(newtransaction);
        return res.status(200).json({"message":newtransaction});

    }catch(err){
        console.log(err);
        return res.status(400).json({"message":'Failed to make the transaction'});
    }
}))

router.get('/transactions',(async(req,res)=>{
    try{
        const transactions =await transactionmodel.find();
        return res.status(200).json({"message":transactions})
    }
    catch(err){
        console.log(err)
        res.status(400).json({"message":"Failed to get transactions"})
    }
}))

module.exports=router;