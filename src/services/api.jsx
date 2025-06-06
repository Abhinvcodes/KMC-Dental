import axios from 'axios';

//const API_URL = 'http://localhost:5001';
const API_URL = import.meta.env.VITE_API_URL;
export const api = axios.create({
    baseURL: API_URL
})
// Create axios instance with authorization header
const createAuthHeader = () => {
    const token = localStorage.getItem('token');
    return {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token ? `Bearer ${token}` : ''
        }
    };
};

// User API calls
export const userAPI = {
    register: async (userData) => {
        try {
            const response = await axios.post(`${API_URL}/api/users/register`, userData);
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('user', JSON.stringify(response.data));
            }
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: 'Registration failed' };
        }
    },

    login: async (email, password) => {
        try {
            const response = await axios.post(`${API_URL}/api/users/login`, { email, password });
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('user', JSON.stringify(response.data));
            }
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: 'Login failed' };
        }
    },

    getProfile: async () => {
        try {
            const response = await axios.get(`${API_URL}/api/users/profile`, createAuthHeader());
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: 'Failed to get profile' };
        }
    },

    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    }
};

// Consultation API calls
export const consultationAPI = {
    createConsultation: async (formData) => {
        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                }
            };

            const response = await axios.post(`${API_URL}/api/consultations`, formData, config);
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: 'Failed to create consultation' };
        }
    },

    getUserConsultations: async () => {
        try {
            const response = await axios.get(`${API_URL}/api/consultations`, createAuthHeader());
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: 'Failed to get consultations' };
        }
    }
};

// Appointment API calls
export const appointmentAPI = {
    createAppointment: async (appointmentData) => {
        try {
            const response = await axios.post(
                `${API_URL}/api/appointments`,
                appointmentData,
                createAuthHeader()
            );
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: 'Failed to create appointment' };
        }
    },

    getUserAppointments: async () => {
        try {
            const response = await axios.get(`${API_URL}/api/appointments`, createAuthHeader());
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: 'Failed to get appointments' };
        }
    },

    // Add dentist appointment methods
    getDentistAppointments: async () => {
        try {
            const response = await axios.get(
                `${API_URL}/api/appointments/dentist`,
                createAuthHeader()
            );
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: 'Failed to get dentist appointments' };
        }
    },

    updateAppointmentStatus: async (appointmentId, status) => {
        try {
            const response = await axios.put(
                `${API_URL}/appointments/${appointmentId}/status`,
                { status },
                createAuthHeader()
            );
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: 'Failed to update appointment status' };
        }
    },

    processPayment: async (id, paymentDetails) => {
        try {
            const response = await axios.post(
                `${API_URL}/appointments/${id}/payment`,
                { paymentDetails },
                createAuthHeader()
            );
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: 'Payment processing failed' };
        }
    }
};

// Dentist API calls
export const dentistAPI = {
    getDentistPatients: async () => {
        try {
            const response = await axios.get(
                `${API_URL}/api/users/dentist/patients`,
                createAuthHeader()
            );
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: 'Failed to get dentist patients' };
        }
    },

    // Other dentist methods can be added here
    getDentistConsultations: async () => {
        try {
            const response = await axios.get(
                `${API_URL}/api/consultations/dentist`,
                createAuthHeader()
            );
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: 'Failed to get dentist consultations' };
        }
    }
};

// Need to install axios: npm install axios