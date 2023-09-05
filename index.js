
require('dotenv').config();
const URL=process.env.URI || PORT
const express = require('express');
const app =  express();
const port = 3001;
const cors = require('cors');
const MONGO_URI = require('./config/config');
const mongoose = require('mongoose');
const bookRoutes = require('./routes/bookroutes.js')
//const {postbook,getBooks,getSingleBook, updateBook,deleteBook} = require('./routes/bookroutes');


app.use(express.urlencoded({extended:true}))
app.use(express.json());
app.use(cors());
/*
app.use(
    cors({
        origin:'http://localhost:3001',
        methods:['GET','POST','PUT','DELETE'],
        allowedHeaders:['Content-Type'],
    })
)
*/

app.use(express.json())
app.use('/api',bookRoutes);
mongoose
.connect(URL)
.then(()=>{
    console.log('Database connected Successfully')
    app.listen(port,()=>{
        console.log(`server running at http://localhost: ${port}`)
    })
})
.catch((error)=>{
    console.log('Error:', error)
})
