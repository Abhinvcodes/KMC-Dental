import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./Xerostomia.css";
import { AuthContext } from "../context/AuthContext";
import { FaTooth, FaBars } from "react-icons/fa";

const Xerostomia = () => {
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
    <div className="xerostomia-root">
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
      <div className="xerostomia-bg">
        <div className="xerostomia-overlay" />
        <div className="xerostomia-content-container">
          <div className="xerostomia-card fade-in">
            <h1 className="xerostomia-title">Xerostomia (Dry Mouth)</h1>
            <p className="xerostomia-description">
              Xerostomia, or dry mouth, occurs when salivary glands produce insufficient saliva, causing discomfort and increasing risks of cavities and gum disease. It can be temporary or chronic and often requires management.
            </p>
            {/* Uncomment to include an image */}
            {/* <img
              src="xerostomia.jpg"
              alt="Xerostomia (Dry Mouth)"
              className="xerostomia-image"
            /> */}
            <div className="xerostomia-section slide-in">
              <h2 className="xerostomia-section-title">Common Causes</h2>
              <p>
                Xerostomia is commonly caused by:
              </p>
              <ul>
                <li>Medications (e.g., antihistamines, antidepressants)</li>
                <li>Dehydration or radiation therapy</li>
                <li>Autoimmune diseases (e.g., Sjögren's syndrome)</li>
                <li>Conditions like diabetes or Parkinson's disease</li>
                <li>Smoking, alcohol, or mouth breathing</li>
              </ul>
            </div>
            <div className="xerostomia-section slide-in">
              <h2 className="xerostomia-section-title">Treatment and Prevention</h2>
              <p>
                To manage and prevent xerostomia:
              </p>
              <ul>
                <li><strong>Hydration:</strong> Drink plenty of water.</li>
                <li><strong>Saliva Stimulation:</strong> Chew sugar-free gum or use saliva substitutes.</li>
                <li><strong>Avoid Irritants:</strong> Limit alcohol, caffeine, and tobacco.</li>
                <li><strong>Medical Review:</strong> Consult a doctor to adjust medications if needed.</li>
                <li><strong>Dental Care:</strong> Regular check-ups to prevent decay and gum disease.</li>
              </ul>
              <p>
                Address persistent dry mouth with a dentist or doctor to prevent complications.
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

export default Xerostomia;