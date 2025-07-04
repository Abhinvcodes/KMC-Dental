import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./Ulcers.css";
import { AuthContext } from "../context/AuthContext";
import { FaTooth, FaBars } from "react-icons/fa";

const Ulcers = () => {
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
    <div className="ulcers-root">
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
      <div className="ulcers-bg">
        <div className="ulcers-overlay" />
        <div className="ulcers-content-container">
          <div className="ulcers-card fade-in">
            <h1 className="ulcers-title">Mouth Ulcers</h1>
            <p className="ulcers-description">
              Mouth ulcers, or canker sores, are painful lesions inside the mouth that can make eating or speaking uncomfortable. Typically harmless, they heal within 1-2 weeks but may require attention if persistent.
            </p>
            {/* Uncomment to include an image */}
            {/* <img
              src="ulcers.jpg"
              alt="Mouth Ulcers"
              className="ulcers-image"
            /> */}
            <div className="ulcers-section slide-in">
              <h2 className="ulcers-section-title">Common Causes</h2>
              <p>
                Mouth ulcers are commonly caused by:
              </p>
              <ul>
                <li>Minor injuries from dental work or brushing too hard</li>
                <li>Stress or hormonal changes</li>
                <li>Vitamin deficiencies (e.g., B12 or iron)</li>
                <li>Spicy, acidic, or rough foods</li>
                <li>Underlying health conditions (e.g., autoimmune or gastrointestinal disorders)</li>
              </ul>
            </div>
            <div className="ulcers-section slide-in">
              <h2 className="ulcers-section-title">Treatment and Prevention</h2>
              <p>
                To manage and prevent mouth ulcers:
              </p>
              <ul>
                <li><strong>Pain Relief:</strong> Use over-the-counter topical treatments or saltwater rinses.</li>
                <li><strong>Avoid Irritants:</strong> Limit spicy, acidic, or rough foods.</li>
                <li><strong>Oral Hygiene:</strong> Maintain good dental care practices.</li>
                <li><strong>Stress Management:</strong> Reduce stress to lower ulcer frequency.</li>
                <li><strong>Medical Evaluation:</strong> Consult a dentist for persistent or large ulcers.</li>
              </ul>
              <p>
                Seek professional care if ulcers last over two weeks or are unusually severe.
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

export default Ulcers;