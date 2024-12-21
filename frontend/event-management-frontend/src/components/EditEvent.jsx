import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

const EditEvent = ({  }) => {
  const [name, setName] = useState("");
  const [venue, setVenue] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [ticketPrice, setTicketPrice] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [currentImageUrl, setCurrentImageUrl] = useState(""); 
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/v1/events/${id}`);
        if (!response.data) throw new Error("No data found");
        const eventData = response.data;
        setName(eventData.name);
        setVenue(eventData.venue);
        setDateTime(eventData.dateTime);
        setTicketPrice(eventData.ticketPrice);
        setCurrentImageUrl(eventData.imageUrl); 
      } catch (error) {
        console.error("Error fetching event details:", error);
        toast.error("Failed to load event details.");
      }
    };
    fetchEventDetails();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name); // Use the state value instead of hardcoding
    formData.append("venue", venue);
    formData.append("dateTime", dateTime);
    formData.append("ticketPrice", ticketPrice);
    
    if (imageFile) {
      formData.append("imageUrl", imageFile); 
    }

    try {
      const response = await axios.put(`http://localhost:4000/api/v1/events/${id}`, formData);
      console.log("Update Response:", response.data); // Call to update state in parent component
      toast.success("Event updated successfully!");
    } catch (error) {
      console.error("Error updating event:", error);
      toast.error("Failed to update event.");
    }
  };

  return (
    <div>
      <h2>Edit Event</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Event Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Venue"
          value={venue}
          onChange={(e) => setVenue(e.target.value)}
          required
        />
        <input
          type="datetime-local"
          value={dateTime}
          onChange={(e) => setDateTime(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Ticket Price"
          value={ticketPrice}
          onChange={(e) => setTicketPrice(e.target.value)}
          required
        />

        {currentImageUrl && (
          <div>
            <img
              src={currentImageUrl}
              alt="Current Event"
              style={{ width: "200px", height: "auto" }}
            />
            <p>Current Image</p>
          </div>
        )}

        <input
          type="file"
          onChange={(e) => setImageFile(e.target.files[0])}
          className="create-event-file-input"
        />

        <button type="submit">Update Event</button>
      </form>
    </div>
  );
};

export default EditEvent;
