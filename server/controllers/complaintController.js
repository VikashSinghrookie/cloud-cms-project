// server/controllers/complaintController.js
const Complaint = require('../models/Complaint');
const cloudinary = require('../utils/cloudinary');
const fs = require('fs');

// 1. Create Complaint (For Members)
exports.createComplaint = async (req, res) => {
    try {
        const { title, description } = req.body;
        let result;

        // Upload Image to Cloudinary (if exists)
        if (req.file) {
            result = await cloudinary.uploader.upload(req.file.path, {
                folder: "cms_project"
            });
            // Delete local file (Statelessness)
            fs.unlinkSync(req.file.path);
        }

        // Save to DB
        const newComplaint = new Complaint({
            user: req.user.id, // Comes from Auth Middleware
            title,
            description,
            imageUrl: result ? result.secure_url : null,
            cloudinary_id: result ? result.public_id : null
        });

        await newComplaint.save();
        res.status(201).json(newComplaint);

    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

// 2. Get complaints for the logged-in user (For Members)
exports.getMyComplaints = async (req, res) => {
    try {
        const complaints = await Complaint.find({ user: req.user.id }).sort({ createdAt: -1 });
        res.json(complaints);
    } catch (err) {
        res.status(500).send('Server Error');
    }
};

// ==========================================
// NEW: LEADER / ADMIN FUNCTIONS
// ==========================================

// 3. Get ALL complaints (For Club Leaders)
exports.getAllComplaints = async (req, res) => {
    try {
        // .populate('user', 'name') replaces the User ID with the actual Name of the person
        const complaints = await Complaint.find()
            .populate('user', 'name email') 
            .sort({ createdAt: -1 });
            
        res.json(complaints);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

// 4. Update Complaint Status (For Club Leaders)
exports.updateStatus = async (req, res) => {
    try {
        const { status } = req.body;

        // Find complaint by ID and update
        let complaint = await Complaint.findById(req.params.id);
        
        if (!complaint) {
            return res.status(404).json({ msg: 'Complaint not found' });
        }

        complaint.status = status;
        await complaint.save();

        res.json(complaint);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};