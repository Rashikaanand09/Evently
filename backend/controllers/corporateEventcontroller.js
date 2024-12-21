import { CorporateEvent } from '../models/corporateevent.js';

// Create Corporate Event
export const createCorporateEvent = async (req, res) => {
    try {
        const { eventName, eventDescription, city, hall, attendees, date, time } = req.body;

        // Validate required fields
        if (!eventName || !eventDescription || !city || !hall || !attendees || !date || !time) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        const newEvent = new CorporateEvent({
            eventName,
            eventDescription,
            city,
            hall,
            attendees,
            date,
            time,
        });

        await newEvent.save();
        res.status(201).json(newEvent);
    } catch (error) {
        console.error('Error creating corporate event:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Get All Corporate Events
export const getCorporateEvents = async (req, res) => {
    try {
        const events = await CorporateEvent.find();
        res.json(events);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Approve a Corporate Event
export const approveCorporateEvent = async (req, res) => {
    const { id } = req.params;
    
    try {
        const updatedEvent = await CorporateEvent.findByIdAndUpdate(id, { status: 'approved' }, { new: true });
        
        if (!updatedEvent) return res.status(404).json({ message: 'Corporate event not found' });
        
        res.json(updatedEvent);
    } catch (error) {
        console.error('Error approving corporate event:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Decline a Corporate Event
export const declineCorporateEvent = async (req, res) => {
    const { id } = req.params;

    try {
        const updatedEvent = await CorporateEvent.findByIdAndUpdate(id, { status: 'declined' }, { new: true });

        if (!updatedEvent) return res.status(404).json({ message: 'Corporate event not found' });

        res.json(updatedEvent);
    } catch (error) {
        console.error('Error declining corporate event:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Check for Event Conflicts
// Check for Event Conflicts
export const checkEventConflict = async (req, res) => {
    const { date, time, hall, city } = req.query; // Get hall and city from query parameters

    try {
        const conflictingEvents = await CorporateEvent.find({
            date: new Date(date), // Ensure the date is in the correct format
            time: time,
            hall: hall,
            city: city
        });

        if (conflictingEvents.length > 0) {
            return res.status(409).json({ message: 'This slot is already booked.' });
        }

        res.status(200).json({ message: 'Slot is available.' });
    } catch (error) {
        console.error('Error checking event conflict:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}; 