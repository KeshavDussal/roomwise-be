import { body } from 'express-validator';

// ✅ For creating a room
export const createRoomValidation = [
    body('name')
        .notEmpty()
        .withMessage('Room name is required')
        .isString()
        .withMessage('Room name must be a string'),

    body('roomNumber')
        .notEmpty()
        .withMessage('Room number is required')
        .isString()
        .withMessage('Room number must be a string'),

    body('status')
        .optional()
        .isIn(['available', 'booked'])
        .withMessage('Status must be either "available" or "booked"'),

    body('description')
        .optional()
        .isString()
        .withMessage('Description must be a string'),
];

// ✅ For updating a room
export const updateRoomValidation = [
    body('name')
        .optional()
        .isString()
        .withMessage('Room name must be a string'),

    body('roomNumber')
        .optional()
        .isString()
        .withMessage('Room number must be a string'),

    body('status')
        .optional()
        .isIn(['available', 'booked'])
        .withMessage('Status must be either "available" or "booked"'),

    body('description')
        .optional()
        .isString()
        .withMessage('Description must be a string'),
];