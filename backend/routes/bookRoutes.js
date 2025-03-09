const express = require('express');
const { createBook , getBooks , deleteBook } = require("../controllers/bookController");
const protect  = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/" , protect , createBook);
router.get("/:authorId" , getBooks);
router.delete("/deletebook/:bookId" , protect , deleteBook)

module.exports = router ;