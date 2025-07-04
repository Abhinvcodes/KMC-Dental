import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./Abscess.css";
import { AuthContext } from "../context/AuthContext";
import { FaTooth, FaBars } from "react-icons/fa";

const Abscess = () => {
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
    <div className="abscess-root">
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
      <div className="abscess-bg">
        <div className="abscess-overlay" />
        <div className="abscess-content-container">
          <div className="abscess-card fade-in">
            <h1 className="abscess-title">Dental Abscess</h1>
            <p className="abscess-description">
              A dental abscess is a pocket of pus caused by a bacterial infection, often leading to significant discomfort. It can occur at the tooth's root (periapical abscess) or in the gums (periodontal abscess). If untreated, it may cause serious complications.
            </p>
            <div className="abscess-section">
              <h2 className="abscess-section-title">Common Causes</h2>
              <p>
                Dental abscesses often result from untreated cavities, cracked teeth, or gum disease. Bacteria enter the tooth or gums, causing infection and pus buildup. Risk factors include poor oral hygiene, high-sugar diets, a weakened immune system, dental trauma, or previous dental procedures.
              </p>
            </div>
            <div className="abscess-section">
              <h2 className="abscess-section-title">Symptoms</h2>
              <ul>
                <li>Severe, persistent toothache or throbbing pain</li>
                <li>Swelling in the face, cheek, or gums</li>
                <li>Sensitivity to hot or cold</li>
                <li>Fever and general discomfort</li>
                <li>Bad taste in the mouth or bad breath</li>
                <li>Difficulty swallowing or breathing (in severe cases)</li>
              </ul>
            </div>
            <div className="abscess-section">
              <h2 className="abscess-section-title">Treatment Options</h2>
              <p>
                Treatment focuses on draining the abscess and eliminating the infection. Options include:
              </p>
              <ul>
                <li><strong>Root Canal Therapy:</strong> Removes infected tissue and saves the tooth.</li>
                <li><strong>Tooth Extraction:</strong> Necessary if the tooth is beyond saving.</li>
                <li><strong>Antibiotics:</strong> Used to control the infection, especially if it has spread.</li>
                <li><strong>Drainage:</strong> A dentist may make a small incision to drain the pus.</li>
              </ul>
              <p>
                Prevent abscesses by maintaining good oral hygiene, regular dental check-ups, and promptly addressing cavities or gum issues.
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

export default Abscess;