import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom"; // To get the event ID from URL

const EventDetails = () => {
    const { id } = useParams(); // Get the event ID from the URL
    const [event, setEvent] = useState(null);

    useEffect(() => {
        const fetchEventDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/api/v1/events/${id}`);
                setEvent(response.data);
            } catch (error) {
                console.error('Error fetching event details:', error);
            }
        };

        fetchEventDetails();
    }, [id]);

    if (!event) return <div className="loading-message" id="loading-message">Loading...</div>; // Show loading message while fetching data

    return (
        <div className="event-details-container" id="event-details-container">
            <h1 className="event-title" id="event-title">{event.name}</h1>
            <img 
                src={event.imageUrl} 
                alt={event.name} 
                className="event-detail-image" 
                id="event-image"
            />
            <p className="event-venue" id="event-venue">
                <strong>Venue:</strong> {event.venue}
            </p>
            <p className="event-datetime" id="event-datetime">
                <strong>Date & Time:</strong> {new Date(event.dateTime).toLocaleString()}
            </p>
            <p className="event-ticket-price" id="event-ticket-price">
                <strong>Ticket Price:</strong> ${event.ticketPrice}
            </p>
            {/* Add more details as needed */}
            <p className="event-description" id="event-description">
                <strong>Description:</strong> {event.description} {/* Assuming you have a description field */}
            </p>
        </div>
    );
};

export default EventDetails;