// server/utils/multer.js
const multer = require('multer');
const path = require('path');

// Save file locally first (Stateless requirement: we will delete it later)
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

module.exports = multer({ storage: storage });