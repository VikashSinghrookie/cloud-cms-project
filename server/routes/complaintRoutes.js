// server/routes/complaintRoutes.js
const express = require('express');
const router = express.Router();
const upload = require('../utils/multer');
const { createComplaint, getMyComplaints, getAllComplaints, updateStatus } = require('../controllers/complaintController');
const authMiddleware = require('../middlewares/authMiddleware');

// Protected Routes (User must be logged in)
router.post('/', authMiddleware, upload.single('image'), createComplaint);
router.get('/', authMiddleware, getMyComplaints);


router.get('/all', authMiddleware, getAllComplaints); // Get Everything
router.put('/:id', authMiddleware, updateStatus);

module.exports = router;