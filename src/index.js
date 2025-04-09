const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const connectDB = require('./config/db');
connectDB();
require('dotenv').config();

// Middleware
app.use(express.json());

// Sample route
app.get('/', (req, res) => {
    res.send('Hello from Phase 2 Backend!');
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
