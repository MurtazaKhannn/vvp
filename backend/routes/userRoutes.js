const express = require('express');
const { getUserProfile, deleteUser } = require("../controllers/userController");
const protect = require("../middleware/authMiddleware");

const router = express.Router() ;
router.get("/:userId" , getUserProfile);
router.delete("/deleteuser/:userId" , protect , deleteUser);

module.exports = router ;