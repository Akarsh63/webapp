const mongoose =require('mongoose');
const userschema=new mongoose.Schema({
    "username":{
        type:String,
        required:true
    },
    "email":{
        type:String,
        required:true
    },
    "balance":{
        type:String,
        required:true
    },
})

module.exports=usersmodel=mongoose.model('usersmodel', userschema)