// server/models/Complaint.js
const mongoose = require('mongoose');

const ComplaintSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Links to the User who posted it
        required: true
    },
    title: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String },
    cloudinary_id: { type: String },
    status: {
        type: String,
        enum: ['Pending', 'Resolved'],
        default: 'Pending'
    },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Complaint', ComplaintSchema);