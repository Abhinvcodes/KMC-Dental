import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./Front.css";
import { AuthContext } from "../context/AuthContext";
import { FaTooth, FaPhoneAlt, FaEnvelope, FaBars } from "react-icons/fa";

const Front = () => {
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
    const keyServicesSection = document.getElementById("key-services");
    if (keyServicesSection) {
      keyServicesSection.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  const scrollToHowCanWeHelp = () => {
    const helpSection = document.getElementById("how-can-we-help");
    if (helpSection) {
      helpSection.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
    setIsMenuOpen(false);
  };

  const dentalIssues = [
    { name: "Cavities", path: "/Cavity" },
    { name: "Toothache", path: "/Toothache" },
    { name: "Tooth Sensitivity", path: "/ToothSensitivity" },
    { name: "Gum Disease", path: "/Gum" },
    { name: "Tooth Abscess", path: "/Abscess" },
    { name: "Tooth Fractures", path: "/Fractures" },
    { name: "Tooth Erosion", path: "/Erosion" },
    { name: "Teeth Grinding", path: "/Grinding" },
    { name: "Impacted Wisdom Teeth", path: "/ImpactedWisdom" },
    { name: "Malocclusion", path: "/Malocclusion" },
    { name: "Chipped Teeth", path: "/BrokenTeeth" },
    { name: "Oral Ulcers", path: "/Ulcers" },
    { name: "Discolored Teeth", path: "/Stained" },
    { name: "Dry Mouth", path: "/Xerostomia" },
    { name: "Tooth Infection", path: "/Infection" },
    { name: "Loose Teeth", path: "/LooseTeeth" },
    { name: "Dental Trauma", path: "/DentalTrauma" },
    { name: "Root Canal", path: "/RootCanal" },
    { name: "TMJ Disorders", path: "/TMJDisorders" },
    { name: "Enamel Hypoplasia", path: "/Hypoplasia" },
  ];

  return (
    <div className="app">
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

      {/* Hero Section */}
      <section className="hero fade-in">
        <div className="hero-content">
          <h1>Transform Your Smile with Expert Care</h1>
          <p>Discover world-class dental care tailored to your needs.</p>
          <button className="cta-button" onClick={handleBookConsultationClick}>
            Book Appointment Now
          </button>
        </div>
        <div className="hero-image">
          <img
            src="./images/bgimg.webp"
            alt="Dental Care"
          />
          <div className="floating-tooth" aria-label="Floating tooth icon">
            🦷
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="why-choose-us fade-in">
        <h2>Why Choose KMC Dental Care?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <span role="img" aria-label="Clock">⏰</span>
            <h3>Flexible Scheduling</h3>
            <p>Book appointments at your convenience, 24/7.</p>
          </div>
          <div className="feature-card">
            <span role="img" aria-label="Dentist">👩‍⚕️</span>
            <h3>Expert Dentists</h3>
            <p>Trust our certified professionals for top-quality care.</p>
          </div>
          <div className="feature-card">
            <span role="img" aria-label="Shield">🔒</span>
            <h3>Secure & Private</h3>
            <p>Your data is protected with advanced encryption.</p>
          </div>
        </div>
      </section>

      {/* Key Services Section */}
      <section id="key-services" className="key-services fade-in">
        <h2>Comprehensive Dental Services</h2>
        <div className="services-grid">
          {dentalIssues.map((issue, index) => (
            <div key={index} className="service-card">
              <h3>{issue.name}</h3>
              <button onClick={() => navigate(issue.path)}>Learn More</button>
            </div>
          ))}
        </div>
      </section>

      {/* How Can We Help Section */}
      <section id="how-can-we-help" className="how-can-we-help fade-in">
        <h2>Your Path to a Perfect Smile</h2>
        <p>
          Our expert team provides personalized dental solutions, from routine
          check-ups to advanced cosmetic procedures.
        </p>
        <h3>Benefits of Online Consultations</h3>
        <ul>
          <li>Convenient consultations from the comfort of your home.</li>
          <li>Fast, personalized advice from certified dentists.</li>
          <li>Quick responses, often within 24 hours.</li>
        </ul>
        <h3>Our Consultation Process</h3>
        <div className="process-steps">
          <div className="step">
            <span>1</span>
            <h4>Upload Photos</h4>
            <p>Share clear images of your teeth for accurate assessment.</p>
          </div>
          <div className="step">
            <span>2</span>
            <h4>Complete Form</h4>
            <p>Detail your dental concerns for tailored advice.</p>
          </div>
          <div className="step">
            <span>3</span>
            <h4>Receive Guidance</h4>
            <p>Get expert recommendations via call or email.</p>
          </div>
        </div>
        <button className="cta-button" onClick={handleBookConsultationClick}>
          Start Consultation
        </button>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-logo">
            <FaTooth className="logo-icon" /> KMC Dental Care
          </div>
          <div className="footer-links">
            <h4>Quick Links</h4>
            <ul>
              <li onClick={scrollToHowCanWeHelp}>About Us</li>
              <li onClick={scrollToKeyServices}>Services</li>
              <li onClick={() => navigate("/DentalForm")}>Book Appointment</li>
            </ul>
          </div>
          <div className="contact-info">
            <h4>Contact Us</h4>
            <p>
              <FaPhoneAlt /> +1-800-DENTAL
            </p>
            <p>
              <FaEnvelope /> support@kmcdentalcare.com
            </p>
          </div>
          <div className="social-proof">
            <h4>Our Impact</h4>
            <p>👨‍⚕️ 15,000+ Patients Served</p>
            <p>✅ 98% Satisfaction Rate</p>
            <p>
              <strong>Opening Hours</strong>
              <br />
              Mon-Sat: 9 am - 6 pm
              <br />
              Sun: Closed
            </p>
          </div>
        </div>
        <div className="footer-bottom">
    <p>
      © 2025 KMC Dental Care. All Rights Reserved. &nbsp;|&nbsp;
      <a href="/privacy-policy" style={{ color: "#21b6e7" }}>Privacy Policy</a>
      &nbsp;|&nbsp;
      <a href="/terms" style={{ color: "#21b6e7" }}>Terms of Service</a>
    </p>
  </div>
      </footer>
    </div>
  );
};

export default Front;
