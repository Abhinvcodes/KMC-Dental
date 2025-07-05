import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./Infection.css";
import { AuthContext } from "../context/AuthContext";
import { FaTooth, FaBars } from "react-icons/fa";

const Infection = () => {
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
    <div className="infection-root">
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
      <div className="infection-bg">
        <div className="infection-overlay" />
        <div className="infection-content-container">
          <div className="infection-card fade-in">
            <h1 className="infection-title">Dental Infection</h1>
            <p className="infection-description">
              A dental infection, or tooth abscess, is a pocket of pus caused by a bacterial infection in the tooth or gums. It can cause severe pain, swelling, and complications if untreated, potentially spreading to other parts of the body.
            </p>
            {/* Uncomment to include an image */}
            {/* <img
              src="infection.jpg"
              alt="Dental Infection"
              className="infection-image"
            /> */}
            <div className="infection-section slide-in">
              <h2 className="infection-section-title">Common Causes</h2>
              <p>
                Dental infections are commonly caused by:
              </p>
              <ul>
                <li>Untreated cavities or cracked teeth</li>
                <li>Gum disease</li>
                <li>Poor oral hygiene</li>
                <li>High-sugar diet or weakened immune system</li>
                <li>Trauma to the tooth or previous dental work</li>
              </ul>
            </div>
            <div className="infection-section slide-in">
              <h2 className="infection-section-title">Symptoms and Treatment</h2>
              <p>
                Symptoms include:
              </p>
              <ul>
                <li>Severe toothache or swelling in the face/cheek</li>
                <li>Sensitivity to hot and cold</li>
                <li>Fever or bad taste in the mouth</li>
                <li>Difficulty swallowing or breathing</li>
              </ul>
              <p>
                Treatment involves draining the abscess and eliminating the infection through root canal therapy, tooth extraction, or antibiotics. Prevent infections with good oral hygiene, regular dental visits, and prompt treatment of dental issues.
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

export default Infection;