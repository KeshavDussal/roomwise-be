const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true }, // should be hashed in production
    role: { type: String, enum: ['admin', 'employee'], default: 'employee' },
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
