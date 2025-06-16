// src/components/ProtectedRoute.jsx
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, loading } = useContext(AuthContext);

    // DEV BYPASS: Add this code to bypass auth in development
    if (import.meta.env.DEV && localStorage.getItem('bypassAuth') === 'true') {
        console.log('DEV MODE: Authentication bypassed');
        return children;
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;