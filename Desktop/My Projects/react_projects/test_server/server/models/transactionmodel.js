const mongoose =require('mongoose');
const transactionSchema=new mongoose.Schema({
    "senderid":{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    "sendername":{
        type:String
    },
    "recieverid":{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    "recievername":{
        type:String
    },
    "amount":{
        type:String,
        required:true
    },
})

module.exports=transactionmodel=mongoose.model('transactionmodel', transactionSchema)