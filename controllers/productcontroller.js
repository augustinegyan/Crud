
const ProductModel = require("../model/productModel")

//get Products Controller 
const getProducts = async(req,res)=>{
    try {
        const products = await ProductModel.find({});
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}


//get Products By Id Controller. 
 const getProductsById = async (req,res)=>{
    try {
        const {id} = req.params;
        const product = await ProductModel.findById(id);
        res.status(200).json({product})
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
 }


 //post product 
 const postProducts = async (req,res)=>{
    try {
        const product = await ProductModel.create(req.body)
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
 }


 //update product 
 const updateProduct = async(req,res)=>{
    try {
        const {id} = req.params;
        const product = await ProductModel.findByIdAndUpdate(id, req.body);
        if(!product){
            return res.status(404).json({message: "Product not found"})

        }
        const updatedProduct = await ProductModel.findById(id);
        res.status(200).json(updatedProduct)
    } catch (error) {
        res.status(500).json({
            message:error.message
        })
        
    }

 }

 //delete products

 const deleteProducts = async(req,res)=>{
    try {
        const {id} = req.params; 
        const product = await ProductModel.findByIdAndDelete(id);
        if(!product){
            return res.status(404).json({message: "Product not found"})
        }
        res.status(200).json({message:"Product deleted successfully"})

    } catch (error) {
        res.status(500).json({message:error.message})
        
    }
 }




module.exports = {getProducts, getProductsById, postProducts,updateProduct,deleteProducts}
