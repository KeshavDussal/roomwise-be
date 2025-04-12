// services/bookingService.js
import Booking from '../models/Booking.js';
import Room from '../models/Room.js';

// Function to parse "08:00 AM" style time into Date object
const parseTime = (timeStr) => {
    const [time, modifier] = timeStr.split(' ');
    let [hours, minutes] = time.split(':').map(Number);
    if (modifier === 'PM' && hours !== 12) hours += 12;
    if (modifier === 'AM' && hours === 12) hours = 0;
    return { hours, minutes };
};

const getDateTime = (dateStr, timeStr) => {
    const { hours, minutes } = parseTime(timeStr);
    const date = new Date(dateStr);
    date.setHours(hours);
    date.setMinutes(minutes);
    date.setSeconds(0);
    return date;
};

export const bookRoom = async (userId, roomId, date, startTime, endTime, purpose) => {
    // Convert start/end into Date objects
    const newStart = getDateTime(date, startTime);
    const newEnd = getDateTime(date, endTime);

    // Get all bookings for the same room and date
    const bookings = await Booking.find({ room: roomId, date });

    // Check for overlap
    const hasConflict = bookings.some(booking => {
        const bookedStart = getDateTime(date, booking.startTime);
        const bookedEnd = getDateTime(date, booking.endTime);
        return newStart < bookedEnd && newEnd > bookedStart;
    });

    if (hasConflict) {
        const availableSlots = await findAvailableTimeSlots(roomId, date);
        throw new Error(`Room is already booked for the requested time. Suggested available time slots: ${availableSlots.join(', ')}`);
    }

    // Save the new booking
    const booking = new Booking({
        user: userId,
        room: roomId,
        date,
        startTime,
        endTime,
        purpose: purpose || 'No purpose specified',
    });

    await booking.save();

    // Update room status
    const room = await Room.findById(roomId);
    room.status = 'booked';
    await room.save();

    return booking;
};


// Function to find available time slots for the room
const findAvailableTimeSlots = async (roomId, date) => {
    const bookedSlots = await Booking.find({ room: roomId, date });

    const timeSlots = [
        { start: "08:00 AM", end: "10:00 AM" },
        { start: "10:00 AM", end: "12:00 PM" },
        { start: "12:00 PM", end: "02:00 PM" },
        { start: "02:00 PM", end: "04:00 PM" },
        { start: "04:00 PM", end: "06:00 PM" },
    ];

    const availableSlots = [];

    for (const slot of timeSlots) {
        const slotStart = getDateTime(date, slot.start);
        const slotEnd = getDateTime(date, slot.end);

        const overlap = bookedSlots.some(booking => {
            const bookedStart = getDateTime(date, booking.startTime);
            const bookedEnd = getDateTime(date, booking.endTime);
            return slotStart < bookedEnd && slotEnd > bookedStart;
        });

        if (!overlap) {
            availableSlots.push(`${slot.start} - ${slot.end}`);
        }
    }

    return availableSlots;
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

    const date = booking.date;
    const newStart = getDateTime(date, newStartTime);
    const newEnd = getDateTime(date, newEndTime);

    const bookings = await Booking.find({
        room: booking.room._id,
        date: date,
        _id: { $ne: bookingId }, // exclude this booking
    });

    const hasConflict = bookings.some(existing => {
        const existingStart = getDateTime(date, existing.startTime);
        const existingEnd = getDateTime(date, existing.endTime);
        return newStart < existingEnd && newEnd > existingStart;
    });

    if (hasConflict) {
        const availableSlots = await findAvailableTimeSlots(booking.room._id, date);
        throw new Error(`Room is already booked for the new time slot. Suggested available time slots: ${availableSlots.join(', ')}`);
    }

    // Proceed to update booking
    booking.startTime = newStartTime;
    booking.endTime = newEndTime;
    await booking.save();

    return booking;
};
