import React, { useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { FaTooth, FaBars } from "react-icons/fa";
import "./PaymentScreen.css";

const PaymentScreen = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useContext(AuthContext);
  const dentist = location.state?.dentist || { name: "Unknown Dentist" };
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleProceedAfterPayment = () => {
    navigate("/AppointmentDetails", { state: { dentist } });
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
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
    <div className="payment-screen-root">
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
      <div className="payment-screen-bg">
        <div className="payment-screen-overlay" />
        <div className="payment-screen-content-container">
          <div className="payment-content fade-in">
            <div className="payment-details">
              <h2 className="payment-title">Payment Details</h2>
              <p className="payment-description slide-in">
                Please transfer the consultation fee to the following bank account to proceed with your appointment.
              </p>
              <div className="bank-info">
                <p>Bank Name: XYZ Bank</p>
                <p>Account Number: 1234567890</p>
                <p>IFSC Code: XYZB0001234</p>
              </div>
              <p className="payment-for">
                Payment for: <span className="font-semibold">Dr. {dentist.name}</span>
              </p>
              <button
                onClick={handleProceedAfterPayment}
                className="proceed-btn cta-button"
              >
                Proceed after Payment
              </button>
            </div>
            <div className="payment-image-container">
              <img
                src="/images/payment-illustration.webp"
                alt="Payment Illustration"
                className="payment-image"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentScreen;