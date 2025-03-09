const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
    title : {
        type : String ,
        required : true
    } ,
    author : {
        type : mongoose.Schema.Types.ObjectId ,
        ref : "User" ,
        required : true
    } ,
    genre : {
        type : String , 
        required : true
    } ,
    description : {
        type : String
    } ,
    coverImage : {
        type : String
    } ,
    fileUrl : {
        type : String 
    } ,
    reviews : [{
        type : mongoose.Schema.Types.ObjectId ,
        ref : "Review" ,
    }]
} , { timestamps:true });

module.exports = mongoose.model("Book" , BookSchema);