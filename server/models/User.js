// server/models/User.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true // No two users can have the same email
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'admin'], // We have two types of users
        default: 'user'
    }
});

module.exports = mongoose.model('User', UserSchema);