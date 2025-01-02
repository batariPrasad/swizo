const Firm = require('../models/firm');
const vendor = require('../models/vendor');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './uploads/');  // Destination folder for storing images
    },
    filename: (req, file, cb) => {
      // Setting a custom filename to avoid collisions
      cb(null, Date.now() + path.extname(file.originalname)); // Add timestamp to filename
    }
  });
  
  // Initialize multer with the storage settings
  const upload = multer({  storage: storage})

const addFirm = async(req,res)=>{
  try {
      const {firmname,area,category,region,offer} =req.body
      const image = req.file?req.file.filename:undefined;
      const vendorc = await vendor.findById(req.vendorId);
    if(!vendorc){
        res.status(404).json({message:"vendor not found"})
    }
    const firm = new Firm({
        firmname,area,category,region,offer,image,vendor:vendorc._id
    })
    
    // await firm.save();
    const savedFirm = await firm.save();

    vendorc.firm.push(savedFirm);
    await vendorc.save();

    return res.status(200).json({message: 'Firm added successfully'})

  } catch (error) {
    console.log(error)
    res.status(500).json("internal server error")
  }

}
const deleteFirmById = async (req,res)=>{
  try {
    const firmId = req.params.firmId;
    const deletedProduct = await firm.findByIdAndDelete(firmId);
    if(!deletedProduct){
      return res.status(404).json({error: "Noproduct Found"})
    }
  } catch (error) {
    console.log(error);
        res.status(500).json({error:"internal server error"})
  }
}
module.exports = {addFirm  :[upload.single('image'),addFirm],deleteFirmById } 