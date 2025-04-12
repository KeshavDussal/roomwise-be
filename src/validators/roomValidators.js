// src/validators/roomValidators.js
import { body } from 'express-validator';
import moment from 'moment';

export const roomBookingValidation = [
    body('roomId')
        .isMongoId()
        .withMessage('Booking validation failed Room ID must be a valid MongoDB ObjectId'),

    body('date')
        .custom((value) => {
            // Check if the value is valid in either DD-MM-YY or YYYY-MM-DD format
            const formattedDate = moment(value, ['DD-MM-YY', 'YYYY-MM-DD'], true);
            if (!formattedDate.isValid()) {
                throw new Error('Date must be a valid date in DD-MM-YY or YYYY-MM-DD format');
            }
            // Return the formatted date in the correct format (YYYY-MM-DD)
            return formattedDate.format('YYYY-MM-DD');
        }),

    body('startTime')
        .matches(/^([0-9]{1,2}):([0-9]{2}) (AM|PM)$/)
        .withMessage('Start time must be in 12-hour format (e.g., 12:00 PM)'),

    body('endTime')
        .matches(/^([0-9]{1,2}):([0-9]{2}) (AM|PM)$/)
        .withMessage('End time must be in 12-hour format (e.g., 02:00 PM)'),

    body('purpose')
        .notEmpty()
        .withMessage('Purpose is required')
        .isString()
        .withMessage('Purpose must be a string'),
];

export const roomBookingUpdateValidation = [
    body('newStartTime')
        .matches(/^([0-9]{1,2}):([0-9]{2}) (AM|PM)$/)
        .withMessage('New start time must be in 12-hour format (e.g., 08:00 AM)'),
    body('newEndTime')
        .matches(/^([0-9]{1,2}):([0-9]{2}) (AM|PM)$/)
        .withMessage('New end time must be in 12-hour format (e.g., 10:00 AM)'),
];
