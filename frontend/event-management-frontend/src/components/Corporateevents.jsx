import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import './Corporateevents.css';

const CorporateEvents = () => {
    const [eventDetails, setEventDetails] = useState({
        eventName: '',
        eventDescription: '',
        city: '',
        hall: '',
        attendees: '',
        date: '',
        time: ''
    });
    const [conflictMessage, setConflictMessage] = useState('');
    
    const cities = [
        "New York", "Los Angeles", "Chicago", "Houston", "Phoenix",
        "Philadelphia", "San Antonio", "San Diego", "Dallas", "San Jose"
    ];

    const halls = [
        "Hall A", "Hall B", "Hall C", "Hall D"
    ];

    const handleChange = async (e) => {
        const { name, value } = e.target;
        setEventDetails({
            ...eventDetails,
            [name]: value
        });
        
        if (name === 'date' || name === 'time' || name === 'hall' || name === 'city') {
            const { date, time, hall, city } = {
                ...eventDetails,
                [name]: value // Update only the changed field
            };
            
            if (date && time && hall && city) {
                try {
                    const response = await axios.get(`http://localhost:4000/api/v1/corporate-events/check-conflict`, {
                        params: { date, time, hall, city }
                    }); 
                    setConflictMessage(response.data.message); // Set available message
                } catch (error) {
                    if (error.response && error.response.status === 409) {
                        setConflictMessage(error.response.data.message); // Set conflict message
                    } else {
                        setConflictMessage('Error checking availability.');
                    }
                }
            } else {
                setConflictMessage(''); // Reset message if date/time is not fully selected
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate required fields
        const { eventName, eventDescription, city, hall, attendees, date, time } = eventDetails;
        if (!eventName || !eventDescription || !city || !hall || !attendees || !date || !time) {
            toast.error("Please fill in all fields.");
            return;
        }
        if (conflictMessage && conflictMessage.includes('This slot is already booked')) {
            toast.error(conflictMessage); // Show conflict message as an error toast
            return;
        }

        // Prepare data for submission
        const formData = {
            eventName,
            eventDescription,
            city,
            hall,
            attendees,
            date,
            time
        };

        console.log('Form Data:', formData); // Log the data being sent

        try {
            const response = await axios.post("http://localhost:4000/api/v1/corporate-events/", formData);
            console.log(response.data); 
            toast.success("Event created successfully!");
            resetForm(); // Reset the form after successful submission
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
        setEventDetails({
            eventName: '',
            eventDescription: '',
            city: '',
            hall: '',
            attendees: '',
            date: '',
            time: ''
        });
    };

    return (
        <div className="home-container">
        <div className="background-image">
            {/* <img src="/bg.png" alt="Background" /> */}
        </div>
        <div className="corporate-events-container" id="corporate-events-container">
            
            <nav className="navbar" id="admin-navbar">
            <img src="/logo.png" alt="Logo" id="adminn-logo" />
            <div className="nav-links" id="admin-nav-links">
            <ul>
            <li><a href="/">Home</a></li>
            </ul>
            </div>
            </nav>
            <form onSubmit={handleSubmit} id="admin-signup-form">
                <h1 id=" admin-signup-header">Corporate Event Registration</h1>
                <input
                    type="text"
                    name="eventName"
                    className="admin-signup-input"
                    placeholder="Event Name"
                    value={eventDetails.eventName}
                    onChange={handleChange}
                    required
                />
                <textarea
                    name="eventDescription"
                    className="admin-signup-input"
                    placeholder="Event Description"
                    value={eventDetails.eventDescription}
                    onChange={handleChange}
                    required
                />
                <select
                    name="city"
                    className="admin-signup-input"
                    value={eventDetails.city}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select City</option>
                    {cities.map((city, index) => (
                        <option key={index} value={city}>{city}</option>
                    ))}
                </select>
                <select
                    name="hall"
                    className="admin-signup-input"
                    value={eventDetails.hall}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select Hall</option>
                    {halls.map((hall, index) => (
                        <option key={index} value={hall}>{hall}</option>
                    ))}
                </select>
                <input
                    type="number"
                    name="attendees"
                    className="admin-signup-input"
                    placeholder="Number of Attendees"
                    value={eventDetails.attendees}
                    onChange={handleChange}
                    required
                />
                <input
                    type="date"
                    name="date"
                    className="admin-signup-input"
                    value={eventDetails.date}
                    onChange={handleChange}
                    required
                />
                <input
                    type="time"
                    name="time"
                    className="admin-signup-input"
                    value={eventDetails.time}
                    onChange={handleChange}
                    required
                />
                <button type="submit" id="admin-signup-button">Create Event</button>
                {conflictMessage && <div className="conflict-message">{conflictMessage}</div>}
            </form>
        </div>
        </div>
    );
};

export default CorporateEvents;