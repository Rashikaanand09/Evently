import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import "./userlogin.css"; // Ensure you have styles for the user login page

const UserLogin = ({ onLogin }) => {
   const [username, setUsername] = useState("");
   const [password, setPassword] = useState("");
   const navigate = useNavigate();

   const handleLogin = async (e) => {
       e.preventDefault();
       try {
           const response = await axios.post("http://localhost:4000/api/v1/auth/users/login", {
               username,
               password,
           });

           toast.success("User login successful!");
           console.log(response.data); 

           onLogin(false); // Assuming you want to set a non-admin state in parent component.
           navigate("/"); 
       } catch (error) {
           console.error("Error occurred:", error);
           if (error.response && error.response.data.message) {
               toast.error(error.response.data.message || "Invalid credentials");
           }
       }
   };

   return (
       <div className="contact-container">
           <div className="background-image"></div>
           <nav id="user-navbar">
               <img src="/logo.png" alt="Logo" id="user-logo" />
               <div id="user-nav-links">
                   <ul>
                       <li><a href="/" id="user-home-link">Home</a></li>
                       <li><a href="/login/user" className="active" id="user-login-link">User Login</a></li>
                       <li><a href="/contact" id="user-contact-link">Contact Us</a></li>
                   </ul>
               </div>
           </nav>
           <form onSubmit={handleLogin} id="user-login-form">
               <h1 id="user-login-header">User Login</h1>
               <p id="user-login-description">
               To login into your account please enter your credentials.
               </p>
               <input 
                   type="text" 
                   placeholder="Username" 
                   value={username} 
                   onChange={(e) => setUsername(e.target.value)} 
                   required 
                   className="user-login-input" 
                   id="username-input"
               />
               <input 
                   type="password" 
                   placeholder="Password" 
                   value={password} 
                   onChange={(e) => setPassword(e.target.value)} 
                   required 
                   className="user-login-input" 
                   id="password-input"
               />
               <button type="submit" className="user-login-button" id="user-login-button">Log In</button>
               <p className="signup-prompt" id="signup-prompt">
                   Don't have an account? <a href="/signup/user">Sign up</a>
               </p>
           </form>
       </div>
   );
};

export default UserLogin;
