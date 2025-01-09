require('dotenv').config();
const express = require('express')
const mongoose = require('mongoose')
const app = express();
const PORT = process.env.PORT;
const productRoute = require('./routes/productRoutes')



app.use(express.json())

app.get('/',(req,res)=>{
    res.send('hello world')
})
app.use('/api',productRoute)


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
