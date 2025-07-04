import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./TMJDisorders.css";
import { AuthContext } from "../context/AuthContext";
import { FaTooth, FaBars } from "react-icons/fa";

const TMJDisorders = () => {
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
    <div className="tmj-disorders-root">
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
      <div className="tmj-disorders-bg">
        <div className="tmj-disorders-overlay" />
        <div className="tmj-disorders-content-container">
          <div className="tmj-disorders-card fade-in">
            <h1 className="tmj-disorders-title">TMJ Disorders</h1>
            <p className="tmj-disorders-description">
              TMJ disorders affect the temporomandibular joint, connecting the jawbone to the skull, causing pain, discomfort, and issues like difficulty chewing or jaw clicking. These conditions can be temporary or chronic, often requiring tailored management.
            </p>
            {/* Uncomment to include an image */}
            {/* <img
              src="tmj.jpg"
              alt="TMJ Disorders"
              className="tmj-image"
            /> */}
            <div className="tmj-disorders-section slide-in">
              <h2 className="tmj-disorders-section-title">Common Causes</h2>
              <p>
                TMJ disorders are commonly caused by:
              </p>
              <ul>
                <li>Jaw injury or trauma</li>
                <li>Arthritis</li>
                <li>Misalignment of teeth or jaw</li>
                <li>Teeth grinding (bruxism) or clenching</li>
                <li>Stress, poor posture, or excessive chewing</li>
              </ul>
            </div>
            <div className="tmj-disorders-section slide-in">
              <h2 className="tmj-disorders-section-title">Treatment and Management</h2>
              <p>
                To manage TMJ disorders:
              </p>
              <ul>
                <li><strong>Self-Care:</strong> Eat soft foods, apply ice packs, and avoid extreme jaw movements.</li>
                <li><strong>Physical Therapy:</strong> Exercises to improve jaw function.</li>
                <li><strong>Medications:</strong> Pain relievers or muscle relaxants.</li>
                <li><strong>Mouthguards:</strong> Prevent grinding or clenching.</li>
                <li><strong>Surgery:</strong> For severe cases to correct joint issues.</li>
              </ul>
              <p>
                Consult a dentist or specialist to determine the best approach for your condition.
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

export default TMJDisorders;