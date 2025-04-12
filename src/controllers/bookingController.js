// controllers/bookingController.js
import { bookRoom, cancelBooking, updateBookingTime } from '../services/bookingService.js';

// Book a room
export const bookRoomController = async (req, res) => {
    const { roomId, date, startTime, endTime, purpose } = req.body;
    const userId = req.user.id;  // The user ID is available after authentication

    try {
        const booking = await bookRoom(userId, roomId, date, startTime, endTime, purpose);
        return res.status(200).json({ message: 'Room booked successfully', booking });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

// Cancel a booking
export const cancelBookingController = async (req, res) => {
    const bookingId = req.params.id;
    const userId = req.user.id;
    console.log("userId", userId);


    try {
        const response = await cancelBooking(bookingId, userId);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

// Update booking time
export const updateBookingTimeController = async (req, res) => {
    const bookingId = req.params.id;
    const { newStartTime, newEndTime } = req.body;
    const userId = req.user.id;

    try {
        const updatedBooking = await updateBookingTime(bookingId, userId, newStartTime, newEndTime);
        return res.status(200).json({ message: 'Booking updated successfully', updatedBooking });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};
