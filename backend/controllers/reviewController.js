const Book = require("../models/Book.js");
const mongoose = require("mongoose");
const Review = require("../models/Review.js");


const addReview = async (req , res) => {
    try {
        const { bookId , rating , comment } = req.body;
        const user = req.user.id ;

        const bookExists = await Book.findById(bookId);
        if(!bookExists){
            return res.status(401).json({
                message : "Book not found"
            });
        }

        const review = new Review({bookId , user , rating , comment});
        await review.save();

        await Book.findByIdAndUpdate(bookId , {$push : {reviews : review._id}});

        res.status(201).json({ message: "Review added successfully", review });
    } catch (error) {
        res.status(500).json({ message: "Error adding review", error });
    }
}


const getBookReviews = async (req , res) => {
    try {
        const { bookId } = req.params ;

        const reviews = await Review.find({ book : bookId }).populate("user" , "name email").sort({createdAt: -1});

        res.json(reviews);
    } catch (error) {
        res.status(500).json({ message: "Error fetching reviews", error });
    }
}


module.exports = { addReview , getBookReviews }