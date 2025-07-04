import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./ToothSensitivity.css";
import { AuthContext } from "../context/AuthContext";
import { FaTooth, FaBars } from "react-icons/fa";

const ToothSensitivity = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useContext(AuthContext);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleBookConsultationClick = () => {
    if (isAuthenticated) {
      navigate("/DentalForm");
    } else {
      navigate("/Login");
    }
    setIsMenuOpen(false);
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
    <div className="tooth-sensitivity-root">
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
      <div className="tooth-sensitivity-bg">
        <div className="tooth-sensitivity-overlay" />
        <div className="tooth-sensitivity-content-container">
          <div className="tooth-sensitivity-card fade-in">
            <h1 className="tooth-sensitivity-title">Tooth Sensitivity</h1>
            <p className="tooth-sensitivity-description">
              Tooth sensitivity, or dentin hypersensitivity, causes sharp, temporary pain from hot, cold, sweet, or acidic stimuli due to exposed dentin. It can affect daily life and may signal underlying dental issues.
            </p>
            {/* Uncomment to include an image */}
            {/* <img
              src="sensitivity.jpg"
              alt="Tooth Sensitivity"
              className="sensitivity-image"
            /> */}
            <div className="tooth-sensitivity-section slide-in">
              <h2 className="tooth-sensitivity-section-title">Common Causes</h2>
              <p>
                Tooth sensitivity is commonly caused by:
              </p>
              <ul>
                <li>Enamel erosion from aggressive brushing or acidic foods</li>
                <li>Receding gums exposing tooth roots</li>
                <li>Tooth decay or cracked teeth</li>
                <li>Worn fillings or recent dental procedures</li>
                <li>Teeth grinding (bruxism)</li>
              </ul>
            </div>
            <div className="tooth-sensitivity-section slide-in">
              <h2 className="tooth-sensitivity-section-title">Prevention and Treatment</h2>
              <p>
                To prevent and treat tooth sensitivity:
              </p>
              <ul>
                <li><strong>Soft Brushing:</strong> Use a soft-bristled toothbrush and gentle technique.</li>
                <li><strong>Sensitive Toothpaste:</strong> Choose products designed to block nerve pathways.</li>
                <li><strong>Limit Acidic Foods:</strong> Reduce consumption of acidic foods and drinks.</li>
                <li><strong>Mouthguard:</strong> Wear one to prevent grinding.</li>
                <li><strong>Professional Treatments:</strong> Fluoride gel, bonding, or gum grafts for severe cases.</li>
              </ul>
              <p>
                Consult a dentist if sensitivity persists for tailored treatment options.
              </p>
            </div>
            <button className="cta-button" onClick={handleBookConsultationClick}>
              Book a Consultation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToothSensitivity;