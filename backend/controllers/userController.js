const User = require("../models/User");


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




module.exports = { getUserProfile };  
