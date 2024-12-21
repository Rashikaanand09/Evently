import React, { useEffect, useState , useCallback } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import "./ticketPage.css"; // Import your CSS file for styling

const TicketPage = ({ eventId }) => {
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);
    // const [selectedTicketId, setSelectedTicketId] = useState(null);
    const [attendeeName, setAttendeeName] = useState("");

    // useEffect(() => {
    //     fetchTickets();
    // }, [eventId]);

    const fetchTickets =useCallback( async () => {
        try {
            const response = await axios.get(`http://localhost:4000/api/v1/tickets/${eventId}`);
            setTickets(response.data);
        } catch (error) {
            console.error("Error fetching tickets:", error);
            toast.error("Failed to load tickets.");
        } finally {
            setLoading(false);
        }
    }, [eventId]);
    useEffect(() => {
        fetchTickets(); // Call fetchTickets when component mounts
    }, [fetchTickets]); // Include eventId as a dependency


    const handleRegister = async (ticketId) => {
        try {
            const response = await axios.post(`http://localhost:4000/api/v1/tickets/register/${ticketId}`, { attendeeName });
            toast.success("Registration successful!");
            console.log("QR Code URL:", response.data.qrCodeUrl); // You can display this QR code as needed
            // setSelectedTicketId(null); // Reset selected ticket ID
            setAttendeeName(""); // Clear attendee name
            fetchTickets(); // Refresh ticket list
        } catch (error) {
            console.error("Error registering for ticket:", error);
            toast.error("Failed to register for ticket.");
        }
    };

    if (loading) {
        return <p>Loading tickets...</p>;
    }

    return (
        <div className="ticket-page">
            <h1>Available Tickets</h1>
            {tickets.length === 0 ? (
                <p>No tickets available for this event.</p>
            ) : (
                <ul className="ticket-list">
                    {tickets.map((ticket) => (
                        <li key={ticket._id} className="ticket-item">
                            <h3>{ticket.type}</h3>
                            <p>Price: ${ticket.price}</p>
                            <p>Available: {ticket.quantityAvailable}</p>
                            {ticket.waitlistEnabled && <p>Waitlist Enabled</p>}
                            <input 
                                type="text" 
                                placeholder="Your Name" 
                                value={attendeeName} 
                                onChange={(e) => setAttendeeName(e.target.value)} 
                                required 
                            />
                            <button onClick={() => handleRegister(ticket._id)}>Register</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default TicketPage;