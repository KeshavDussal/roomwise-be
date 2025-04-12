// src/services/roomService.js
import Room from '../models/Room.js';

// Create a new room
export const createRoom = async (roomData) => {
    const existingRoom = await Room.findOne({ roomNumber: roomData.roomNumber });
    if (existingRoom) throw new Error('Room with this number already exists');

    const room = new Room(roomData);
    await room.save();
    return room;
};

// Get all rooms
export const getAllRooms = async () => {
    return await Room.find();
};

// Get room by ID
export const getRoomById = async (roomId) => {
    return await Room.findById(roomId);
};

// Update room details
export const updateRoom = async (roomId, roomData) => {
    const room = await Room.findByIdAndUpdate(roomId, roomData, { new: true });
    if (!room) throw new Error('Room not found');
    return room;
};

// Delete a room
export const deleteRoom = async (roomId) => {
    const room = await Room.findByIdAndDelete(roomId);
    if (!room) throw new Error('Room not found');
    return room;
};
