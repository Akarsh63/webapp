const mongoose =require('mongoose');
const roomsschema=new mongoose.Schema({
    "roomnumber":{
        type:String,
        required:true
    },
    "options":{
        type:String,
        default:"single",
        required:true
    },
    "booking":[{
        type: mongoose.Schema.Types.ObjectId,
        // required: true,
        ref: "bookingsmodel"
    }]
})

module.exports=roommodel=mongoose.model('roommodel', roomsschema)