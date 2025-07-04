// src/components/NavBar.jsx
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const NavBar = () => {
    const { isAuthenticated, user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () =>  {
        logout();
        navigate('/');
    };

    return (
        <nav className="navbar">
            <div className="logo">HealthCare+</div>
            <ul className="nav-links">
                <li className="nav-item">About Us</li>
                <li className="nav-item">Services</li>
                {isAuthenticated ? (
                    <>
                        <li className="nav-item">Welcome, {user.name}</li>
                        <li className="nav-item" onClick={handleLogout}>Logout</li>
                    </>
                ) : (
                    <li className="nav-item" onClick={() => navigate('/Login')}>Login</li>
                )}
            </ul>
        </nav>
    );
};

export default NavBar;