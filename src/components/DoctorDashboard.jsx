import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { FaTooth, FaBars } from "react-icons/fa";
import axios from "axios";
import { dentistAPI, appointmentAPI } from "../services/api";
import "./DoctorDashboard.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5173";

const DoctorDashboard = () => {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useContext(AuthContext);
  const [doctorInfo, setDoctorInfo] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const fetchDentistData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");

        if (!token) {
          navigate("/login");
          return;
        }

        const doctorResponse = await axios.get(`${API_URL}/api/users/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setDoctorInfo(doctorResponse.data);

        const appointmentsResponse = await appointmentAPI.getDentistAppointments();
        console.log("Appointments data:", appointmentsResponse);
        setAppointments(Array.isArray(appointmentsResponse) ? appointmentsResponse : []);

        const patientsResponse = await dentistAPI.getDentistPatients();
        setPatients(Array.isArray(patientsResponse) ? patientsResponse : []);

        setError(null);
      } catch (err) {
        console.error("Error fetching dentist data:", err);
        setError("Failed to load dentist dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchDentistData();
  }, [navigate]);

  const handleStartChat = (patientId, patientName) => {
    navigate(`/chat/${patientId}`, {
      state: {
        patientName,
        doctorName: doctorInfo?.name || "Doctor",
      },
    });
  };

  const viewPatientHistory = (patientId) => {
    navigate(`/patient-history/${patientId}`);
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
    localStorage.removeItem("token");
    navigate("/login");
    setIsMenuOpen(false);
  };

  return (
    <div className="doctor-dashboard-root">
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
      <div className="doctor-dashboard-bg">
        <div className="doctor-dashboard-overlay" />
        <div className="doctor-dashboard-content-container fade-in">
          {loading ? (
            <div className="loading-spinner">Loading dashboard...</div>
          ) : error ? (
            <div className="error-message">{error}</div>
          ) : !doctorInfo ? (
            <div className="error-message">Unable to load doctor information</div>
          ) : (
            <>
              {/* Doctor Profile Section */}
              <div className="doctor-profile">
                <h2 className="section-title slide-in">Welcome, Dr. {doctorInfo.name}</h2>
                <div className="doctor-details">
                  <p>
                    <strong>Specialization:</strong>{" "}
                    {doctorInfo.specialization || "General Dentistry"}
                  </p>
                  <p>
                    <strong>Email:</strong> {doctorInfo.email || "N/A"}
                  </p>
                  <p>
                    <strong>Phone:</strong> {doctorInfo.phoneNumber || "N/A"}
                  </p>
                </div>
                <button className="logout-btn cta-button" onClick={handleLogout}>
                  Logout
                </button>
              </div>

              {/* Appointments Section */}
              <div className="appointments-section">
                <h3 className="section-title slide-in">Your Appointments</h3>
                {Array.isArray(appointments) && appointments.length > 0 ? (
                  <div className="appointments-list">
                    {appointments.map((appointment) => (
                      <div key={appointment.id} className="appointment-card">
                        <div className="patient-info">
                          <h4>{appointment.User?.name || "Patient"}</h4>
                          <p>
                            <strong>Email:</strong> {appointment.User?.email || "N/A"}
                          </p>
                          <p>
                            <strong>Phone:</strong>{" "}
                            {appointment.User?.phoneNumber || "N/A"}
                          </p>
                          <p>
                            <strong>Reason:</strong> {appointment.reason || "N/A"}
                          </p>
                        </div>
                        <div className="appointment-time">
                          <p>
                            <strong>Scheduled:</strong>
                          </p>
                          <p>
                            {new Date(appointment.appointmentDate).toLocaleDateString()}{" "}
                            at{" "}
                            {new Date(appointment.appointmentDate).toLocaleTimeString(
                              [],
                              { hour: "2-digit", minute: "2-digit" }
                            )}
                          </p>
                          <p>
                            <strong>Status:</strong>{" "}
                            <span className={`status-${appointment.status.toLowerCase()}`}>
                              {appointment.status}
                            </span>
                          </p>
                        </div>
                        <div className="appointment-actions">
                          <button
                            className="chat-button cta-button"
                            onClick={() =>
                              handleStartChat(
                                appointment.userId,
                                appointment.User?.name || "Patient"
                              )
                            }
                          >
                            Chat with Patient
                          </button>
                          <button
                            className="update-status cta-button"
                            onClick={async () => {
                              try {
                                const token = localStorage.getItem("token");
                                await axios.put(
                                  `${API_URL}/api/appointments/${appointment.id}`,
                                  { status: "completed" },
                                  { headers: { Authorization: `Bearer ${token}` } }
                                );
                                const response = await axios.get(
                                  `${API_URL}/api/appointments/dentist`,
                                  { headers: { Authorization: `Bearer ${token}` } }
                                );
                                setAppointments(
                                  Array.isArray(response.data) ? response.data : []
                                );
                              } catch (err) {
                                console.error("Error updating appointment:", err);
                                alert("Failed to update appointment status");
                              }
                            }}
                          >
                            Mark as Completed
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="no-appointments">You have no appointments scheduled.</p>
                )}
              </div>

              {/* Patients Section */}
              <div className="patients-section">
                <h2 className="section-title slide-in">My Patients</h2>
                {patients.length === 0 ? (
                  <p className="no-patients">You have no patients assigned yet.</p>
                ) : (
                  <div className="patients-list">
                    {patients.map((patient) => (
                      <div key={patient.id} className="patient-card">
                        <h3>{patient.name || "Unknown Patient"}</h3>
                        <p>
                          <strong>Email:</strong> {patient.email || "N/A"}
                        </p>
                        <p>
                          <strong>Phone:</strong> {patient.phoneNumber || "N/A"}
                        </p>
                        <p>
                          <strong>Gender:</strong> {patient.gender || "N/A"}
                        </p>
                        <button
                          className="view-history-btn cta-button"
                          onClick={() => viewPatientHistory(patient.id)}
                        >
                          View History
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;