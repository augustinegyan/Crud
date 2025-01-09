
require('dotenv').config();

const express = require('express')
const app = express();
const mongoose = require('mongoose')
const ProductDetails = require('./model/productModel')
const PORT = process.env.PORT;

app.use(express.json())


//get 
app.get('/',(req,res)=>{
    res.status(201).json({message:"Welcome to the HomePage"})
})

//get all
app.get('/api/products',async (req,res)=>{
    try {
        const product = await ProductDetails.find({});
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
})

//post 
app.post('/api/products', async (req, res)=>{
    try {
        const product = await ProductDetails.create(req.body)
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message:error.message})
    }
})

//get by id 
app.get('/api/products/:id',async (req,res)=>{
    try {
        const {id} = req.params;
        const product = await ProductDetails.findById(id);
        res.status(200).json({product});
    } catch (error) {
        res.status(500).json({message:error.message})
    }
})

//update by id 
app.put('/api/products/:id', async (req,res)=>{
    try {
        const {id} = req.params;
        const product = await ProductDetails.findByIdAndUpdate(id, req.body);
        if(!product){
            return res.status(404).json({message: "Product not found"})
        }
        const updatedProduct = await ProductDetails.findById(id);
        res.status(200).json(updatedProduct)
    } catch (error) {
        res.status(500).json({
            message:error.message
        })
        
    }
})

//delete
app.delete('api/products/:id',async (req,res)=>{
    try {
        const {id} = req.params 
        const product = await ProductDetails.findByIdAndDelete(id)
        if(!product ){
            res.status(400).json({message: "Product not found"})
        }
        res.status(200).json({message: "Product deleted Successfully"})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
})

// app.put('/api/products/:id',async (req, res)=>{
//     try {
//         const {id} = req.params;
//         const product = await ProductDetails.findByIdAndUpdate(id, req.body);
//         if(!product){
//             res.status(500).json({message: "Error with updating kindly check your data"})
//         }
//         const updatedProduct = await ProductDetails.findById(id);
//         res.status(200).json(updatedProduct)

//     } catch (error) {
//         res.status(500).json({message:error.message})
//     }
// })

//delet by id 



mongoose.connect(process.env.MONGODB_CONNECT)
.then(()=>{
    console.log("Connected to Database ")
    app.listen(PORT,()=>{
        console.log(`Server now connected on PORT :  ${PORT}`)
    })
})
.catch((error)=>{
    console.log('Error with Connection ')
})