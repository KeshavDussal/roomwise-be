// services/bookingService.js
import Booking from '../models/Booking.js';
import Room from '../models/Room.js';

// Book a room
export const bookRoom = async (userId, roomId, date, startTime, endTime, purpose) => {
    // Check if the room is available for the requested time
    const existingBooking = await Booking.findOne({
        room: roomId,
        date: date,
        $or: [
            { startTime: { $lt: endTime }, endTime: { $gt: startTime } }, // Check time overlap
        ],
    });

    if (existingBooking) {
        throw new Error('Room is already booked for this time');
    }

    // Create a new booking
    const booking = new Booking({
        user: userId,
        room: roomId,
        date: date,
        startTime: startTime,
        endTime: endTime,
        purpose: purpose || 'No purpose specified',
    });

    await booking.save();

    // Update room status to 'booked'
    const room = await Room.findById(roomId);
    room.status = 'booked';
    await room.save();

    return booking;
};

// Cancel a booking
export const cancelBooking = async (bookingId, userId) => {
    const booking = await Booking.findById(bookingId).populate('room');

    if (!booking) {
        throw new Error('Booking not found');
    }

    if (booking.user.toString() !== userId) {
        throw new Error('You can only cancel your own bookings');
    }

    // Delete the booking and update room status
    await booking.deleteOne();

    const room = booking.room;
    room.status = 'available';
    await room.save();

    return { message: 'Booking cancelled successfully' };
};

// Update booking timing
export const updateBookingTime = async (bookingId, userId, newStartTime, newEndTime) => {
    const booking = await Booking.findById(bookingId).populate('room');

    if (!booking) {
        throw new Error('Booking not found');
    }

    if (booking.user.toString() !== userId) {
        throw new Error('You can only update your own bookings');
    }

    // Check if the room is available for the new time slot
    const existingBooking = await Booking.findOne({
        room: booking.room._id,
        date: booking.date,
        $or: [
            { startTime: { $lt: newEndTime }, endTime: { $gt: newStartTime } }, // Check time overlap
        ],
    });

    if (existingBooking) {
        throw new Error('Room is already booked for the new time slot');
    }

    // Update the booking with the new times
    booking.startTime = newStartTime;
    booking.endTime = newEndTime;

    await booking.save();

    return booking;
};
