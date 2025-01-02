
const mongoose = require("mongoose");

const firmschema = new mongoose.Schema({
    firmname:{
        type:String,
        required:true,
        unique:true
    },
    area:{
        type:String,
        required:true
    },
    category:{
      type : [
        {
            type:String,
            enum : ['veg','non-veg']
        }
       ]
    },
    region :{
        type:[
            {
                type :String,
                enum:['south-Indian','north-Indian']
            }
        ]
    },
    offer:{
        type:String,
    },
    image :{
        type:String,
    },
    vendor :[
        {
        type:mongoose.Schema.Types.ObjectId,   //relation
        ref :'vendor'
        }
    ],
    products :[
        {
        type:mongoose.Schema.Types.ObjectId,   //relation
        ref :'product'
        }
    ]
});
const Firm = mongoose.model('firm',firmschema)
module.exports= Firm;