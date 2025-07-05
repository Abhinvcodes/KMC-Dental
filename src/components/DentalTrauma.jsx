import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./DentalTrauma.css";
import { AuthContext } from "../context/AuthContext";
import { FaTooth, FaBars } from "react-icons/fa";

const DentalTrauma = () => {
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
    <div className="dental-trauma-root">
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
      <div className="dental-trauma-bg">
        <div className="dental-trauma-overlay" />
        <div className="dental-trauma-content-container">
          <div className="dental-trauma-card fade-in">
            <h1 className="dental-trauma-title">Dental Trauma</h1>
            <p className="dental-trauma-description">
              Dental trauma involves injuries to the teeth, gums, or surrounding structures due to accidents or impacts. Prompt dental care is essential to prevent complications and ensure proper healing.
            </p>
            {/* Uncomment to include an image */}
            {/* <img
              src="dentaltrauma.jpg"
              alt="Dental Trauma"
              className="dental-trauma-image"
            /> */}
            <div className="dental-trauma-section slide-in">
              <h2 className="dental-trauma-section-title">Common Causes</h2>
              <p>
                Dental trauma is commonly caused by:
              </p>
              <ul>
                <li>Accidents such as falls, car crashes, or sports injuries</li>
                <li>Biting down on hard objects</li>
                <li>Physical altercations</li>
                <li>Chewing hard foods like ice or candy</li>
                <li>High-risk activities, especially in children and athletes</li>
              </ul>
            </div>
            <div className="dental-trauma-section slide-in">
              <h2 className="dental-trauma-section-title">Treatment Options</h2>
              <p>
                Treatment depends on the injury’s severity:
              </p>
              <ul>
                <li><strong>Dental Bonding or Crowns:</strong> For chipped or broken teeth.</li>
                <li><strong>Reimplantation:</strong> For knocked-out teeth, place back in socket or store in milk/saline until seeing a dentist.</li>
                <li><strong>Stitches or Antibiotics:</strong> For soft tissue injuries.</li>
                <li><strong>Extraction and Replacement:</strong> If the tooth cannot be saved, consider implants or bridges.</li>
              </ul>
              <p>
                Prevent dental trauma by wearing mouthguards during sports, avoiding hard objects, and maintaining strong teeth through good oral hygiene.
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

export default DentalTrauma;