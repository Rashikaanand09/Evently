import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import "./userSignup.css"; // Ensure you have styles for the user signup page

const UserSignup = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            return toast.error("Passwords do not match!");
        }

        try {
            const response = await axios.post("http://localhost:4000/api/v1/auth/users/register", {
                username,
                email,
                password,
            });

            toast.success(response.data.message || "Registration successful!");
            navigate("/login/user"); // Redirect to user login after successful signup
        } catch (error) {
            console.error("Error occurred:", error);
            if (error.response) {
                toast.error(error.response.data.message || "Registration failed");
            }
        }
    };

    return (
        <div className="signup-container" id="user-signup-container">
            <div className="background-image"></div>
            <nav className="navbar" id="user-navbar">
                <img src="/logo.png" alt="Logo" id="user-logo" />
                <div className="nav-links" id="user-nav-links">
                    <ul>
                        <li><a href="/" id="user-home-link">Home</a></li>
                        <li><a href="/login/user" id="user-login-link">User Login</a></li>
                        <li><a href="/contact" id="user-contact-link">Contact Us</a></li>
                    </ul>
                </div>
            </nav>
            <form onSubmit={handleSignup} id="user-signup-form">
                <h1 id="user-signup-header">User Signup</h1>
                <p id="user-signup-description">
                    To create an account, please fill in your details below.
                </p>
                {/* Input fields arranged vertically */}
                <input 
                    type="text" 
                    placeholder="Username" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                    required 
                    className="user-signup-input" 
                    id="username-input"
                />
                <input 
                    type="email" 
                    placeholder="Email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                    className="user-signup-input" 
                    id="email-input"
                />
                <input 
                    type="password" 
                    placeholder="Password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                    className="user-signup-input" 
                    id="password-input"
                />
                <input 
                    type="password" 
                    placeholder="Confirm Password" 
                    value={confirmPassword} 
                    onChange={(e) => setConfirmPassword(e.target.value)} 
                    required 
                    className="user-signup-input" 
                    id="confirm-password-input"
                />
                <button type="submit" className="user-signup-button" id="user-signup-button">Register</button>
                <p className="signup-prompt" id="signup-prompt">
                    Already have an account? <a href="/login/user">Log in</a>
                </p>
            </form>
        </div>
    );
};

export default UserSignup;
