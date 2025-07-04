import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./Fractures.css";
import { AuthContext } from "../context/AuthContext";
import { FaTooth, FaBars } from "react-icons/fa";

const Fractures = () => {
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
    <div className="fractures-root">
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
      <div className="fractures-bg">
        <div className="fractures-overlay" />
        <div className="fractures-content-container">
          <div className="fractures-card fade-in">
            <h1 className="fractures-title">Fractures of Teeth</h1>
            <p className="fractures-description">
              Fractures of teeth, also known as cracked or broken teeth, occur due to trauma, biting on hard objects, or weakened tooth structure. Prompt dental care is essential to prevent pain, sensitivity, or infection.
            </p>
            {/* Uncomment to include an image */}
            {/* <img
              src="fracture.jpg"
              alt="Fractures of Teeth"
              className="fracture-image"
            /> */}
            <div className="fractures-section slide-in">
              <h2 className="fractures-section-title">Common Causes</h2>
              <p>
                Fractures of teeth are commonly caused by:
              </p>
              <ul>
                <li>Accidents, sports injuries, or falls</li>
                <li>Biting on hard foods like ice, nuts, or candy</li>
                <li>Untreated cavities or large fillings weakening the tooth</li>
                <li>Teeth grinding (bruxism)</li>
                <li>Aging restorations like crowns or fillings</li>
              </ul>
            </div>
            <div className="fractures-section slide-in">
              <h2 className="fractures-section-title">Treatment Options</h2>
              <p>
                Treatment depends on the severity of the fracture:
              </p>
              <ul>
                <li><strong>Dental Bonding:</strong> For minor cracks or chips.</li>
                <li><strong>Crown or Veneer:</strong> Restores shape and function for severe fractures.</li>
                <li><strong>Root Canal:</strong> Required if the pulp is exposed.</li>
                <li><strong>Extraction:</strong> If the tooth cannot be saved, followed by an implant or bridge.</li>
              </ul>
              <p>
                Prevent fractures by avoiding hard foods, wearing mouthguards during sports, and maintaining regular dental check-ups.
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

export default Fractures;