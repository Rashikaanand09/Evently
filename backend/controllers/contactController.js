// controllers/contactController.js
import Contact from '../models/contact.js';

export const createContactMessage = async (req, res) => {
    try {
        const { name, email, message } = req.body;

        // Validate input
        if (!name || !email || !message) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        // Create a new contact message
        const newContactMessage = await Contact.create({ name, email, message });
        
        res.status(201).json(newContactMessage);
    } catch (error) {
        console.error('Error creating contact message:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};