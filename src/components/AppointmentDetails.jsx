import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { FaTooth, FaBars } from "react-icons/fa";
import axios from "axios";
import "./AppointmentDetails.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const getStatusClass = (status) => {
  switch (status.toLowerCase()) {
    case "confirmed":
    case "scheduled":
      return "status-confirmed";
    case "pending":
      return "status-pending";
    case "cancelled":
      return "status-cancelled";
    default:
      return "status-default";
  }
};

const AppointmentDetails = () => {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useContext(AuthContext);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");

        if (!token) {
          navigate("/login");
          return;
        }

        const response = await axios.get(`${API_URL}/api/appointments`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setAppointments(Array.isArray(response.data) ? response.data : []);
        setError(null);
      } catch (err) {
        console.error("Error fetching appointments:", err);
        setError("Failed to load appointments. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [navigate]);

  const toggleHamburger = () => {
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
    navigate("/"); // Updated to match other components
    setIsMenuOpen(false);
  };

  return (
    <div className="appointments-root">
      {/* Header */}
      <header className="header">
        <div className="header-container">
          <div className="logo">
            <FaTooth className="logo-icon" /> KMC Dental Care
          </div>
          <button
            className={`hamburger${isMenuOpen ? " open" : ""}`}
            onClick={toggleHamburger}
            aria-label="Toggle navigation"
            aria-expanded={isMenuOpen}
            type="button"
          >
            <FaBars
              className="hamburger-icon"
              style={{
                transition: "transform 0.3s",
                transform: isMenuOpen ? "rotate(180deg)" : "none",
              }}
            />
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
      <div className="appointments-bg">
        <div className="appointments-overlay" />
        <div className="appointments-content-container fade-in">
          <h2 className="appointments-list-header slide-in">My Appointments</h2>
          {loading ? (
            <div className="loading-spinner">Loading appointments...</div>
          ) : error ? (
            <div className="error-message">{error}</div>
          ) : appointments.length === 0 ? (
            <div className="no-appointments">No appointments found.</div>
          ) : (
            <div className="appointments-list">
              {appointments.map((appt) => (
                <div key={appt.id} className="appointment-details-container">
                  <h3 className="appointment-id">Appointment #{appt.id}</h3>
                  <div className="details-row">
                    <div className="details-label">Doctor:</div>
                    <div className="details-value">
                      {appt.Dentist?.name || "Unassigned"}
                    </div>
                  </div>
                  <div className="details-row">
                    <div className="details-label">Date:</div>
                    <div className="details-value">
                      {new Date(appt.appointmentDate).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="details-row">
                    <div className="details-label">Time:</div>
                    <div className="details-value">
                      {new Date(appt.appointmentDate).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  </div>
                  <div className="details-row">
                    <div className="details-label">Reason:</div>
                    <div className="details-value">{appt.reason || "N/A"}</div>
                  </div>
                  <div className="details-row">
                    <div className="details-label">Status:</div>
                    <div className="details-value">
                      <span className={`status ${getStatusClass(appt.status)}`}>
                        {appt.status.charAt(0).toUpperCase() + appt.status.slice(1)}
                      </span>
                    </div>
                  </div>
                  <div className="button-container">
                    {/* Placeholder for future reschedule button */}
                    {/* <button className="action-button cta-button">Reschedule</button> */}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AppointmentDetails;