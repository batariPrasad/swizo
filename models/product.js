
const mongoose = require("mongoose");

const productschema = new mongoose.Schema({
    productName:{
        type:String,
        required:true
        
    },
    price:{
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

    bestSeller:{
        type:String,
    },
    image :{
        type:String,
    },
    discription :{
        type:String,
    },
    firm :[
        {
        type:mongoose.Schema.Types.ObjectId,   //relation
        ref :'firm'
        }
    ]
});
const Product = mongoose.model('product',productschema)
module.exports= Product;