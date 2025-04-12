// src/models/Booking.js
import mongoose from 'mongoose';

const BookingSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    room: { type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true },
    date: { type: Date, required: true }, // day of the booking
    startTime: { type: String, required: true }, // e.g., "10:00 AM"
    endTime: { type: String, required: true },   // e.g., "12:00 PM"
    purpose: { type: String }, // optional: reason for booking
}, { timestamps: true });

const Booking = mongoose.model('Booking', BookingSchema);
export default Booking;
