import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './home.css';
import { FaChevronDown } from 'react-icons/fa';

const Home = ({ isLoggedIn, onLogout, isAdmin }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const navigate = useNavigate();

    const images = [
        '/1.png',          // Replace with your actual image paths
        '/2.png',
        '/3.png'
    ];

    const handleLogout = () => {
        localStorage.removeItem('token');
        onLogout();
        navigate('/');
    };

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    // Function to handle dot click
    const handleDotClick = (index) => {
        setCurrentImageIndex(index);
    };

    return (
        <div className="home-container">
            {/* Background Image Section */}
            <section className="background-image1" style={{ backgroundImage: `url(${images[currentImageIndex]})` }}>
                <div className="overlay"></div> {/* Optional overlay for better text visibility */}
                <nav className="navbar-home">
                    <div className="home-nav-links">
                        <ul>
                            <li><a href="#home-about">About</a></li>
                            <li>|</li>
                            <li><Link to="/contact">Contact</Link></li>
                            <li>|</li>
                            {isLoggedIn && !isAdmin && (
                                <li>
                                    <button onClick={toggleDropdown} className="home-dropdown-toggle">
                                        Book Events <FaChevronDown />
                                    </button>
                                    {dropdownOpen && (
                                        <div className="home-dropdown-menu">
                                            <Link to="/events/kitty-birthday" className="home-dropdown-item">Kitty/Birthday Parties</Link>
                                            <Link to="/events/corporate" className="home-dropdown-item">Corporate Events</Link>
                                        </div>
                                    )}
                                </li>
                            )}
                            {isLoggedIn ? (
                                <>
                                    {!isAdmin && (
                                        <li><Link to="/events" className="home-nav-link">Upcoming Events</Link></li>
                                    )}
                                    {isAdmin && (
                                        <>
                                            <li><Link to="/create-event" className="home-nav-link">Create Event</Link></li> 
                                            <li>|</li>
                                            <li><Link to="/approve-events" className="home-nav-link">Approve Events</Link></li> 
                                            <li>|</li>
                                            <li><Link to="/admin-event-management" className="home-nav-link">Created Events</Link></li> 
                                        </>
                                    )}
                                    <li>|</li>
                                    <li><button onClick={handleLogout} className="home-signout-button">Sign Out</button></li>
                                </>
                            ) : (
                                <>
                                    <li><Link to="/landingg" className="home-signin-link">Sign In</Link></li>
                                    <li>|</li>
                                    <li><Link to="/landing" className="get-started-button home-get-started-button">Get Started</Link></li>
                                </>
                            )}
                        </ul>
                    </div>
                </nav>

                {/* Dots Navigation */}
                <section className="dots-container">
                    {images.map((_, index) => (
                        <div 
                            key={index} 
                            className={`dot ${currentImageIndex === index ? 'active' : ''}`} 
                            onClick={() => handleDotClick(index)}
                        />
                    ))}
                </section>
            </section>

            {/* Main content area */}
            <section id="home-about" className="about-section">
            <h2 id='ab'>About Us</h2>
            <div className="about-content">
        <img src="/corporate1.jpg" alt="About Us" className="about-image" /> {/* Replace with your actual image path */}
        <div className="about-text">
            We are dedicated to making your events memorable. Our team specializes in organizing various types of events to suit your needs.With years of experience in event management, we understand the importance of creating unique and personalized experiences for our clients. Whether it's a birthday party, corporate event, or wedding, we take care of every detail to ensure that your event is a success.Our services include venue selection, catering, decoration, entertainment, and logistics management. We work closely with our clients to understand their vision and bring it to life.At our core, we believe that every event should reflect the personality and style of our clients. Our dedicated team is committed to providing exceptional service and support throughout the planning process.
            <p>Let us help you create unforgettable memories that will last a lifetime!</p>
        </div>
    </div>
            </section>

            <section id="recent-events" className="recent-events-section">
                <h2 id='our'>Our Pictures from Recent Events</h2>
                <div className="recent-events-images">
        <img src="/bg1.jpg" alt="Event 1" />
        <img src="/bg2.jpg" alt="Event 2" />
        <img src="/bg3.jpg" alt="Event 3" />
        <img src="/bg4.jpg" alt="Event 4" />
        <img src="/bg5.jpg" alt="Event 5" />
        <img src="/bg6.jpg" alt="Event 5" />
    </div>
            </section>

            <section id="extra-info" className="extra-info-section">
            <h2 id='our'>Extra Info</h2>
            <div class="content">
            <h2>Need a help?</h2>
            <p>We are available for hire</p>
            <button>Schedule a free consultation</button>
        </div>
        <div class="social-links">
            <h3>SOCIAL</h3>
            <ul>
                <li><a href="#">Instagram</a></li>
                <li><a href="#">Dribbble</a></li>
                <li><a href="#">Behance</a></li>
                <li><a href="#">Twitter</a></li>
            </ul>
        </div>
        <div class="case-studies">
            <h3>CASE STUDIES</h3>
            <ul>
                <li><a href="#">Amachete</a></li>
                <li><a href="#">Bancum</a></li>
                <li><a href="#">Sabotage</a></li>
                <li><a href="#">Atana</a></li>
            </ul>
        </div>
        <div class="contact">
            <h3>CONTACT</h3>
            <ul>
                <li><a href="tel:+420 608 780 270">+420 608 780 270</a></li>
                <li><a href="mailto:contact@materio.co">contact@materio.co</a></li>
            </ul>
            <h3>OFFICE</h3>
            <ul>
                <li>Bessemerova 155/00</li>
                <li>Prague</li>
                <li>Czech Republic</li>
            </ul>
        </div>
        
            </section>
            
        </div>
        
    );
};

export default Home;
