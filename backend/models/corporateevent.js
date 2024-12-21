import mongoose from 'mongoose';

const corporateEventSchema = new mongoose.Schema({
    eventName: { type: String, required: true },
    eventDescription: { type: String, required: true },
    city: { type: String, required: true },
    hall: { type: String, required: true },
    attendees: { type: Number, required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    status: { type: String, default: 'pending' } // Status can be 'pending', 'approved', or 'declined'
});

export const CorporateEvent = mongoose.model('CorporateEvent', corporateEventSchema);