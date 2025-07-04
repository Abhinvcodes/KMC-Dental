import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./Toothache.css";
import { AuthContext } from "../context/AuthContext";
import { FaTooth, FaBars } from "react-icons/fa";

const Toothache = () => {
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
    <div className="toothache-root">
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
      <div className="toothache-bg">
        <div className="toothache-overlay" />
        <div className="toothache-content-container">
          <div className="toothache-card fade-in">
            <h1 className="toothache-title">Toothache</h1>
            <p className="toothache-description">
              A toothache is pain in or around a tooth, ranging from mild discomfort to severe throbbing, often caused by dental issues like cavities, gum disease, or infections. Prompt attention is crucial to prevent complications.
            </p>
            {/* Uncomment to include an image */}
            {/* <img
              src="toothache.jpg"
              alt="Toothache"
              className="toothache-image"
            /> */}
            <div className="toothache-section slide-in">
              <h2 className="toothache-section-title">Common Causes</h2>
              <p>
                Toothaches are commonly caused by:
              </p>
              <ul>
                <li>Tooth decay leading to cavities or infections</li>
                <li>Gum disease (gingivitis or periodontitis)</li>
                <li>Tooth fractures or abscesses</li>
                <li>Impacted wisdom teeth</li>
                <li>Teeth grinding (bruxism) or referred pain from sinus/jaw issues</li>
              </ul>
            </div>
            <div className="toothache-section slide-in">
              <h2 className="toothache-section-title">When to See a Dentist</h2>
              <p>
                Seek dental care for:
              </p>
              <ul>
                <li><strong>Severe/Persistent Pain:</strong> Indicates potential serious issues.</li>
                <li><strong>Swelling or Fever:</strong> Signs of infection or abscess.</li>
                <li><strong>Temporary Relief:</strong> Use pain relievers, saltwater rinses, or cold compresses.</li>
                <li><strong>Prevention:</strong> Maintain oral hygiene and regular dental check-ups.</li>
              </ul>
              <p>
                Delaying treatment can lead to complications like tooth loss or abscesses.
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

export default Toothache;