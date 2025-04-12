import { body } from 'express-validator';
import moment from 'moment';

// ✅ Validation for creating a booking
export const createBookingValidation = [
    body('userId')
        .isMongoId()
        .withMessage('User must be a valid MongoDB ObjectId'),

    body('roomId')
        .isMongoId()
        .withMessage('Room must be a valid MongoDB ObjectId'),

    body('date')
        .custom((value) => {
            const formattedDate = moment(value, ['DD-MM-YY', 'YYYY-MM-DD'], true);
            if (!formattedDate.isValid()) {
                throw new Error('Date must be a valid date in DD-MM-YY or YYYY-MM-DD format');
            }
            return true;
        }),

    body('startTime')
        .matches(/^([0-9]{1,2}):([0-9]{2}) (AM|PM)$/)
        .withMessage('Start time must be in 12-hour format (e.g., 10:00 AM)'),

    body('endTime')
        .matches(/^([0-9]{1,2}):([0-9]{2}) (AM|PM)$/)
        .withMessage('End time must be in 12-hour format (e.g., 12:00 PM)'),

    body('purpose')
        .optional()
        .isString()
        .withMessage('Purpose must be a string'),
];

// ✅ Optional: For updating a booking
export const updateBookingValidation = [
    body('startTime')
        .optional()
        .matches(/^([0-9]{1,2}):([0-9]{2}) (AM|PM)$/)
        .withMessage('Start time must be in 12-hour format (e.g., 10:00 AM)'),

    body('endTime')
        .optional()
        .matches(/^([0-9]{1,2}):([0-9]{2}) (AM|PM)$/)
        .withMessage('End time must be in 12-hour format (e.g., 12:00 PM)'),

    body('purpose')
        .optional()
        .isString()
        .withMessage('Purpose must be a string'),
];
