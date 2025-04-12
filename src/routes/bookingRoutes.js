// routes/bookingRoutes.js
import express from 'express';
import { bookRoomController, cancelBookingController, updateBookingTimeController } from '../controllers/bookingController.js';
import { authenticate } from '../middleware/authMiddleware.js';
import { createBookingValidation, updateBookingValidation } from '../validators/bookingValidators.js';
import { validateRequest } from '../middleware/validateRequest.js';

const router = express.Router();

// Route to book a room
router.post('/book', authenticate, createBookingValidation,
    validateRequest, bookRoomController);

// Route to cancel a booking
router.post('/cancel/:id', authenticate, cancelBookingController);

// Route to update booking time
router.put('/update/:id', authenticate, updateBookingValidation,
    validateRequest, updateBookingTimeController);

export default router;
