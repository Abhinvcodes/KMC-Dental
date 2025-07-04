import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./Hypoplasia.css";
import { AuthContext } from "../context/AuthContext";
import { FaTooth, FaBars } from "react-icons/fa";

const Hypoplasia = () => {
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
    <div className="hypoplasia-root">
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
      <div className="hypoplasia-bg">
        <div className="hypoplasia-overlay" />
        <div className="hypoplasia-content-container">
          <div className="hypoplasia-card fade-in">
            <h1 className="hypoplasia-title">Hypoplasia</h1>
            <p className="hypoplasia-description">
              Hypoplasia is a condition where tooth enamel is underdeveloped, leading to thin or missing enamel. This increases susceptibility to decay, sensitivity, and damage, affecting both baby and permanent teeth.
            </p>
            {/* Uncomment to include an image */}
            {/* <img
              src="hypoplasia.jpg"
              alt="Hypoplasia"
              className="hypoplasia-image"
            /> */}
            <div className="hypoplasia-section slide-in">
              <h2 className="hypoplasia-section-title">Common Causes</h2>
              <p>
                Hypoplasia is commonly caused by:
              </p>
              <ul>
                <li>Malnutrition or infections during tooth development</li>
                <li>High fevers in childhood</li>
                <li>Maternal illness or vitamin D deficiency during pregnancy</li>
                <li>Medications like tetracycline antibiotics</li>
                <li>Genetic factors</li>
              </ul>
            </div>
            <div className="hypoplasia-section slide-in">
              <h2 className="hypoplasia-section-title">Prevention and Treatment</h2>
              <p>
                To prevent and treat hypoplasia:
              </p>
              <ul>
                <li><strong>Ensure Proper Nutrition:</strong> Support enamel development during pregnancy and childhood.</li>
                <li><strong>Avoid Harmful Medications:</strong> Limit exposure to drugs affecting enamel formation.</li>
                <li><strong>Fluoride Treatments:</strong> Strengthen enamel to reduce sensitivity.</li>
                <li><strong>Dental Sealants or Bonding:</strong> Protect and reinforce affected teeth.</li>
                <li><strong>Crowns:</strong> Restore severely affected teeth.</li>
              </ul>
              <p>
                Regular dental check-ups are crucial to monitor and manage hypoplasia effectively.
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

export default Hypoplasia;