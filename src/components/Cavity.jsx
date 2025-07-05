import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./Cavity.css";
import { AuthContext } from "../context/AuthContext";
import { FaTooth, FaBars } from "react-icons/fa";

const Cavity = () => {
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

  const handleCancel = () => {
    navigate("/");
    setIsMenuOpen(false);
  };

  return (
    <div className="cavity-root">
      {/* Header */}
      <header className="header">
        <div className="header-container">
          <div className="logo">
            <FaTooth className="logo-icon" /> KMC Dental Care
          </div>
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
                transform: isMenuOpen ? "rotate(180deg)" : "none",
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
      <div className="cavity-bg">
        <div className="cavity-content-container">
          <div className="cavity-card fade-in">
            <h1 className="cavity-title">Understanding Cavities</h1>
            <p className="cavity-description">
              A cavity, also known as dental caries or tooth decay, is permanent damage to the tooth's hard surface, resulting in tiny holes or openings. It occurs when bacteria in the mouth interact with sugars and starches from food, producing acids that erode the protective enamel. Over time, these acid attacks can break down enamel, forming cavities.
            </p>
            <div className="cavity-section slide-in">
              <h2 className="cavity-section-title">Common Causes</h2>
              <p>
                Poor oral hygiene is a primary cause of cavities. Inadequate brushing and flossing allow plaque—a sticky bacterial film—to accumulate on teeth. Sugary or starchy foods and drinks, like candy, soda, or processed snacks, fuel acid-producing bacteria. Dry mouth, caused by reduced saliva production, also heightens cavity risk, as saliva neutralizes acids and clears food particles.
              </p>
            </div>
            <div className="cavity-section slide-in">
              <h2 className="cavity-section-title">Age Groups Most Affected</h2>
              <p>
                Cavities can affect anyone, but certain groups are more susceptible:
              </p>
              <ul>
                <li>Children and teenagers due to diets high in sugar and inconsistent brushing habits.</li>
                <li>Older adults with gum recession or medication-induced dry mouth.</li>
                <li>Toddlers prone to "baby bottle tooth decay" from prolonged exposure to sugary drinks or milk.</li>
              </ul>
            </div>
            <div className="cavity-button-group">
              <button
                className="cta-button"
                onClick={handleBookConsultationClick}
              >
                Book a Consultation
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cavity;