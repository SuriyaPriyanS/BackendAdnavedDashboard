import User from '../Models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Register a new user
export const registerUser = async (req, res) => {
    try {
        const { name, email, password, city, state, country, occupation, phoneNumber, role } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists.' });
        }

        // Create a new user
        const newUser = new User({
            name,
            email,
            password,
            city,
            state,
            country,
            occupation,
            phoneNumber,
            role,
        });

        await newUser.save();
        res.status(201).json({ message: 'User registered successfully.', user: newUser });
    } catch (error) {
        console.error('Error registering user:', error.message);
        res.status(500).json({ message: 'Error registering user. Please try again later.' });
    }
};

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        // Check password
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: 'Invalid credentials.' });
        }

        // Create and sign a JWT token
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET_KEY, {
            expiresIn: '1h',
        });

        res.status(200).json({ message: 'Login successful.', token, user });
    } catch (error) {
        console.error('Error logging in:', error.message);
        res.status(500).json({ message: 'Error logging in. Please try again later.' });
    }
};

// Update user information
export const updateUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const updates = req.body;

        // Find user by ID and update
        const updatedUser = await User.findByIdAndUpdate(userId, updates, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found.' });
        }

        res.status(200).json({ message: 'User updated successfully.', user: updatedUser });
    } catch (error) {
        console.error('Error updating user:', error.message);
        res.status(500).json({ message: 'Error updating user. Please try again later.' });
    }
};
// Delete a user
export const deleteUser = async (req, res) => {
    try {
        const { userId } = req.params;

        // Find user by ID and delete
        const deletedUser = await User.findByIdAndDelete(userId);
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found.' });
        }

        res.status(200).json({ message: 'User deleted successfully.' });
    } catch (error) {
        console.error('Error deleting user:', error.message);
        res.status(500).json({ message: 'Error deleting user. Please try again later.' });
    }
};

