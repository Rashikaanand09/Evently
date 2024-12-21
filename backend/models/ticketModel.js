// models/ticketModel.js
import mongoose from 'mongoose';

const ticketSchema = new mongoose.Schema({
    eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true }, // Reference to the event
    type: { type: String, required: true }, // e.g., "General Admission", "VIP"
    price: { type: Number, required: true },
    quantityAvailable: { type: Number, required: true },
    waitlistEnabled: { type: Boolean, default: false },
    waitlistCount: { type: Number, default: 0 }, // Count of people on the waitlist
}, { timestamps: true });

const Ticket = mongoose.model('Ticket', ticketSchema);

export default Ticket;