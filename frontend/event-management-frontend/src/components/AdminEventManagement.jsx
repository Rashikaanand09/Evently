// AdminEventManagement.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import "./AdminEventManagement.css"
const AdminEventManagement = () => {
    const [events, setEvents] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            const response = await axios.get("http://localhost:4000/api/v1/events");
            console.log("Fetched Events:", response.data);
            setEvents(response.data);
        } catch (error) {
            console.error('Error fetching events:', error);
            toast.error("Failed to load events.");
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:4000/api/v1/events/${id}`);
            setEvents(events.filter(event => event._id !== id));
            toast.success("Event deleted successfully!");
        } catch (error) {
            console.error('Error deleting event:', error);
            toast.error("Failed to delete event.");
        }
    };

    const handleEdit = (event) => {
        navigate(`/edit-event/${event._id}`); // Navigate to edit page
    };

    return (
        <div>
            <h2 id="manage">Manage Events</h2>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Venue</th>
                        <th>Date & Time</th>
                        <th>Ticket Price</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {events.map(event => (
                        <tr key={event._id}>
                            <td>{event.name}</td>
                            <td>{event.venue}</td>
                            <td>{new Date(event.dateTime).toLocaleString()}</td>
                            <td>{event.ticketPrice}</td>
                            <td>
                                <button id="but" onClick={() => handleEdit(event)}>Edit</button>
                                <button id="but" onClick={() => handleDelete(event._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminEventManagement;