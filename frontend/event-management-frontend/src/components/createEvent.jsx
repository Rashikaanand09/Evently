import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import './createEvent.css'; // Import the CSS file for styles

const CreateEvent = ({ onEventCreated }) => {
    const [name, setName] = useState("");
    const [venue, setVenue] = useState("");
    const [dateTime, setDateTime] = useState("");
    const [ticketPrice, setTicketPrice] = useState("");
    const [imageFile, setImageFile] = useState(null);
    const navigate = useNavigate(); 

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!imageFile) {
            toast.error("Please select an image file.");
            return;
        }
    
        const formData = new FormData();
        formData.append("name", name);
        formData.append("venue", venue);
        formData.append("dateTime", dateTime);
        formData.append("ticketPrice", ticketPrice);
        formData.append("imageUrl", imageFile);
    
        try {
            const response = await axios.post("http://localhost:4000/api/v1/events", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            toast.success("Event created successfully!");
            resetForm();
            onEventCreated(response.data);
            navigate("/admin-event-management");
        } catch (error) {
            console.error('Error occurred:', error);
            if (error.response) {
                toast.error(error.response.data.message || "Failed to create event");
            } else {
                toast.error("Network error: Please check your connection.");
            }
        }
    };

    const resetForm = () => {
        setName("");
        setVenue("");
        setDateTime("");
        setTicketPrice("");
        setImageFile(null);
    };
    // const handleTicketPriceChange = (e) => {
    //     // Allow only numeric input
    //     const value = e.target.value.replace(/[^0-9]/g, '');
    //     setTicketPrice(value);
    // };
    return (
        <div className="create-event-page">
            <div className="background-image"></div>
            <nav className="navbar-home">
                <img src="/logo.png" alt="Logo" id="create-event-logo" />
                {/* <div className="nav-links" id="create-event-nav-links">
                    <ul>
                        <li><a href="/" id="create-event-home">Home</a></li>
</ul>
                </div> */}
            </nav>
            <form onSubmit={handleSubmit} className="create-event-form" id="create-event-form">
                <input 
                    type="text" 
                    placeholder="Event Name" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    required 
                    className="create-event-input" 
                    id="event-name-input"
                />
                <input 
                    type="text" 
                    placeholder="Venue" 
                    value={venue} 
                    onChange={(e) => setVenue(e.target.value)} 
                    required 
                    className="create-event-input" 
                    id="venue-input"
                />
                <input 
                    type="datetime-local" 
                    value={dateTime} 
                    onChange={(e) => setDateTime(e.target.value)} 
                    required 
                    className="create-event-input" 
                    id="datetime-input"
                />
                <input 
                    type="number" 
                    placeholder="Ticket Price" 
                    value={ticketPrice} 
                    onChange={(e) => setTicketPrice(e.target.value)} 
                    required 
                    className="create-event-input" 
                    id="ticket-price-input"
                />
                <input 
                    type="file" 
                    onChange={(e) => setImageFile(e.target.files[0])} 
                    required 
                    className="create-event-file-input" 
                    id="image-file-input"
                />
                <button type="submit" className="create-event-button" id="create-event-button">Create Event</button>
            </form>
        </div>
    );
};

export default CreateEvent;