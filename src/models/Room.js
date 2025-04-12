// src/models/Room.js
import mongoose from 'mongoose';

const RoomSchema = new mongoose.Schema({
    name: { type: String, required: true },
    roomNumber: { type: String, required: true, unique: true },
    status: { type: String, enum: ['available', 'booked'], default: 'available' },
    description: { type: String },
}, { timestamps: true });

const Room = mongoose.model('Room', RoomSchema);
export default Room;
