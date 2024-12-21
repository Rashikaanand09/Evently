import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import "./userlogin.css"; // Use userlogin.css for consistent styling

const AdminLogin = ({ onLogin }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [secretKey, setSecretKey] = useState(""); // State for secret key
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:4000/api/v1/auth/admins/login", {
                username,
                password,
                secretKey, // Include the secret key in the request
            });

            toast.success("Admin login successful!");
            console.log(response.data);

            onLogin(true); // Set admin status in parent component.
            navigate("/"); // Redirect to home page
        } catch (error) {
            console.error("Error occurred:", error);
            if (error.response && error.response.data.message) {
                toast.error(error.response.data.message || "Invalid credentials");
            } else {
                toast.error("An unexpected error occurred. Please try again.");
            }
        }
    };

    return (
        <div className="contact-container">
            <div className="background-image"></div>
            <nav id="admin-navbar">
                {/* Optional: Add logo if needed */}
                <img src="/logo.png" alt="Logo" id="user-logo" />
                <div id="admin-nav-links">
                    <ul>
                        <li><a href="/" id="user-home-link">Home</a></li>
                        <li><a href="/login/admin" className="active" id="admin-login-link">Admin Login</a></li>
                        <li><a href="/contact" id="user-contact-link">Contact Us</a></li>
                    </ul>
                </div>
            </nav>
            <form onSubmit={handleLogin} id="user-login-form">
                <h1 id="user-login-header">Admin Login</h1>
                <p id="user-login-description">
                    To login into your admin account please enter your credentials.
                </p>
                <input 
                    type="text" 
                    placeholder="Username" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                    required 
                    className="user-login-input" 
                    id="admin-username-input"
                />
                <input 
                    type="password" 
                    placeholder="Password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                    className="user-login-input" 
                    id="admin-password-input"
                />
                <input 
                    type="text" // Input for secret key
                    placeholder="Secret Key"
                    value={secretKey}
                    onChange={(e) => setSecretKey(e.target.value)}
                    required
                    className="user-login-input" // Class for styling
                    id="admin-secret-key-input" // ID for differentiation
                />
                <button type="submit" className="user-login-button" id="admin-login-button">Log In</button>
                <p className="signup-prompt" id="signup-prompt">
                    Don't have an account? <a href="/signup/admin">Sign up</a>
                </p>
            </form>
        </div>
    );
};

export default AdminLogin;
