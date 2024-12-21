// Import Event model
import { Event } from '../models/createevent.js';
import path from 'path';
// Create Event
export const createEvent = async (req, res) => {
  try {
    // Extract other event details from req.body
    const { name, venue, dateTime, ticketPrice } = req.body;
    
    // Validate required fields
    if (!name || !venue || !dateTime || !ticketPrice) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    let imageUrl = null;
    if (req.file) {
      // Normalize the file path (replace backslashes with forward slashes)
      imageUrl = path.normalize(req.file.path).replace(/\\+/g, '/');
      console.log('Normalized image path:', imageUrl);
    }
    // Create a new event without the image
    const newEvent = await Event.create({
      name,
      venue,
      dateTime,
      ticketPrice,
      imageUrl
    });

    // Send response with the created event
    res.status(201).json(newEvent);
  } catch (error) {
    console.error('Error creating event:', error);

    // Handle specific error cases if necessary
    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({ message: error.errors.map(err => err.message) });
    }

    // Generic error response
    res.status(500).json({ message: 'Internal Server Error' });
    console.error('Error creating event:', error.message);
  }
};

// Get All Events
export const getEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Event
// export const updateEvent = async (req, res) => {
//   const { id } = req.params;
//   const { name, venue, dateTime, ticketPrice } = req.body;
//   console.log('Updating event with data:', req.body);


//   try {
//     const updatedEvent = await Event.findByIdAndUpdate(id, {
//       name,
//       venue,
//       dateTime,
//       ticketPrice,
//     }, { new: true }); // Return the updated document

//     if (!updatedEvent) {
//       return res.status(404).json({ message: 'Event not found' });
//     }

//     res.status(200).json(updatedEvent);
//   } catch (error) {
//     console.error('Error updating event:', error);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// };
export const updateEvent = async (req, res) => {
  const { id } = req.params;
  const { name, venue, dateTime, ticketPrice } = req.body;

  try {
      // Find existing event
      const existingEvent = await Event.findById(id);
      
      if (!existingEvent) {
          return res.status(404).json({ message: 'Event not found' });
      }

      // Prepare updated data
      let updatedData = {
          name,
          venue,
          dateTime,
          ticketPrice,
      };

      // Only update imageUrl if a new file has been uploaded
      if (req.file) {
          updatedData.imageUrl = path.normalize(req.file.path).replace(/\\+/g, '/');
      }
      
      // Update the event with new data
      const updatedEvent = await Event.findByIdAndUpdate(id, updatedData, { new: true });

      res.status(200).json(updatedEvent);
  } catch (error) {
      console.error('Error updating event:', error);
      res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Delete Event
export const deleteEvent = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedEvent = await Event.findByIdAndDelete(id);

    if (!deletedEvent) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.status(200).json({ message: 'Event deleted successfully' });
  } catch (error) {
    console.error('Error deleting event:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
