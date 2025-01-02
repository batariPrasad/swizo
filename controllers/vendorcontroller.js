const vendor = require("../models/vendor");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const dotEnv = require("dotenv");

dotEnv.config();

const secretKey = process.env.WhatIsYourName;

const vendorRegister = async(req,res)=>{
    const {username,email,password}=req.body
    try{
        const vendorEmail = await vendor.findOne({email});
        if(vendorEmail){
            return res.status(400).json("Email already taken");
        }
        const hashedpassword = await bcrypt.hash(password,10);
        const newVendor = new vendor({
            username,
            email,password:hashedpassword
        });
        await newVendor.save();
        res.status(201).json({message:"vendor registered successfully"});
        console.log("registered")
    }catch(error){
        console.log(error);
        res.status(500).json({error:"Internal server error"});

    }
}
const vendorLogin = async(req,res)=>{
    const{email,password}=req.body;
    try{
        const vendorcheck = await vendor.findOne({email}) 
        if( !vendorcheck || !(await bcrypt.compare(password,vendorcheck.password))){
            return res.status(401).json({error:"Invalid username or password"})};

            const token = jwt.sign({vendorId : vendorcheck._id }, secretKey, {expiresIn:"1h"} )
            res.status(200).json({success:"Login successful !", token})
            console.log(email, "this is token", token);
    }
    catch(error){
        console.log(error);
        res.status(500).json({error : "Internal server error"});
    }

}
const getAllVendor = async(req,res)=>{
    try {
        const vendors = await vendor.find().populate("firm");
        res.json({vendors})
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Internal server error"})
    }
}
const getVendorById = async (req,res)=>{
    const vendorId = req.params.id;
    try {
        const vendorc = await vendor.findById(vendorId).populate('firm');
        if(!vendorc){
            return res.status(404).json({error:"vendor not found"})
        }
        res.status(200).json({vendorc})
    } catch (error) {
       console.log(error);
       res.status(500).json({error :"Internal server error"}); 
    }
}
module.exports = {vendorRegister,vendorLogin,getAllVendor,getVendorById}