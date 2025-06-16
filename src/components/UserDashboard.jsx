import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import ChatPage from './ChatPage';
import './UserDashboard.css';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5173';

const UserDashboard = () => {
    const navigate = useNavigate();
    const { user, logout } = useContext(AuthContext);

    const [consultations, setConsultations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [activeTab, setActiveTab] = useState('profile');
    const [userProfile, setUserProfile] = useState(null);
    const [chatOpen, setChatOpen] = useState(false);
    const [chatDentistId, setChatDentistId] = useState(null);

    const openChat = (dentistId) => {
        setChatDentistId(dentistId);
        setChatOpen(true);
    }

    const closeChat = () => {
        setChatOpen(false);
        setChatDentistId(null);
    }

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                setLoading(true);
                const token = localStorage.getItem('token');

                // Add bypass for development
                if (import.meta.env.DEV && localStorage.getItem('bypassAuth') === 'true') {
                    console.log('DEV MODE: UserDashboard auth check bypassed');
                    setLoading(false);
                    return;
                }

                if (!token) {
                    navigate('/login');
                    return;
                }

                // Fetch user profile
                const profileResponse = await axios.get(`${API_URL}/api/users/profile`, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                setUserProfile(profileResponse.data);

                // Fetch user consultations
                const consultationsResponse = await axios.get(`${API_URL}/api/consultations`, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                setConsultations(consultationsResponse.data);
                setError('');
            } catch (err) {
                console.error('Error fetching user data:', err);
                setError(err.response?.data?.message || 'Failed to load user data');
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [navigate]);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getStatusBadgeClass = (status) => {
        switch (status) {
            case 'pending': return 'badge-warning';
            case 'reviewed': return 'badge-success';
            case 'completed': return 'badge-success';
            case 'rejected': return 'badge-danger';
            default: return 'badge-secondary';
        }
    };

    // Function to get proper image URL
    const getImageUrl = (imagePath) => {
        // If it's already a full URL (e.g., from S3 or Cloudinary)
        if (imagePath.startsWith('http')) {
            return imagePath;
        }
        // Otherwise append to API URL
        return `${API_URL}/${imagePath}`;
    };

    return (
        <div className="dashboard-container">
            <div className="dashboard-header">
                <h1>My Dashboard</h1>
                <div className="dashboard-actions">
                    <button onClick={() => navigate('/')} className="home-btn">
                        Go to Home
                    </button>
                    <button onClick={() => navigate('/DentistConsultationPage')} className="new-consultation-btn">
                        New Consultation
                    </button>
                    <button onClick={handleLogout} className="logout-btn">
                        Logout
                    </button>
                </div>
            </div>

            <div className="dashboard-tabs">
                <button
                    className={`tab-btn ${activeTab === 'profile' ? 'active' : ''}`}
                    onClick={() => setActiveTab('profile')}
                >
                    My Profile
                </button>
                <button
                    className={`tab-btn ${activeTab === 'consultations' ? 'active' : ''}`}
                    onClick={() => setActiveTab('consultations')}
                >
                    My Consultations ({consultations.length})
                </button>
            </div>

            <div className="dashboard-content">
                {activeTab === 'profile' && (
                    <div className="profile-section">
                        <h2>Account Holder Information</h2>
                        {loading ? (
                            <p>Loading profile information...</p>
                        ) : error ? (
                            <p className="error-message">{error}</p>
                        ) : (
                            <div className="profile-details">
                                <div className="profile-row">
                                    <span className="profile-label">Name:</span>
                                    <span className="profile-value">{userProfile?.name}</span>
                                </div>
                                <div className="profile-row">
                                    <span className="profile-label">Email:</span>
                                    <span className="profile-value">{userProfile?.email}</span>
                                </div>
                                <div className="profile-row">
                                    <span className="profile-label">Phone:</span>
                                    <span className="profile-value">{userProfile?.phoneNumber}</span>
                                </div>
                                <div className="profile-row">
                                    <span className="profile-label">Gender:</span>
                                    <span className="profile-value">{userProfile?.gender}</span>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {activeTab === 'consultations' && (
                    <div className="consultations-section">
                        <h2>My Dental Consultations</h2>
                        {loading ? (
                            <p>Loading your consultations...</p>
                        ) : error ? (
                            <p className="error-message">{error}</p>
                        ) : consultations.length === 0 ? (
                            <div className="no-consultations">
                                <p>You haven't submitted any dental consultations yet.</p>
                                <button onClick={() => navigate('/DentalForm')} className="create-consultation-btn">
                                    Submit Your First Consultation
                                </button>
                            </div>
                        ) : (
                            <div className="consultations-list">
                                {consultations.map((consultation) => (
                                    <div key={consultation.id} className="consultation-card">
                                        <div className="consultation-header">
                                            <h3>Consultation #{consultation.id}</h3>
                                            <span className={`status-badge ${getStatusBadgeClass(consultation.status)}`}>
                                                {consultation.status}
                                            </span>
                                            {consultation.dentistId && (
                                                <button
                                                    onClick={() => openChat(consultation.dentistId)}
                                                    className="chat-btn"
                                                >
                                                    Chat With Dentist
                                                </button>
                                            )}
                                        </div>
                                        <div className="consultation-details">
                                            <p><strong>Submitted:</strong> {formatDate(consultation.createdAt)}</p>
                                            <p><strong>Comments:</strong> {consultation.comments || 'No comments provided'}</p>

                                            {consultation.dentistFeedback && (
                                                <div className="feedback-section">
                                                    <h4>Dentist Feedback:</h4>
                                                    <p>{consultation.dentistFeedback}</p>
                                                </div>
                                            )}

                                            {consultation.images && consultation.images.length > 0 && (
                                                <div className="consultation-images">
                                                    <h4>Your Uploaded Images:</h4>
                                                    <div className="image-gallery">
                                                        {consultation.images.map((img, index) => (
                                                            <img
                                                                key={index}
                                                                src={getImageUrl(img)}
                                                                alt={`Dental image ${index + 1}`}
                                                                className="consultation-image"
                                                            />
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
            {chatOpen && (
                <ChatPage
                    userId={userProfile?.id}
                    dentistId={chatDentistId}
                    userType="user"
                    onClose={closeChat}
                />
            )}
        </div>
    );
};

export default UserDashboard;
