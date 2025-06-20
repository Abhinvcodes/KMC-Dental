// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import { userAPI } from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // DEV ONLY: Authentication bypass
    useEffect(() => {
        // Check if we're in development mode
        if (import.meta.env.DEV) {
            // You can change these defaults directly in the code
            const devMode = true; // Set to false to disable bypass
            const isAdmin = true;  // Admin access
            const isDentist = true; // Dentist access

            if (devMode) {
                console.log('⚠️ DEV MODE: Authentication automatically bypassed');
                console.log(`🔑 Roles: Admin=${isAdmin}, Dentist=${isDentist}`);

                // Create a fake user with the configured roles
                const devUser = {
                    id: 'dev-user-id',
                    name: 'Development User',
                    email: 'dev@example.com',
                    isAdmin: isAdmin,
                    isDentist: isDentist,
                };

                // Add these lines to mock complete authentication
                localStorage.setItem('token', 'fake-dev-token');
                localStorage.setItem('user', JSON.stringify(devUser));

                setUser(devUser);
                setIsAuthenticated(true);
                setLoading(false);
                return;
            }
        }

        // Regular authentication check
        const checkLoginStatus = async () => {
            const token = localStorage.getItem('token');
            const storedUser = localStorage.getItem('user');

            if (token && storedUser) {
                setUser(JSON.parse(storedUser));
                setIsAuthenticated(true);
            }

            setLoading(false);
        };

        checkLoginStatus();
    }, []);

    // Login function
    const login = async (email, password) => {
        try {
            const userData = await userAPI.login(email, password);
            setUser(userData);
            setIsAuthenticated(true);
            return userData;
        } catch (error) {
            throw error;
        }
    };

    // Register function
    const register = async (userData) => {
        try {
            const newUser = await userAPI.register(userData);
            setUser(newUser);
            setIsAuthenticated(true);
            return newUser;
        } catch (error) {
            throw error;
        }
    };

    // Logout function
    const logout = () => {
        userAPI.logout();
        setUser(null);
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{
            isAuthenticated,
            user,
            loading,
            login,
            register,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    );
};