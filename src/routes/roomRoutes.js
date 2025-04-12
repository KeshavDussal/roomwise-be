// src/routes/roomRoutes.js
import express from 'express';
import { createRoomController, getAllRoomsController, getRoomByIdController, updateRoomController, deleteRoomController } from '../controllers/roomController.js';
import { authenticate } from '../middleware/authMiddleware.js';  // Optional: Protect routes with authentication
import { authorizeRoles } from '../middleware/roleMiddleware.js';
import { validateRequest } from '../middleware/validateRequest.js';
import { roomBookingUpdateValidation, roomBookingValidation } from '../validators/roomValidators.js';

const router = express.Router();

// CRUD routes
router.post('/', authenticate, authorizeRoles('admin'), roomBookingValidation, validateRequest, createRoomController);  // Use 'authenticate' middleware if needed
router.get('/', getAllRoomsController);
router.get('/:id', getRoomByIdController);
router.put('/:id', authenticate, authorizeRoles('admin'), roomBookingUpdateValidation, validateRequest, updateRoomController);  // Use 'authenticate' middleware if needed
router.delete('/:id', authenticate, authorizeRoles('admin'), deleteRoomController);  // Use 'authenticate' middleware if needed

export default router;
