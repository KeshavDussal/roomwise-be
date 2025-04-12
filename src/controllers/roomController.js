// src/controllers/roomController.js
import { createRoom, getAllRooms, getRoomById, updateRoom, deleteRoom } from '../services/roomService.js';

// Create a new room
export const createRoomController = async (req, res) => {
    try {
        const room = await createRoom(req.body);
        res.status(201).json(room);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all rooms
export const getAllRoomsController = async (req, res) => {
    try {
        const rooms = await getAllRooms();
        res.status(200).json(rooms);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get a room by ID
export const getRoomByIdController = async (req, res) => {
    try {
        const room = await getRoomById(req.params.id);
        res.status(200).json(room);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

// Update a room
export const updateRoomController = async (req, res) => {
    try {
        const room = await updateRoom(req.params.id, req.body);
        res.status(200).json(room);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a room
export const deleteRoomController = async (req, res) => {
    try {
        const room = await deleteRoom(req.params.id);
        res.status(200).json({ message: 'Room deleted successfully' });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};
