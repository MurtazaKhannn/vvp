const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (file.fieldname === 'coverImage') {
            cb(null, 'uploads/coverImg/');  // Save coverImage in 'uploads/coverImg/'
        } else if (file.fieldname === 'pdf') {
            cb(null, 'uploads/pdf/');  // Save pdf in 'uploads/pdf/'
        } else {
            cb(new Error('Unexpected field'));
        }
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "_" + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg" , "application/pdf"];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("Only images and PDFs are allowed"), false);
    }
};

const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
    fileFilter
});

module.exports = upload;