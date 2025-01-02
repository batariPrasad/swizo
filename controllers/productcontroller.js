const Product = require('../models/product');
const Firm = require('../models/firm')
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

const addproduct = async(req,res)=>{
  try {
      const {productName,price,category,bestSeller,discription} =req.body
      const image = req.file?req.file.filename:undefined;
      const firmId = req.params.firmId;

      const firm = await Firm.findById(firmId);
    if(!firm){
        res.status(404).json({message:" no firm  found"})
    }

    const product = new Product({
        productName,price,category,bestSeller,discription,image,firm:firm._id
    })
    
    
    const savedProduct = await product.save();

    firm.products.push(savedProduct);
    await firm.save();

    return res.status(200).json({product})

  } catch (error) {
    console.log(error)
    res.status(500).json("internal server error")
  }
}
  const getProductByFirm = async (req,res)=>{
    try {
        const firmId = req.params.firmId;
        const firm = await Firm.findById(firmId);

        if(!firm){
            return res.status(404).json({error:"No Firm Found"})
        }
        const restaurantName = firm.firmname;
        const products = await Product.find({firm:firmId});

        res.status(200).json({restaurantName,products});
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"internal server error"})
    }
  }

const deleteProductById = async (req,res)=>{
  try {
    const productId = req.params.productId;
    const deletedProduct = await product.findByIdAndDelete(productId);
    if(!deletedProduct){
      return res.status(404).json({error: "Noproduct Found"})
    }
  } catch (error) {
    console.log(error);
        res.status(500).json({error:"internal server error"})
  }
}
module.exports = {addproduct  :[upload.single('image'),addproduct],getProductByFirm,deleteProductById} 