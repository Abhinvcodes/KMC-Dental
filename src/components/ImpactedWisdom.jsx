import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./ImpactedWisdom.css";
import { AuthContext } from "../context/AuthContext";
import { FaTooth, FaBars } from "react-icons/fa";

const ImpactedWisdom = () => {
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
    <div className="impacted-wisdom-root">
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
      <div className="impacted-wisdom-bg">
        <div className="impacted-wisdom-overlay" />
        <div className="impacted-wisdom-content-container">
          <div className="impacted-wisdom-card fade-in">
            <h1 className="impacted-wisdom-title">Impacted Wisdom Teeth</h1>
            <p className="impacted-wisdom-description">
              Impacted wisdom teeth are third molars that lack space to emerge properly, often growing at an angle or remaining trapped in the jawbone. They can cause pain, swelling, infection, and damage to adjacent teeth, often requiring surgical removal.
            </p>
            {/* Uncomment to include an image */}
            {/* <img
              src="impactedwisdom.jpg"
              alt="Impacted Wisdom Teeth"
              className="impacted-wisdom-image"
            /> */}
            <div className="impacted-wisdom-section slide-in">
              <h2 className="impacted-wisdom-section-title">Common Causes</h2>
              <p>
                Impacted wisdom teeth are commonly caused by:
              </p>
              <ul>
                <li>Lack of space in the jaw for third molars</li>
                <li>Genetics or small jaw size</li>
                <li>Improper angle of tooth eruption</li>
                <li>Overcrowding or misalignment of other teeth</li>
              </ul>
            </div>
            <div className="impacted-wisdom-section slide-in">
              <h2 className="impacted-wisdom-section-title">Symptoms and Treatment</h2>
              <p>
                Symptoms include:
              </p>
              <ul>
                <li>Pain, swelling, or redness in the gums</li>
                <li>Difficulty opening the mouth</li>
                <li>Bad breath or infection</li>
                <li>Damage to adjacent teeth</li>
              </ul>
              <p>
                Treatment typically involves surgical extraction. Regular dental check-ups and X-rays can detect impaction early, preventing complications like infections or cysts.
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

export default ImpactedWisdom;