import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./Malocclusion.css";
import { AuthContext } from "../context/AuthContext";
import { FaTooth, FaBars } from "react-icons/fa";

const Malocclusion = () => {
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
    <div className="malocclusion-root">
      {/* Header */}
      <header className="header">
        <div className="header-container">
          <div className="logo">
            <FaTooth className="logo-icon" /> KMC Dental Care
          </div>
          {/* Hamburger */}
          <button
            className={`hamburger${isMenuOpen ? " open" : ""}`}
            aria-label="Toggle navigation"
            aria-expanded={isMenuOpen}
            onClick={toggleMenu}
            type="button"
          >
            <FaBars
                className="hamburger-icon"
                style={{
                transition: "transform 0.3s",
                transform: isMenuOpen ? "rotate(180deg)" : "none" 
                }}
            />
          </button>
          <ul className={`nav-links${isMenuOpen ? " open" : ""}`}>
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
      <div className="malocclusion-bg">
        <div className="malocclusion-overlay" />
        <div className="malocclusion-content-container">
          <div className="malocclusion-card fade-in">
            <h1 className="malocclusion-title">Malocclusion</h1>
            <p className="malocclusion-description">
              Malocclusion refers to misaligned teeth or incorrect jaw alignment, which can cause difficulty chewing, speech issues, and increased risk of tooth decay and gum disease. Types include overbite, underbite, crossbite, and open bite.
            </p>
            {/* Uncomment to include an image */}
            {/* <img
              src="malocclusion.jpg"
              alt="Malocclusion"
              className="malocclusion-image"
            /> */}
            <div className="malocclusion-section slide-in">
              <h2 className="malocclusion-section-title">Common Causes</h2>
              <p>
                Malocclusion is commonly caused by:
              </p>
              <ul>
                <li>Genetic factors, such as jaw or tooth size discrepancies</li>
                <li>Childhood habits like thumb sucking or prolonged pacifier use</li>
                <li>Tongue thrusting</li>
                <li>Premature loss of baby teeth</li>
                <li>Improper dental restorations or jaw injuries</li>
              </ul>
            </div>
            <div className="malocclusion-section slide-in">
              <h2 className="malocclusion-section-title">Treatment and Prevention</h2>
              <p>
                To treat and prevent malocclusion:
              </p>
              <ul>
                <li><strong>Orthodontic Treatment:</strong> Braces or clear aligners to correct alignment.</li>
                <li><strong>Surgery:</strong> Jaw repositioning for severe cases.</li>
                <li><strong>Early Intervention:</strong> Address habits like thumb sucking in childhood.</li>
                <li><strong>Regular Dental Visits:</strong> Monitor dental development.</li>
                <li><strong>Proper Dental Care:</strong> Ensure correct restorations to avoid misalignment.</li>
              </ul>
              <p>
                Early detection and regular dental check-ups can minimize the severity of malocclusion.
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

export default Malocclusion;