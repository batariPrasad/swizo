const vendor  = require("../models/vendor");
const jwt  = require("jsonwebtoken");
const dotenv = require('dotenv')
dotenv.config();

const secretKey = process.env.WhatIsYourName
const verifyToken = async(req,res,next)=>{
    const token = req.headers.token;
    if(!token){
        return res.status(401).json({error :"Token is Required"});
    }
    try{
        const decoded = jwt.verify(token,secretKey);
        const vendorc = await vendor.findById(decoded.vendorId);
        if(!vendorc){
            return res.status(404).json({error:"vendor not found"})
        }

        req.vendorId = vendorc._id
        next()
    }catch (error) { 
        console.log(error)
        return res.status(500).json({error :"invalid token"})
    }
}
module.exports=verifyToken