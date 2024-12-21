import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./events.css";

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [editingEvent, setEditingEvent] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    venue: "",
    dateTime: "",
    ticketPrice: "",
    imageUrl: null,
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/v1/events");
      console.log(response.data);
      setEvents(response.data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const handleFormChange = (e) => {
    if (e.target.name === "imageUrl") {
      setFormData({ ...formData, imageUrl: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmitEdit = async (e) => {
    e.preventDefault();
    const dataToSend = new FormData();
    for (const key in formData) {
      dataToSend.append(key, formData[key]);
    }
    try {
      await axios.put(
        `http://localhost:4000/api/v1/events/${editingEvent}`,
        dataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      fetchEvents(); // Refresh the list after editing
      setEditingEvent(null); // Clear editing state
      setFormData({
        name: "",
        venue: "",
        dateTime: "",
        ticketPrice: "",
        imageUrl: null,
      });
    } catch (error) {
      console.error("Error updating event:", error);
    }
  };

  return (
    <div className="events-container" id="events-container">
      <div className="background-image33"></div>
      <h1 className="events-title" id="events-title">Upcoming Events</h1>
      
      {/* Background with moving balls */}
      <div className="background-animation">
        {[...Array(10)].map((_, index) => (
          <div key={index} className="ball" />
        ))}
      </div>

      {/* Render the list of events */}
      {events.map((event) => (
        <div key={event._id} className="event-card" id={`event-card-${event._id}`}>
          <img
            src={`http://localhost:4000/${event.imageUrl}`}
            alt={event.name}
            className="event-image"
            id={`event-image-${event._id}`}
          />
          <h3 className="event-name" id={`event-name-${event._id}`}>{event.name}</h3>
          <p className="event-venue" id={`event-venue-${event._id}`}>
            Venue: {event.venue}
          </p>
          <p className="event-datetime" id={`event-datetime-${event._id}`}>
            Date & Time: {new Date(event.dateTime).toLocaleString()}
          </p>
          <p className="event-ticket-price" id={`event-ticket-price-${event._id}`}>
            Ticket Price: ₹{event.ticketPrice}
          </p>
          <button 
            onClick={() => navigate(`/events/${event._id}`)} 
            className="more-details-button" 
            id={`more-details-button-${event._id}`}
          >
            More Details
          </button>
        </div>
      ))}

      {editingEvent && (
        <form onSubmit={handleSubmitEdit} className="edit-event-form" id="edit-event-form">
          <h2 className="edit-event-title" id="edit-event-title">Edit Event</h2>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleFormChange}
            placeholder="Event Name"
            required
            className="edit-event-input" 
            id="edit-event-name-input"
          />
          <input
            type="text"
            name="venue"
            value={formData.venue}
            onChange={handleFormChange}
            placeholder="Venue"
            required
            className="edit-event-input" 
            id="edit-event-venue-input"
          />
          <input
            type="datetime-local"
            name="dateTime"
            value={formData.dateTime}
            onChange={handleFormChange}
            required
            className="edit-event-input" 
            id="edit-event-datetime-input"
          />
          <input
            type="number"
            name="ticketPrice"
            value={formData.ticketPrice}
            onChange={handleFormChange}
            placeholder="Ticket Price"
            required
            className="edit-event-input" 
            id="edit-event-ticket-price-input"
          />
          <input 
              type="file" 
              name="imageUrl" 
              onChange={handleFormChange} 
              required 
              className="edit-event-file-input" 
              id="edit-event-image-input"
          />
          <button type="submit" className="update-event-button" id="update-event-button">Update Event</button>
          <button type="button" onClick={() => setEditingEvent(null)} className="cancel-edit-button" id="cancel-edit-button">
              Cancel
          </button>
        </form>
      )}
    </div>
  );
};

export default EventsPage;
