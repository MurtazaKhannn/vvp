const express = require('express');
const { createBook , getBooks } = require("../controllers/bookController");
const protect  = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/" , protect , createBook);
router.get("/:authorId" , getBooks);

module.exports = router ;