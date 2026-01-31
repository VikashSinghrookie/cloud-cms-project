// server/controllers/authController.js
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// 1. REGISTER
exports.register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body; // <--- Get ROLE from body

        // Check if user exists
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ msg: 'User already exists' });

        // Create new user (Include the role!)
        user = new User({
            name,
            email,
            password,
            role: role || 'user' // Default to 'user' if no role chosen
        });

        // Hash password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();

        res.status(201).json({ msg: 'User registered successfully' });
    } catch (err) {
        res.status(500).send('Server Error');
    }
};

// 2. LOGIN
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check user
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ msg: 'Invalid Credentials' });

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: 'Invalid Credentials' });

        // Create Token
        const payload = { id: user.id };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

        // ⚠️ CRITICAL CHANGE HERE: Send the role back!
        res.json({ 
            token, 
            role: user.role,  // <--- This was missing!
            user: {           // Optional: Send name for welcome message
                id: user.id,
                name: user.name,
                email: user.email
            }
        });

    } catch (err) {
        res.status(500).send('Server Error');
    }
};