const express = require('express');
const router = express.Router();
const roommodel=require('../pages/roommodel');
const usersmodel = require('../pages/usersmodel');
const middleware=require('../middleware')
const adminmodel = require('../pages/adminmodel');
router.get('/', (req, res) => res.send('book route testing!'));
router.post('/enter',middleware,async (req,res)=>{
  let exist=await adminmodel.findById(req.userid);
      if(!exist){
        return res.status(400).send('Admin not found')
      }
    const {roomnumber,options}=req.body;
    const room= await roommodel.findOne({roomnumber})
    if(!room){
        const newroom= new roommodel({"roomnumber":roomnumber,"options":options})
        await newroom.save();
        return res.status(200).json({message:"Room created Successfully!"})
    }
    else{
        return res.status(400).json({message:"Room already exists!"})
    }
})

router.get('/allrooms',middleware,async (req,res)=>{
    try {
      let exist=await usersmodel.findById(req.userid);
      if(!exist){
        return res.status(400).send('User not found')
      }
        const deluxerooms = await roommodel.find({ "options": "Deluxe" });
        const singlerooms = await roommodel.find({ "options": "Single" });
        const doublerooms = await roommodel.find({ "options": "Double" });

        return res.status(200).json({
          'alldeluxerooms': deluxerooms,
          'allsinglerooms': singlerooms,
          'alldoublerooms': doublerooms
        });
      } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Internal Server Error' });
      }

})

router.get('/allfreerooms',middleware,async (req,res)=>{
  try {
    let exist=await adminmodel.findById(req.userid);
      if(!exist){
        return res.status(400).send('Admin not found')
      }
    const Rooms = await roommodel.find({});

      return res.status(200).json({
        'Rooms':Rooms
      });
    } catch (error) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }

})
module.exports=router;