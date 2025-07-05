import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./Grinding.css";
import { AuthContext } from "../context/AuthContext";
import { FaTooth, FaBars } from "react-icons/fa";

const Grinding = () => {
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
    <div className="grinding-root">
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
      <div className="grinding-bg">
        <div className="grinding-overlay" />
        <div className="grinding-content-container">
          <div className="grinding-card fade-in">
            <h1 className="grinding-title">Grinding (Bruxism)</h1>
            <p className="grinding-description">
              Bruxism, or teeth grinding, involves clenching or grinding teeth, often unconsciously, during the day or night. It can lead to tooth damage, jaw pain, headaches, and other complications, often triggered by stress or misaligned teeth.
            </p>
            {/* Uncomment to include an image */}
            {/* <img
              src="grinding.jpg"
              alt="Grinding (Bruxism)"
              className="grinding-image"
            /> */}
            <div className="grinding-section slide-in">
              <h2 className="grinding-section-title">Common Causes</h2>
              <p>
                Bruxism is commonly caused by:
              </p>
              <ul>
                <li>Stress, anxiety, or tension</li>
                <li>Misaligned teeth or an abnormal bite</li>
                <li>Sleep disorders like sleep apnea</li>
                <li>Excessive caffeine, alcohol, or smoking</li>
                <li>Certain medications or neurological conditions</li>
              </ul>
            </div>
            <div className="grinding-section slide-in">
              <h2 className="grinding-section-title">Prevention and Treatment</h2>
              <p>
                To prevent and treat bruxism:
              </p>
              <ul>
                <li><strong>Manage Stress:</strong> Use relaxation techniques like meditation or yoga.</li>
                <li><strong>Avoid Stimulants:</strong> Limit caffeine and alcohol, especially before bed.</li>
                <li><strong>Mouthguard:</strong> Wear a custom-fitted mouthguard at night to protect teeth.</li>
                <li><strong>Orthodontic Treatment:</strong> Correct misaligned teeth if necessary.</li>
                <li><strong>Therapy/Medication:</strong> Address underlying stress or anxiety.</li>
              </ul>
              <p>
                Regular dental check-ups can help monitor and manage bruxism to prevent long-term damage.
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

export default Grinding;