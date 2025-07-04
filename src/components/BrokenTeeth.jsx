import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./BrokenTeeth.css";
import { AuthContext } from "../context/AuthContext";
import { FaTooth, FaBars } from "react-icons/fa";

const BrokenTeeth = () => {
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
    <div className="broken-teeth-root">
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
      <div className="broken-teeth-bg">
        <div className="broken-teeth-overlay" />
        <div className="broken-teeth-content-container">
          <div className="broken-teeth-card fade-in">
            <h1 className="broken-teeth-title">Broken Teeth</h1>
            <p className="broken-teeth-description">
              A broken tooth is a common dental issue caused by trauma, biting on hard objects, or weakened tooth structure. Prompt treatment is essential to prevent pain, sensitivity, or infection.
            </p>
            {/* Uncomment to include an image */}
            {/* <img
              src="brokenteeth.jpg"
              alt="Broken Teeth"
              className="broken-teeth-image"
            /> */}
            <div className="broken-teeth-section slide-in">
              <h2 className="broken-teeth-section-title">Common Causes</h2>
              <p>
                Broken teeth often result from:
              </p>
              <ul>
                <li>Accidents, sports injuries, or falls</li>
                <li>Biting on hard foods like ice, nuts, or candy</li>
                <li>Untreated cavities or large fillings weakening the tooth</li>
                <li>Teeth grinding (bruxism)</li>
                <li>Aging restorations like crowns or fillings</li>
              </ul>
            </div>
            <div className="broken-teeth-section slide-in">
              <h2 className="broken-teeth-section-title">Treatment Options</h2>
              <p>
                Treatment depends on the severity of the damage:
              </p>
              <ul>
                <li><strong>Dental Bonding:</strong> For minor cracks or chips.</li>
                <li><strong>Crown or Veneer:</strong> Restores shape and function for severe fractures.</li>
                <li><strong>Root Canal:</strong> Required if the pulp is exposed.</li>
                <li><strong>Extraction:</strong> If the tooth cannot be saved, followed by an implant or bridge.</li>
              </ul>
              <p>
                Prevent broken teeth by avoiding hard foods, wearing mouthguards during sports, and maintaining regular dental check-ups.
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

export default BrokenTeeth;