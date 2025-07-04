import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./Stained.css";
import { AuthContext } from "../context/AuthContext";
import { FaTooth, FaBars } from "react-icons/fa";

const Stained = () => {
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
    <div className="stained-root">
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
      <div className="stained-bg">
        <div className="stained-overlay" />
        <div className="stained-content-container">
          <div className="stained-card fade-in">
            <h1 className="stained-title">Stained Teeth</h1>
            <p className="stained-description">
              Stained teeth, or tooth discoloration, result in yellow, brown, or gray appearances due to extrinsic (surface) or intrinsic (internal) stains. While often cosmetic, stains can indicate dental issues and affect confidence.
            </p>
            {/* Uncomment to include an image */}
            {/* <img
              src="stainedteeth.jpg"
              alt="Stained Teeth"
              className="stained-teeth-image"
            /> */}
            <div className="stained-section slide-in">
              <h2 className="stained-section-title">Common Causes</h2>
              <p>
                Stained teeth are commonly caused by:
              </p>
              <ul>
                <li>Staining foods and beverages (e.g., coffee, tea, red wine)</li>
                <li>Smoking or tobacco use</li>
                <li>Poor oral hygiene</li>
                <li>Certain medications or excessive fluoride exposure</li>
                <li>Aging or trauma to the teeth</li>
              </ul>
            </div>
            <div className="stained-section slide-in">
              <h2 className="stained-section-title">Prevention and Treatment</h2>
              <p>
                To prevent and treat stained teeth:
              </p>
              <ul>
                <li><strong>Limit Staining Substances:</strong> Reduce consumption of coffee, tea, and red wine.</li>
                <li><strong>Quit Smoking:</strong> Avoid tobacco to prevent discoloration.</li>
                <li><strong>Maintain Oral Hygiene:</strong> Brush and floss regularly.</li>
                <li><strong>Professional Treatments:</strong> Opt for whitening, veneers, or bonding.</li>
                <li><strong>Regular Dental Visits:</strong> Get cleanings to remove surface stains.</li>
              </ul>
              <p>
                Consult a dentist to choose the best treatment for your specific staining concerns.
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

export default Stained;