import React from 'react';
import { useNavigate } from 'react-router-dom';
import './landing.css'; 

const Landing = () => {
    const navigate = useNavigate();

    const handleSignupAsUser  = () => {
        navigate('/signup/user'); // Navigate to user signup page
    };

    const handleSignupAsAdmin = () => {
        navigate('/signup/admin'); // Navigate to admin signup page
    };

    return (
        <div className="landing-container">
            <div className="background-image2">
                {/* <img src="/bg.png" alt="Background" /> */}
            </div>
            <nav className="navbar-landing">
                
                <img src="/logo.png" alt="Logo" id='land-logo' className="logo-image" />
            </nav>
            
            <img src="randombg.png" alt="" id='bgg'/>
            <p id='para'>Choose your Role:</p>
            <div className="image-options">
            
            <div className="signup-optionn" onClick={handleSignupAsUser }>
                    <img 
                        src="/user.png" 
                        alt="Sign Up as User" 
                        className="signup-image" 
                    />
                    <p id='op'>User Signup</p>
                </div>
                <div className="signup-optionn" onClick={handleSignupAsAdmin}>
                    <img 
                        src="/admin.png" 
                        alt="Sign Up as Admin" 
                        className="signup-image" 
                    />
                    <p id='op'>Admin Signup</p>
                </div>
            </div>
     
            
        </div>
    );
};

export default Landing;