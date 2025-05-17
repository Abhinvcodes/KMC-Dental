// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import { userAPI } from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Check if user is already logged in on app load
    useEffect(() => {
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