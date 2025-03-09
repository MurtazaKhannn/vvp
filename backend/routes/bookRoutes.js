const express = require('express');
const { createBook, getBooks, deleteBook } = require("../controllers/bookController");
const protect = require("../middleware/authMiddleware");
const router = express.Router();
const upload = require("../middleware/uploadMiddleware");

router.post("/", protect, upload.fields([
    { name: "coverImage", maxCount: 1 },
    { name: "pdf", maxCount: 1 }
]), createBook);
router.get("/:authorId", getBooks);
router.delete("/deletebook/:bookId", protect, deleteBook)

module.exports = router;