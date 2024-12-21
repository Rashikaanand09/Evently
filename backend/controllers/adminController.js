import { Admin } from '../models/admin.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

// Helper function to generate JWT token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// Register Admin
export const registerAdmin = async (req, res) => {
    console.log(req.body);
    const { username, email, password, secretKey } = req.body;
    console.log(req.body);
    // Validate input fields
    if (!username || !email || !password || !secretKey) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    // Check if the provided secret key is valid
    if (secretKey !== process.env.ADMIN_SECRET_KEY) {
        return res.status(403).json({ message: 'Invalid secret key.' });
    }

    try {
        // Check for existing username
        const adminExistsByUsername = await Admin.findOne({ username });
        if (adminExistsByUsername) {
            return res.status(400).json({ message: 'Username already exists.' });
        }

        // Check for existing email
        const adminExistsByEmail = await Admin.findOne({ email });
        if (adminExistsByEmail) {
            return res.status(400).json({ message: 'Email already exists.' });
        }

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // Create a new admin instance
        const admin = new Admin({ username, email, password: hashedPassword ,secretKey}); // Save hashed password
        await admin.save();

        // Generate JWT token
        const token = generateToken(admin._id);

        // Respond with admin details and token
        res.status(201).json({
            _id: admin._id,
            username: admin.username,
            email: admin.email,
            token,
        });
    } catch (error) {
        console.error('Error during admin registration:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Login Admin
export const loginAdmin = async (req, res) => {
    console.log(req.body); 
    const { username, password, secretKey } = req.body; // Include secretKey in request body

    // Validate input fields
    if (!username || !password || !secretKey) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    // Check if the provided secret key is valid
    

    try {
        // Find the admin by username
        const admin = await Admin.findOne({ username });

        // If no admin found or invalid credentials
        if (!admin) {
            return res.status(401).json({ message: 'Invalid username.' });
        }
        if (secretKey !== process.env.ADMIN_SECRET_KEY) {
            return res.status(403).json({ message: 'Invalid secret key.' });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'invalid password.' });
        }

        // Generate JWT token
        const token = generateToken(admin._id);

        // Respond with admin details and token
        res.json({
            _id: admin._id,
            username: admin.username,
            email: admin.email,
            token,
        });
    } catch (error) {
        console.error('Error during admin login:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};