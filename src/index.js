import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.js';
import roomRoutes from './routes/roomRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';
import errorHandler from './middleware/errorHandler.js';

dotenv.config(); // load .env first

const PORT = process.env.PORT || 3000;

// Initialize DB
connectDB();

// Create app
const app = express();
app.use(express.json());
app.use(errorHandler);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/rooms', roomRoutes);  // Room routes
app.use('/api/bookings', bookingRoutes);

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
