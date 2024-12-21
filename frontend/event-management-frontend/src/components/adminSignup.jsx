import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import "./adminSignup.css"; // Ensure you have styles for the admin signup page

const AdminSignup = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [secretKey, setSecretKey] = useState(""); // State for secret key
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            return toast.error("Passwords do not match!");
        }

        try {
            const response = await axios.post("http://localhost:4000/api/v1/auth/admins/register", {
                username,
                email,
                password,
                secretKey, // Include secret key in the request
            });

            toast.success(response.data.message || "Registration successful!");
            navigate("/login/admin"); // Redirect to admin login after successful signup
        } catch (error) {
            console.error("Error occurred:", error);
            if (error.response) {
                toast.error(error.response.data.message || "Registration failed");
            }
        }
    };

    return (
        <div className="signup-container" id="admin-signup-container">
            <div className="background-image"></div>
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
            <form onSubmit={handleSignup} id="admin-signup-form">
                <h1 id="admin-signup-header">Admin Signup</h1>
                <input 
                    type="text" 
                    placeholder="Username" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                    required 
                    className="adminn-signup-input" 
                    id="username-input"
                />
                <input 
                    type="email" 
                    placeholder="Email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                    className="adminn-signup-input" 
                    id="email-input"
                />
                <input 
                    type="password" 
                    placeholder="Password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                    className="adminn-signup-input" 
                    id="password-input"
                />
                <input 
                    type="password" 
                    placeholder="Confirm Password" 
                    value={confirmPassword} 
                    onChange={(e) => setConfirmPassword(e.target.value)} 
                    required 
                    className="adminn-signup-input" 
                    id="confirm-password-input"
                />
                <input 
                    type="text" 
                    placeholder="Secret Key" 
                    value={secretKey} 
                    onChange={(e) => setSecretKey(e.target.value)} 
                    required 
                    className="adminn-signup-input" 
                    id="secret-key-input"
                />
                <button type="submit" className="admin-signup-button" id="adminn-signup-button">Register</button>
                <p className="signup-prompt" id="signup-prompt">
                    Already have an account? <a href="/login/admin">Log in</a>
                </p>
            </form>
        </div>
    );
};

export default AdminSignup;