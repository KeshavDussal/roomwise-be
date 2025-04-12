import { registerUser, loginUser } from '../services/authService.js';

export const signup = async (req, res) => {
    try {
        const userData = await registerUser(req.body);
        res.status(201).json({ message: 'User registered successfully', user: userData });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const login = async (req, res) => {
    try {
        const data = await loginUser(req.body);
        res.status(200).json(data);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
