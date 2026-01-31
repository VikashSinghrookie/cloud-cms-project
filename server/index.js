// server/index.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const complaintRoutes = require('./routes/complaintRoutes');
const app = express();


// Middleware
app.use(express.json());
app.use(cors());
app.use('/api/auth', authRoutes);
app.use('/api/complaints', complaintRoutes);


// Default Route (To check if server works)
app.get('/', (req, res) => {
    res.send('Cloud CMS Backend is Running!');
});

// Database Connection (The Cloud Connection)
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ MongoDB Atlas Connected Successfully');
    } catch (err) {
        console.error('❌ Database Connection Failed:', err.message);
        process.exit(1);
    }
};

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    connectDB();
    console.log(`🚀 Server running on port ${PORT}`);
});
