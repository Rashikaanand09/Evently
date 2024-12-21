import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import Landing from './components/landing';
import LandingPage from './components/landingPage';
import UserLogin from "./components/userlogin"; 
import AdminLogin from "./components/adminlogin"; 
import CreateEvent from "./components/createEvent";
import UserSignup from "./components/userSignup"; 
import AdminSignup from "./components/adminSignup"; 
import Home from "./components/home"; 
import About from "./components/about"; 
import Contact from "./components/contact"; 
import Events from "./components/events"; 
import EventDetails from "./components/eventDetails"; 
import TicketPage from "./components/ticketPage"; 
import CorporateEvents from './components/Corporateevents'; 
import KidBirthdayParties from './components/kittyBirthday'; 
import ApproveEvents from './components/handleApprove'; 
import AdminEventManagement from './components/AdminEventManagement';
import EditEvent from './components/EditEvent';

const App = () => {
    const [events, setEvents] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    const handleEventCreated = (newEvent) => {
        setEvents((prevEvents) => [...prevEvents, newEvent]);
    };

    const handleLogin = (adminStatus) => {
        setIsLoggedIn(true);
        setIsAdmin(adminStatus);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        setIsAdmin(false);
    };

    const updateEventInState = (updatedEvent) => {
        setEvents((prevEvents) =>
            prevEvents.map(event =>
                event._id === updatedEvent._id ? updatedEvent : event
            )
        );
    };

    return (
        <Router>
            <Toaster />
            <Routes>
                <Route path="/" element={<Home isLoggedIn={isLoggedIn} isAdmin={isAdmin} onLogout={handleLogout} />} />
                <Route path="/landing" element={<Landing />} />
                <Route path="/signup/user" element={<UserSignup />} />
                <Route path="/signup/admin" element={<AdminSignup />} />
                <Route path="/login/user" element={<UserLogin onLogin={() => handleLogin(false)} />} />
                <Route path="/login/admin" element={<AdminLogin onLogin={() => handleLogin(true)} />} />
                <Route path="/create-event" element={<CreateEvent onEventCreated={handleEventCreated} />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/events" element={<Events events={events} />} />
                <Route path="/events/details/:id" element={<EventDetails />} />
                <Route path="/events/tickets" element={<TicketPage />} />
                <Route path="/events/corporate" element={<CorporateEvents />} />
                <Route path="/events/kitty-birthday" element={<KidBirthdayParties />} />
                <Route path="/approve-events" element={<ApproveEvents submittedEvents={events} />} /> 
                <Route path="/landingg" element={<LandingPage />} />
                
                {/* Pass updateEventInState to AdminEventManagement */}
                <Route 
                    path="/admin-event-management" 
                    element={
                        <AdminEventManagement 
                            events={events} 
                            updateEventInState={updateEventInState} 
                        />
                    } 
                />

                {/* Pass updateEventInState to EditEvent */}
                <Route 
                    path="/edit-event/:id" 
                    element={
                        <EditEvent updateEventInState={updateEventInState} />
                    } 
                />
            </Routes>
        </Router>
    );
};

export default App;
