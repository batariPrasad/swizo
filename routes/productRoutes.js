
const express = require('express');

const productController = require('../controllers/productcontroller')

const router = express.Router();

router.post('/add-product/:firmId',productController.addproduct)
router.get('/:firmId/products', productController.getProductByFirm)
router.get('/uploads/:imageName',(req,res)=>{
    const imageName = req.params.imageName;
    res.headersSent('Content-Type','image/jpg');
    res.sendFile(path.join(__dirname,'..','uploads',imageName))
})
router.delete('/:productId',productController.deleteProductById);
module.exports = router;