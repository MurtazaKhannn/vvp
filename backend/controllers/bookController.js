const Book = require("../models/Book.js");
const mongoose = require("mongoose");
const User = require("../models/User.js");

const createBook = async (req , res) => {
    try {
        const { title , author , genre , description , coverImage , fileUrl } = req.body ;
        console.log(title , author , description , genre , coverImage , fileUrl);

        if (!mongoose.Types.ObjectId.isValid(author)) {
            return res.status(400).json({ message: "Invalid author ID format" });
        }
        
        const book = await Book.create({ title , author : new mongoose.Types.ObjectId(author) , genre , description , coverImage , fileUrl });

        await User.findByIdAndUpdate(author , {$push : { books : book._id } });

        console.log(book);

        res.status(201).json({ message: "Book created", book });
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Error creating book" });
    }
}

const getBooks = async (req , res) => {
    try {
        const { author } = req.params ;
        const filter = author ? {author} : {}
        const books = await Book.find(filter).populate("author" , "name");
        console.log(books);
        
        res.json(books);
    } catch (error) {
        res.status(500).json({ message: "Error fetching books" });
    }
}

const deleteBook = async (req , res) => {
    try {
        const { bookId } = req.params ;
        const userId = req.user.id ;

        console.log(bookId);


        if (!mongoose.Types.ObjectId.isValid(bookId)) {
            return res.status(400).json({ message: "Invalid book ID format" });
        }

        const book = await Book.findById(bookId);
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }

        console.log(userId);

        await Book.findByIdAndDelete(bookId);
        await User.findByIdAndUpdate(userId , {$pull : {books : bookId}});

        res.json({ message : "Book Deleted Successfully"})

    } catch (error) {
        console.log(error)
        res.status(500).json({ message : "Error Deleting Book"});
    }
}

module.exports = { createBook , getBooks , deleteBook } ;