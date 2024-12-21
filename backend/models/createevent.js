import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  venue: { type: String, required: true },
  dateTime: { type: String, required: true },
  ticketPrice: { type: String, required: true },
  imageUrl: { type: String,
    required:true
   },
});

export const Event = mongoose.model('Event', eventSchema);