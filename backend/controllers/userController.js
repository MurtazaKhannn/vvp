const User = require("../models/User");
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const Book = require("../models/Book");



const getUserProfile = async (req , res) => {
    try {
        const { userId } = req.params ;

        const user = await User.findById(userId).select("-password").populate({
            path : "books" ,
            select : "title description  coverImage"
        });

        if(!user){
            return resizeBy.status(404).json({ message : "User not found"});
        }

        res.json(user);
    } catch (error) {
        
    }
}


const deleteUser = async (req , res) => {
    try {
        const userId = req.user.id ;

        if(!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message : "Invalid UserId" });
        }

        const user = await User.findById(userId);
        if(!user){
            return res.status(404).json({ message: "User not found" });
        }

        if(user.role === "author"){
            const books = await Book.find({ author : userId });

            books.forEach((book) => {
                const coverImagePath = path.join(__dirname, "..", book.coverImage);
                if (fs.existsSync(coverImagePath)) {
                    fs.unlinkSync(coverImagePath);
                }

                if (book.fileUrl) {
                    const pdfPath = path.join(__dirname, "..", book.fileUrl);
                    if (fs.existsSync(pdfPath)) {
                        fs.unlinkSync(pdfPath);
                    }
                }
            })

            await Book.deleteMany({ author: userId });
        }

        await User.findByIdAndDelete(userId);
        res.status(200).json({ message : "User Deleted Successfully "});
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({ message: "Error deleting user" });
    }
}




module.exports = { getUserProfile , deleteUser };  
