import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./LooseTeeth.css";
import { AuthContext } from "../context/AuthContext";
import { FaTooth, FaBars } from "react-icons/fa";

const LooseTeeth = () => {
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
    <div className="loose-teeth-root">
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
      <div className="loose-teeth-bg">
        <div className="loose-teeth-overlay" />
        <div className="loose-teeth-content-container">
          <div className="loose-teeth-card fade-in">
            <h1 className="loose-teeth-title">Loose Teeth</h1>
            <p className="loose-teeth-description">
              Loose teeth in adults can signal underlying dental issues like gum disease, injury, or bone loss. While natural in children during the loss of baby teeth, loose teeth in adults require prompt attention to prevent tooth loss and complications.
            </p>
            {/* Uncomment to include an image */}
            {/* <img
              src="looseteeth.jpg"
              alt="Loose Teeth"
              className="loose-teeth-image"
            /> */}
            <div className="loose-teeth-section slide-in">
              <h2 className="loose-teeth-section-title">Common Causes</h2>
              <p>
                Loose teeth in adults are commonly caused by:
              </p>
              <ul>
                <li>Advanced gum disease (periodontitis)</li>
                <li>Trauma or injury to the mouth</li>
                <li>Teeth grinding (bruxism)</li>
                <li>Osteoporosis</li>
                <li>Poor oral hygiene, smoking, or medical conditions like diabetes</li>
              </ul>
            </div>
            <div className="loose-teeth-section slide-in">
              <h2 className="loose-teeth-section-title">Treatment and Prevention</h2>
              <p>
                To treat and prevent loose teeth:
              </p>
              <ul>
                <li><strong>Treat Gum Disease:</strong> Deep cleaning or surgical procedures.</li>
                <li><strong>Stabilize Teeth:</strong> Use a splint or bite guard for grinding.</li>
                <li><strong>Extraction/Replacement:</strong> Consider implants or dentures in severe cases.</li>
                <li><strong>Maintain Oral Hygiene:</strong> Brush and floss regularly.</li>
                <li><strong>Regular Dental Visits:</strong> Get check-ups and cleanings.</li>
              </ul>
              <p>
                Avoiding smoking and managing health conditions can also reduce the risk of loose teeth.
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

export default LooseTeeth;