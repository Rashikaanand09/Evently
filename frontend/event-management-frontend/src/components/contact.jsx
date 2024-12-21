import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import "./contact.css";

const Contact = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = { name, email, phone, subject, message };

        try {
            await axios.post("http://localhost:4000/api/v1/contact", formData);
            toast.success("Message sent successfully!");
            resetForm();
            navigate("/");
        } catch (error) {
            console.error('Error occurred:', error);
            if (error.response) {
                toast.error(error.response.data.message || "Failed to send message");
            } else {
                toast.error("Network error: Please check your connection.");
            }
        }
    };

    const resetForm = () => {
        setName("");
        setEmail("");
        setPhone("");
        setSubject("");
        setMessage("");
    };

    return (
        <div className="contact-container" id="admin-contact-container">
            <div className="background-image"></div>
            
            <nav id="adminn-navbar">
                {/* <img src="/logo.png" alt="Logo" id="admin-logo" /> */}
                <div className="nav-links" id="admin-nav-links">
                    <ul>
                        <li><a href="/">Home</a></li>
                        <li><a href="/signin">Sign In</a></li>
                        <li><a href="/getstarted">Get Started</a></li>
                    </ul>
                </div>
            </nav>

            <div className="contact-content">
                <form onSubmit={handleSubmit} id="admin-contact-form">
                    <h1 id="admin-contact-header">Let's Get in Touch</h1>
                    <p id="admin-contact-description">
                        Have a question or need assistance? Let us know how we can help!
                    </p>
                    <input 
                        type="text" 
                        placeholder="Your Name" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                        required 
                        className="admin-contact-input" 
                    />
                    <input 
                        type="email" 
                        placeholder="Your Email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                        className="admin-contact-input" 
                    />
                    <input 
                        type="text" 
                        placeholder="Subject" 
                        value={subject} 
                        onChange={(e) => setSubject(e.target.value)} 
                        required 
                        className="admin-contact-input" 
                    />
                    <textarea 
                        placeholder="Your Message" 
                        value={message} 
                        onChange={(e) => setMessage(e.target.value)} 
                        required 
                        className="admin-contact-textarea" 
                    />
                    <button type="submit" className="admin-contact-button">Send Message</button>
                </form>
            </div>
        </div>
    );
};

export default Contact;
