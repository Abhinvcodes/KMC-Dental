import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./Erosion.css";
import { AuthContext } from "../context/AuthContext";
import { FaTooth, FaBars } from "react-icons/fa";

const Erosion = () => {
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
    <div className="erosion-root">
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
      <div className="erosion-bg">
        <div className="erosion-overlay" />
        <div className="erosion-content-container">
          <div className="erosion-card fade-in">
            <h1 className="erosion-title">Tooth Erosion</h1>
            <p className="erosion-description">
              Tooth erosion, or enamel erosion, is the gradual loss of the tooth’s protective enamel due to acid exposure. This can lead to sensitivity, discoloration, and increased cavity risk. Unlike decay, it’s primarily caused by acids, not bacteria.
            </p>
            {/* Uncomment to include an image */}
            {/* <img
              src="tootherosion.jpg"
              alt="Tooth Erosion"
              className="erosion-image"
            /> */}
            <div className="erosion-section slide-in">
              <h2 className="erosion-section-title">Common Causes</h2>
              <p>
                Tooth erosion is often caused by:
              </p>
              <ul>
                <li>Frequent consumption of acidic foods and drinks (e.g., citrus fruits, sodas, wine)</li>
                <li>Acid reflux or GERD exposing teeth to stomach acids</li>
                <li>Dry mouth reducing saliva protection</li>
                <li>Excessive brushing with abrasive toothpaste</li>
                <li>Environmental factors like chlorine in swimming pools</li>
              </ul>
            </div>
            <div className="erosion-section slide-in">
              <h2 className="erosion-section-title">Prevention and Treatment</h2>
              <p>
                To prevent and treat tooth erosion:
              </p>
              <ul>
                <li><strong>Limit Acidic Foods/Drinks:</strong> Rinse with water after consumption.</li>
                <li><strong>Use Soft Toothbrush:</strong> Brush gently with fluoride toothpaste.</li>
                <li><strong>Manage Acid Reflux:</strong> Seek medical treatment for GERD.</li>
                <li><strong>Restorative Treatments:</strong> Bonding, veneers, or crowns for severe erosion.</li>
              </ul>
              <p>
                Regular dental check-ups can help monitor and protect your enamel from further damage.
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

export default Erosion;