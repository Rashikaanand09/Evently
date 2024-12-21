// controllers/ticketController.js
import Ticket from '../models/ticketModel.js';
import QRCode from 'qrcode'; // QR Code generation library

// Create a new ticket
export const createTicket = async (req, res) => {
    const { eventId, type, price, quantityAvailable, waitlistEnabled } = req.body;

    try {
        const newTicket = await Ticket.create({ eventId, type, price, quantityAvailable, waitlistEnabled });
        res.status(201).json(newTicket);
    } catch (error) {
        console.error('Error creating ticket:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Get all tickets for an event
export const getTicketsForEvent = async (req, res) => {
    const { eventId } = req.params;

    try {
        const tickets = await Ticket.find({ eventId });
        res.status(200).json(tickets);
    } catch (error) {
        console.error('Error fetching tickets:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Register for a ticket
export const registerForTicket = async (req, res) => {
    const { ticketId } = req.params;
    const { attendeeName } = req.body; // Assuming you want to capture attendee name

    try {
        const ticket = await Ticket.findById(ticketId);
        
        if (!ticket) {
            return res.status(404).json({ message: 'Ticket not found' });
        }

        if (ticket.quantityAvailable > 0) {
            // Decrease available quantity
            ticket.quantityAvailable -= 1;
            await ticket.save();

            // Generate QR code for the attendee
            const qrCodeData = `Ticket ID: ${ticket._id}, Attendee Name: ${attendeeName}`;
            const qrCodeUrl = await QRCode.toDataURL(qrCodeData);

            res.status(200).json({ message: 'Registration successful', qrCodeUrl });
        } else if (ticket.waitlistEnabled) {
            // Add to waitlist logic
            ticket.waitlistCount += 1;
            await ticket.save();
            res.status(200).json({ message: 'Added to waitlist' });
        } else {
            return res.status(400).json({ message: 'No tickets available and waitlist is not enabled' });
        }
    } catch (error) {
        console.error('Error registering for ticket:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};