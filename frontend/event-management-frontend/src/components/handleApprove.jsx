import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './handleApprove.css'; // Import the CSS file for styles

const ApproveEvents = () => {
    const [pendingEvents, setPendingEvents] = useState([]);

    useEffect(() => {
        fetchPendingEvents();
    }, []);

    const fetchPendingEvents = async () => {
        try {
            const response = await axios.get("http://localhost:4000/api/v1/corporate-events");
            setPendingEvents(response.data.filter(event => event.status === 'pending'));
        } catch (error) {
            console.error('Error fetching pending events:', error);
        }
    };

    const handleApprove = async (eventId) => {
        try {
            await axios.put(`http://localhost:4000/api/v1/corporate-events/${eventId}/approve`);
            fetchPendingEvents(); // Refresh the list after approval
        } catch (error) {
            console.error('Error approving event:', error);
        }
    };

    const handleDecline = async (eventId) => {
        try {
            await axios.put(`http://localhost:4000/api/v1/corporate-events/${eventId}/decline`);
            fetchPendingEvents(); // Refresh the list after decline
        } catch (error) {
            console.error('Error declining event:', error);
        }
    };

    return (
        <div className="approval-page" id="approval-page">
            <div className="background-image33"></div>
            <nav className="navbar" id="admin-navbar">
                <img src="/logo.png" alt="Logo" id="admin-logo" />
                <div className="nav-links" id="admin-nav-links">
                    <ul>
                        <li><a href="/" id="admin-home-link">Home</a></li>
                        <li><a href="/login/admin" id="admin-login-link">Admin Login</a></li>
                        <li><a href="/contact" id="admin-contact-link">Contact Us</a></li>
                    </ul>
                </div>
            </nav>
            <h1 className="approval-title" id="approval-title">Event Approval</h1>
            {pendingEvents.length === 0 ? (
                <p className="no-events-message" id="no-events-message">No events to approve.</p>
            ) : (
                pendingEvents.map((event) => (
                    <div key={event._id} className="event-card" id={`event-card-${event._id}`}>
                        <h3 className="event-name" id={`event-name-${event._id}`}>{event.eventName}</h3>
                        <p className="event-description" id={`event-description-${event._id}`}>
                            Description: {event.eventDescription}
                        </p>
                        <p className="event-city" id={`event-city-${event._id}`}>
                            City: {event.city}
                        </p>
                        <p className="event-hall" id={`event-hall-${event._id}`}>
                            Hall: {event.hall}
                        </p>
                        <p className="event-attendees" id={`event-attendees-${event._id}`}>
                            Attendees: {event.attendees}
                        </p>
                        <p className="event-date" id={`event-date-${event._id}`}>
                            Date: {new Date(event.date).toLocaleDateString()}
                        </p>
                        <p className="event-time" id={`event-time-${event._id}`}>
                            Time: {new Date(`1970-01-01T${event.time}`).toLocaleTimeString([], { hour: '2-digit', minute:'2-digit' })}
                        </p>

                        <button 
                            onClick={() => handleApprove(event._id)} 
                            className="approve-button" 
                            id={`approve-button-${event._id}`}
                        >
                            Approve
                        </button>
                        <button 
                            onClick={() => handleDecline(event._id)} 
                            className="decline-button" 
                            id={`decline-button-${event._id}`}
                        >
                            Decline
                        </button>
                    </div>
                ))
            )}
        </div>
    );
};

export default ApproveEvents;