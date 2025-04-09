const mongoose = require('mongoose');

const RoomSchema = new mongoose.Schema({
    name: { type: String, required: true }, // e.g., "Conference Room", "Meeting Room A"
    roomNumber: { type: String, required: true, unique: true }, // e.g., "101", "A-02"
    status: { type: String, enum: ['available', 'booked'], default: 'available' },
    description: { type: String }, // optional: floor, features, capacity
}, { timestamps: true });

module.exports = mongoose.model('Room', RoomSchema);
