import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { FaTooth, FaBars } from "react-icons/fa";
import Button from "@mui/material/Button";
import "./AdminPage.css";

const CreateAppointment = ({
  departments = {},
  consultations = [],
  setConsultations = () => {},
}) => {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useContext(AuthContext);
  const [newAppointment, setNewAppointment] = useState({
    patientName: "",
    department: "",
    doctor: "",
    date: "",
    time: "",
  });
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (window.confirm("Are you sure you want to create this appointment?")) {
      const newId = Date.now();
      setConsultations([
        ...consultations,
        {
          ...newAppointment,
          id: newId,
          status: "Scheduled",
        },
      ]);
      navigate("/consultations");
    }
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
    navigate("/login");
    setIsMenuOpen(false);
  };

  return (
    <div className="admin-page-root">
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
      <div className="admin-bg">
        <div className="admin-overlay" />
        <div className="admin-content-container fade-in">
          <section className="appointment-form">
            <h2 className="section-title slide-in">Create Appointment</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Patient Name"
                value={newAppointment.patientName}
                onChange={(e) =>
                  setNewAppointment({
                    ...newAppointment,
                    patientName: e.target.value,
                  })
                }
                required
              />
              <select
                value={newAppointment.department}
                onChange={(e) =>
                  setNewAppointment({
                    ...newAppointment,
                    department: e.target.value,
                    doctor: "",
                  })
                }
                required
              >
                <option value="">Select Department</option>
                {departments &&
                  Object.keys(departments).map((dept) => (
                    <option key={dept} value={dept}>
                      {dept}
                    </option>
                  ))}
              </select>
              <select
                value={newAppointment.doctor}
                onChange={(e) =>
                  setNewAppointment({
                    ...newAppointment,
                    doctor: e.target.value,
                  })
                }
                required
              >
                <option value="">Select Doctor</option>
                {departments &&
                  departments[newAppointment.department] &&
                  departments[newAppointment.department].map((doc) => (
                    <option key={doc} value={doc}>
                      {doc}
                    </option>
                  ))}
              </select>
              <input
                type="date"
                value={newAppointment.date}
                onChange={(e) =>
                  setNewAppointment({ ...newAppointment, date: e.target.value })
                }
                required
              />
              <input
                type="time"
                value={newAppointment.time}
                onChange={(e) =>
                  setNewAppointment({ ...newAppointment, time: e.target.value })
                }
                required
              />
              <div className="form-actions">
                <button type="submit" className="btn primary cta-button">
                  Create Appointment
                </button>
                <button
                  type="button"
                  className="btn secondary cta-button"
                  onClick={() => navigate("/consultations")}
                >
                  Cancel
                </button>
              </div>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
};

export default CreateAppointment;