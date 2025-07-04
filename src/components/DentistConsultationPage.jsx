import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { FaTooth, FaBars } from "react-icons/fa";
import "./DentistConsultationPage.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5001";

const DentistConsultationPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useContext(AuthContext);
  const [dentists, setDentists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const fetchDentists = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");

        if (!token) {
          navigate("/login");
          return;
        }

        const response = await axios.get(`${API_URL}/api/users/dentists`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setDentists(response.data);
        setError(null);
      } catch (err) {
        console.error("Error fetching dentists:", err);
        setError("Failed to load dentists. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchDentists();
  }, [navigate]);

  const handleConsultClick = (dentist) => {
    navigate("/PaymentScreen", { state: { dentist } });
  };

  const handleChatClick = (dentistId) => {
    const token = localStorage.getItem("token");

    axios
      .get(`${API_URL}/api/consultations/check/${dentistId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        if (response.data.hasActiveConsultation) {
          navigate("/chat", { state: { dentistId } });
        } else {
          alert("Please complete a consultation payment first.");
        }
      })
      .catch((error) => {
        console.error("Error checking consultation status:", error);
        alert("Please complete a consultation payment first.");
      });
  };

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

  return (
    <div className="dentist-consultation-root">
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
      <div className="dentist-consultation-bg">
        <div className="dentist-consultation-overlay" />
        <div className="dentist-consultation-content-container">
          {loading ? (
            <div className="loading-container fade-in">Loading dentists...</div>
          ) : error ? (
            <div className="error-container fade-in">{error}</div>
          ) : dentists.length === 0 ? (
            <div className="no-data-container fade-in">
              No dentists available at the moment.
            </div>
          ) : (
            <div className="content fade-in">
              <div className="header-section">
                <h1 className="header-title">Meet Our Expert Dentists</h1>
                <p className="header-description slide-in">
                  Consult with our highly qualified dental professionals from the comfort of your home.
                </p>
              </div>
              <div className="dentist-grid">
                {dentists.map((dentist) => (
                  <div className="dentist-card" key={dentist.id}>
                    <h3>Dr. {dentist.name}</h3>
                    <p className="specialization">
                      <strong>{dentist.specialization || "General Dentist"}</strong>
                    </p>
                    <p>{dentist.qualification || "BDS"}</p>
                    <p>Experience: {dentist.experience || "N/A"}</p>
                    <div className="card-buttons">
                      <button
                        onClick={() => handleConsultClick(dentist)}
                        className="consult-button cta-button"
                      >
                        Consult Now
                      </button>
                      <button
                        onClick={() => handleChatClick(dentist.id)}
                        className="chat-button cta-button"
                      >
                        Chat
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DentistConsultationPage;