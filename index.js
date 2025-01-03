const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const vendorRoutes = require("./routes/vendorRoutes");
const bodyparser = require("body-parser")
const firmRoutes = require('./routes/firmRoutes')
const productRoutes = require('./routes/productRoutes')
const path = require('path')
const cors = require('cors')

const app = express()
const port = process.env.PORT || 4000;
dotenv.config();
mongoose.connect(process.env.mongo_url)
.then(()=>console.log("MONGO DB  connected successfully"))
.catch((error)=> console.log(error))
app.use(bodyparser.json())
app.use(cors)
app.use("/vendor",vendorRoutes);
app.use("/product",productRoutes);
app.use('/uploads',express.static('uploads'))
app.listen(port,()=>{
    console.log( ` server started and running at ${port}`);

})
app.use("/",(req,res)=>{
    res.send("<h1> welcome to SWIZO</h1>")
})
app.use('/firm',firmRoutes)