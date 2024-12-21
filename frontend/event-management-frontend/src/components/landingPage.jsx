import React from 'react';
import {useNavigate } from 'react-router-dom';
import './landingpage.css'; // Ensure you have styles for the landing page

const LandingPage = () => {
    const navigate = useNavigate();
    const handleSignupAsUser  = () => {
        navigate('/login/user'); // Navigate to user signup page
    };
    
    const handleSignupAsAdmin = () => {
        navigate('/login/admin'); // Navigate to admin signup page
    };
    return (
        <div className="landing-page-container">
            <div className="background-image2">
                {/* Background image can be set in CSS */}
            </div>
            <nav className="navbar-landing">
                {/* <img src="/logo.png" alt="Logo" id='land-logo' className="logo-image" /> */}
            </nav>
            
            <p id='choose-login'>Please choose your login type:</p>
            <div className="login-options">
                           
            <div className="signup-option" onClick={handleSignupAsUser }>
                    <img 
                        src="/user.png" 
                        alt="Sign Up as User" 
                        className="signup-image" 
                    />
                    <p id='option'>User Login</p>
                </div>
                <div className="signup-option" onClick={handleSignupAsAdmin}>
                    <img 
                        src="/admin.png" 
                        alt="Sign Up as Admin" 
                        className="signup-image" 
                    />
                    <p id='option'>Admin Login</p>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;