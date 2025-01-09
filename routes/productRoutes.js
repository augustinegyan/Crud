const express = require('express')
const router = express.Router();
const { getProducts, getProductsById, postProducts,updateProduct,deleteProducts} = require('../controllers/productcontroller')

//get
router.get('/products',getProducts);

//get By Id 
router.get('/products/:id',getProductsById);

//post 
router.post('/products',postProducts)

//update
router.put('/products/:id',updateProduct)

//delete
router.delete('/products/:id',deleteProducts)

module.exports = router;