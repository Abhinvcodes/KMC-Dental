import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./Gum.css";
import { AuthContext } from "../context/AuthContext";
import { FaTooth, FaBars } from "react-icons/fa";

const Gum = () => {
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
    <div className="gum-root">
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
      <div className="gum-bg">
        <div className="gum-overlay" />
        <div className="gum-content-container">
          <div className="gum-card fade-in">
            <h1 className="gum-title">Gum Disease</h1>
            <p className="gum-description">
              Gum disease, or periodontal disease, is an infection of the tissues supporting your teeth. Ranging from gingivitis to periodontitis, it’s a major cause of tooth loss in adults and often painless, making early detection critical.
            </p>
            {/* Uncomment to include an image */}
            {/* <img
              src="gum.jpg"
              alt="Gum Disease"
              className="gum-image"
            /> */}
            <div className="gum-section slide-in">
              <h2 className="gum-section-title">Common Causes</h2>
              <p>
                Gum disease is commonly caused by:
              </p>
              <ul>
                <li>Buildup of plaque, a sticky bacterial film on teeth</li>
                <li>Poor oral hygiene</li>
                <li>Smoking or tobacco use</li>
                <li>Hormonal changes, diabetes, or certain medications</li>
                <li>Genetics or a weakened immune system</li>
              </ul>
            </div>
            <div className="gum-section slide-in">
              <h2 className="gum-section-title">Prevention and Treatment</h2>
              <p>
                To prevent and treat gum disease:
              </p>
              <ul>
                <li><strong>Maintain Oral Hygiene:</strong> Brush twice daily and floss daily.</li>
                <li><strong>Regular Dental Visits:</strong> Get cleanings and check-ups routinely.</li>
                <li><strong>Quit Smoking:</strong> Reduce risk by avoiding tobacco.</li>
                <li><strong>Manage Health Conditions:</strong> Control diabetes or other contributing factors.</li>
                <li><strong>Treatments:</strong> Deep cleaning, medications, or surgery for severe cases.</li>
              </ul>
              <p>
                Early detection through regular dental visits is key to preventing complications.
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

export default Gum;