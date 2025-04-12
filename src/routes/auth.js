// src/routes/auth.js
import express from 'express';
import { signup, login } from '../controllers/authController.js';
import { authenticate } from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/roleMiddleware.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);

// Example: protected route for admin
router.get('/admin-only', authenticate, authorizeRoles('admin'), (req, res) => {
    res.json({ message: `Welcome, Admin ${req.user.id}` });
});

// Example: accessible to both roles
router.get('/dashboard', authenticate, authorizeRoles('admin', 'employee'), (req, res) => {
    res.json({ message: `Hello ${req.user.role} user` });
});

export default router;
