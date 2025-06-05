import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './UserDashboard.css';

const UserDashboard = () => {
    const navigate = useNavigate();
    const { user, logout } = useContext(AuthContext);

    const [consultations, setConsultations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [activeTab, setActiveTab] = useState('profile');
    const [userProfile, setUserProfile] = useState(null);

    useEffect(() => {
        // Simulate API delay and load hardcoded consultations
        setTimeout(() => {
            try {
                const mockConsultations = [
                    {
                        id: 1,
                        status: 'pending',
                        createdAt: '2025-06-01T10:00:00Z',
                        comments: 'Mild toothache in upper molars.',
                        dentistFeedback: '',
                        images: ['uploads/image1.jpg', 'uploads/image2.jpg', 'uploads/image3.jpg'],
                    },
                    {
                        id: 2,
                        status: 'reviewed',
                        createdAt: '2025-05-28T14:30:00Z',
                        comments: 'Swelling near gums.',
                        dentistFeedback: 'Prescribed antibiotics. Please revisit after 5 days.',
                        images: ['uploads/image4.jpg', 'uploads/image5.jpg', 'uploads/image6.jpg'],
                    },
                    {
                        id: 3,
                        status: 'rejected',
                        createdAt: '2025-05-25T09:45:00Z',
                        comments: '',
                        dentistFeedback: 'Images not clear. Please resubmit.',
                        images: ['uploads/image7.jpg', 'uploads/image8.jpg', 'uploads/image9.jpg'],
                    }
                ];
                setConsultations(mockConsultations);
            } catch (err) {
                setError('Failed to load consultations');
            } finally {
                setLoading(false);
            }

            // Hardcoded user profile
            setUserProfile({
                name: 'Jane Doe',
                email: 'jane@example.com',
                phoneNumber: '1111111110',
                gender: 'Female'
            });
        }, 1000);
    }, []);

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
            case 'rejected': return 'badge-danger';
            default: return 'badge-secondary';
        }
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
                        <div className="profile-details">
                            <div className="profile-row">
                                <span className="profile-label">Name:</span>
                                <span className="profile-value">{userProfile?.name || user?.name}</span>
                            </div>
                            <div className="profile-row">
                                <span className="profile-label">Email:</span>
                                <span className="profile-value">{userProfile?.email || user?.email}</span>
                            </div>
                            <div className="profile-row">
                                <span className="profile-label">Phone:</span>
                                <span className="profile-value">{userProfile?.phoneNumber || user?.phoneNumber}</span>
                            </div>
                            <div className="profile-row">
                                <span className="profile-label">Gender:</span>
                                <span className="profile-value">{userProfile?.gender || user?.gender}</span>
                            </div>
                        </div>
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

                                            <div className="consultation-images">
                                                <h4>Your Uploaded Images:</h4>
                                                <div className="image-gallery">
                                                    {consultation.images.map((img, index) => (
                                                        <img
                                                            key={index}
                                                            src={`http://localhost:5000/${img}`}
                                                            alt={`Dental image ${index + 1}`}
                                                            className="consultation-image"
                                                        />
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserDashboard;
