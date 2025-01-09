require('dotenv').config();
const { json } = require('body-parser');
const express = require('express')
const mongoose = require('mongoose')
const app = express();
const ProductModel = require('./model/productModel');
const Product = require('./model/productModel');
const PORT = process.env.PORT;



app.use(express.json())

app.get('/',(req,res)=>{
    res.send('hello world')
})

app.get('/api/products', async (req,res)=>{
    try {
        const products = await ProductModel.find({});
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
})

app.get('/api/product/:id', async (req,res)=>{
    try {
        const {id} = req.params;
        const product = await ProductModel.findById(id);
        res.status(200).json({product})
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
})

app.post('/api/products', async (req,res)=>{
    try {
        const product = await ProductModel.create(req.body)
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
})


//update a product 
app.put('/api/product/:id', async(req,res)=>{
    try {
        const {id} = req.params;
        const product = await ProductModel.findByIdAndUpdate(id, req.body);
        if(!product){
            return res.status(404).json({message: "Product not found"})

        }
        const updatedProduct = await Product.findById(id);
        res.status(200).json(updatedProduct)
    } catch (error) {
        res.status(500).json({
            message:error.message
        })
        
    }
})

//delete Product 

app.delete('/api/product/:id', async (req,res)=>{
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
})




mongoose.connect(process.env.MONGODB_CONNECT)
.then(()=>{
    console.log("Connected to Database")
    app.listen(PORT,()=>{
        console.log(`Server Started on PORT: ${PORT}`)
    })
}) 
.catch((error)=>{
    console.log('Could not connect something is wrong', error)
})
