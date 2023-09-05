const express = require('express');
const router = express.Router();
const Book= require('../models/bookModel');
const { default: mongoose } = require('mongoose');


//create a book
router.post('/post', async(req,res)=>{
try {
    const {title,author,year_of_publication}= req.body;
    let emptyFields = [];
    if (!title) {
        emptyFields.push('title')
    }
    if (!author) {
        emptyFields.push('author')
    }
    if (!year_of_publication) {
       emptyFields.push('year of publication') 
    }

    if (emptyFields.length >0) {
        return res.status(400).json({error:'Please fill all the fields',emptyFields})
    }

    const newBook = {
        title,
        author,
        year_of_publication

    }
    const  book = await Book.create(newBook)
    res.status(200).json(book)
} catch (error) {
return res.status(400).json({error: error.message})
}
})

// get all books
 router.get('/books', async(req,res)=>{
try {
const books = await Book.find({})
.sort({createdAt:-1})
res.status(200).json({
    count: books.length,
    data: books
})
}
catch (error) {
  console.log('Error occured:', error)  
}})

//get each book
router.get('/book/:id', async(req,res)=>{

try {
 const {id} = req.params;
if (!mongoose.Types.ObjectId.isValid(id)) {
   return res.status(404).json({error: 'No such book found'}) 
} else{
 const book = await Book.findById(id)
 res.status(200).json(book)
}
} catch (error) {
     
}
})
  
// update a book
router.put('/book/:id', async(req,res)=>{
    try {
     const {id} = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
       return res.status(404).json({error: 'No such book found'}) 
    } else{
     const book = await Book.findOneAndUpdate(id,req.body)
     res.status(200).json(book)
    }
    } catch (error) {
         
    }
    })
      
//delete book
router.delete('/book/:id', async(req,res)=>{
    try {
     const {id} = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
       return res.status(404).json({error: 'No such book found'}) 
    } else{
     const book = await Book.findOneAndDelete(id)
     if (!book) {
        return res.status(404).json({message:'Book not found'})
     }
     res.status(200).send('Book deleted successfully')
    }
    } catch (error) {
         console.log(error.message);
         res.status(500).send({message:error.message})
    }
    })

module.exports  = router;
//module.exports ={postbook,getBooks,getSingleBook,updateBook,deleteBook}
