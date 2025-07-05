import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./RootCanal.css";
import { AuthContext } from "../context/AuthContext";
import { FaTooth, FaBars } from "react-icons/fa";

const RootCanal = () => {
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
    <div className="root-canal-root">
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
      <div className="root-canal-bg">
        <div className="root-canal-overlay" />
        <div className="root-canal-content-container">
          <div className="root-canal-card fade-in">
            <h1 className="root-canal-title">Root Canal</h1>
            <p className="root-canal-description">
              A root canal is a dental procedure to treat infection or damage in the tooth's pulp, which contains nerves and blood vessels. It involves removing the infected pulp, cleaning the canals, and sealing the tooth to prevent further issues.
            </p>
            {/* Uncomment to include an image */}
            {/* <img
              src="rootcanal.jpg"
              alt="Root Canal"
              className="root-canal-image"
            /> */}
            <div className="root-canal-section slide-in">
              <h2 className="root-canal-section-title">Common Causes</h2>
              <p>
                Root canals are commonly needed due to:
              </p>
              <ul>
                <li>Deep cavities</li>
                <li>Cracked or chipped teeth</li>
                <li>Trauma to the tooth</li>
                <li>Repeated dental procedures on the same tooth</li>
              </ul>
            </div>
            <div className="root-canal-section slide-in">
              <h2 className="root-canal-section-title">Procedure and Aftercare</h2>
              <p>
                The procedure involves:
              </p>
              <ul>
                <li><strong>Pulp Removal:</strong> Extracting the infected or inflamed pulp.</li>
                <li><strong>Cleaning:</strong> Disinfecting and shaping the root canals.</li>
                <li><strong>Sealing:</strong> Filling with biocompatible material and sealing with a filling or crown.</li>
              </ul>
              <p>
                Aftercare includes managing discomfort with pain relievers, maintaining good oral hygiene, and regular dental check-ups to ensure the treated tooth remains healthy.
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

export default RootCanal;