const mongoose = require('mongoose')
require('dotenv').config();

// mongoose.connect(process.env.DATABASE_URL)
mongoose.connect('mongodb+srv://thrishalmadasu:CsounpLsqMgMRUn1@cluster0.ub8lkxx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');

const connection = mongoose.connection

connection.on('connected' , ()=>{
    console.log('Connection Successful')
})
connection.on('error' , ()=>{
    console.log('Connection unsuccessful')
})