import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import ChatPage from "./ChatPage";
import { FaTooth, FaBars } from "react-icons/fa";
import axios from "axios";
import "./UserDashboard.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5173";

const UserDashboard = () => {
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useContext(AuthContext);
  const [consultations, setConsultations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("profile");
  const [userProfile, setUserProfile] = useState(null);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatDentistId, setChatDentistId] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const openChat = (dentistId) => {
    setChatDentistId(dentistId);
    setChatOpen(true);
  };

  const closeChat = () => {
    setChatOpen(false);
    setChatDentistId(null);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");

        if (import.meta.env.DEV && localStorage.getItem("bypassAuth") === "true") {
          console.log("DEV MODE: UserDashboard auth check bypassed");
          setLoading(false);
          return;
        }

        if (!token) {
          navigate("/login");
          return;
        }

        const profileResponse = await axios.get(`${API_URL}/api/users/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUserProfile(profileResponse.data);

        const consultationsResponse = await axios.get(`${API_URL}/api/consultations`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setConsultations(consultationsResponse.data);
        setError("");
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError(err.response?.data?.message || "Failed to load user data");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const scrollToKeyServices = () => {
    navigate("/");
    setTimeout(() => {
      const keyServicesSection = document.getElementById("key-services");
      if (keyServicesSection) {
        keyServicesSection.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
    setIsMenuOpen(false);
  };

  const scrollToHowCanWeHelp = () => {
    navigate("/");
    setTimeout(() => {
      const helpSection = document.getElementById("how-can-we-help");
      if (helpSection) {
        helpSection.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
    setIsMenuOpen(false);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "pending":
        return "badge-warning";
      case "reviewed":
        return "badge-success";
      case "completed":
        return "badge-success";
      case "rejected":
        return "badge-danger";
      default:
        return "badge-secondary";
    }
  };

  const getImageUrl = (imagePath) => {
    if (imagePath.startsWith("http")) {
      return imagePath;
    }
    return `${API_URL}/${imagePath}`;
  };

  return (
    <div className="dashboard-root">
      {/* Header */}
      <header className="header">
        <div className="header-container">
          <div className="logo">
            <FaTooth className="logo-icon" /> KMC Dental Care
          </div>
          <button className="menu-toggle" onClick={toggleMenu}>
            <FaBars />
          </button>
          <ul className={`nav-links ${isMenuOpen ? "open" : ""}`}>
            <li className="nav-item" onClick={scrollToHowCanWeHelp}>
              About Us
            </li>
            <li className="nav-item" onClick={scrollToKeyServices}>
              Services
            </li>
            {isAuthenticated ? (
              <>
                <li className="nav-item" onClick={() => navigate("/dashboard")}>
                  My Dashboard
                </li>
                <li className="nav-item" onClick={handleLogout}>
                  Logout
                </li>
              </>
            ) : (
              <li className="nav-item" onClick={() => navigate("/Login")}>
                Login
              </li>
            )}
          </ul>
        </div>
      </header>

      {/* Main Content */}
      <div className="dashboard-bg">
        <div className="dashboard-overlay" />
        <div className="dashboard-content-container fade-in">
          <div className="dashboard-header">
            <h1 className="dashboard-title">My Dashboard</h1>
            <div className="dashboard-actions">
              <button
                onClick={() => navigate("/DentistConsultationPage")}
                className="new-consultation-btn cta-button"
              >
                New Consultation
              </button>
            
            </div>
          </div>

          <div className="dashboard-tabs">
            <button
              className={`tab-btn ${activeTab === "profile" ? "active" : ""}`}
              onClick={() => setActiveTab("profile")}
            >
              My Profile
            </button>
            <button
              className={`tab-btn ${activeTab === "consultations" ? "active" : ""}`}
              onClick={() => setActiveTab("consultations")}
            >
              My Consultations ({consultations.length})
            </button>
          </div>

          <div className="dashboard-content">
            {activeTab === "profile" && (
              <div className="profile-section">
                <h2 className="section-title slide-in">Account Holder Information</h2>
                {loading ? (
                  <p className="loading-message">Loading profile information...</p>
                ) : error ? (
                  <p className="error-message">{error}</p>
                ) : (
                  <div className="profile-details">
                    <div className="profile-row">
                      <span className="profile-label">Name:</span>
                      <span className="profile-value">{userProfile?.name || "N/A"}</span>
                    </div>
                    <div className="profile-row">
                      <span className="profile-label">Email:</span>
                      <span className="profile-value">{userProfile?.email || "N/A"}</span>
                    </div>
                    <div className="profile-row">
                      <span className="profile-label">Phone:</span>
                      <span className="profile-value">{userProfile?.phoneNumber || "N/A"}</span>
                    </div>
                    <div className="profile-row">
                      <span className="profile-label">Gender:</span>
                      <span className="profile-value">{userProfile?.gender || "N/A"}</span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === "consultations" && (
              <div className="consultations-section">
                <h2 className="section-title slide-in">My Dental Consultations</h2>
                {loading ? (
                  <p className="loading-message">Loading your consultations...</p>
                ) : error ? (
                  <p className="error-message">{error}</p>
                ) : consultations.length === 0 ? (
                  <div className="no-consultations">
                    <p>You haven't submitted any dental consultations yet.</p>
                    <button
                      onClick={() => navigate("/DentalForm")}
                      className="create-consultation-btn cta-button"
                    >
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
                              className="chat-btn cta-button"
                            >
                              Chat With Dentist
                            </button>
                          )}
                        </div>
                        <div className="consultation-details">
                          <p>
                            <strong>Submitted:</strong> {formatDate(consultation.createdAt)}
                          </p>
                          <p>
                            <strong>Comments:</strong>{" "}
                            {consultation.comments || "No comments provided"}
                          </p>
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
      </div>
    </div>
  );
};

export default UserDashboard;