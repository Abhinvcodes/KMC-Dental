import React, { useState, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import "./Front.css";
import { AuthContext } from "../context/AuthContext";

const Front = () => {
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useContext(AuthContext);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark-mode', !darkMode);
  };

  const handleBookConsultationClick = () => {
    if (isAuthenticated) {
      navigate('/DentalForm');
    } else {
      navigate('/Login');
    }
  };

  const scrollToKeyServices = () => {
    const keyServicesSection = document.getElementById("key-services");
    if (keyServicesSection) {
      keyServicesSection.scrollIntoView({ behavior: "smooth" });
    }
  };


  const scrollToHowCanWeHelp = () => {
    const helpSection = document.getElementById("how-can-we-help");
    if (helpSection) {
      helpSection.scrollIntoView({ behavior: "smooth" });
    }
  };


  const handleCavitiesClick = () => {
    navigate('/Cavity');
  };

  const handleToothacheClick = () => {
    navigate('/Toothache');
  };

  const handleToothSensitivityClick = () => {
    navigate('/ToothSensitivity');
  };

  const handleGumClick = () => {
    navigate('/Gum');
  };

  const handleAbscessClick = () => {
    navigate('/Abscess');
  };

  const handleFracturesClick = () => {
    navigate('/Fractures');
  };

  const handleErosionClick = () => {
    navigate('/Erosion');
  };

  const handleGrindingClick = () => {
    navigate('/Grinding');
  };

  const handleImpactedWisdomClick = () => {
    navigate('/ImpactedWisdom');
  };

  const handleMalocclusionClick = () => {
    navigate('/Malocclusion');
  };

  const handleBrokenTeethClick = () => {
    navigate('/BrokenTeeth');
  };

  const handleUlcersClick = () => {
    navigate('/Ulcers');
  };

  const handleStainedClick = () => {
    navigate('/Stained');
  };

  const handleXerostomiaClick = () => {
    navigate('/Xerostomia');
  };

  const handleInfectionClick = () => {
    navigate('/Infection');
  };

  const handleLooseTeethClick = () => {
    navigate('/LooseTeeth');
  };

  const handleDentalTraumaClick = () => {
    navigate('/DentalTrauma');
  };

  const handleRootCanalClick = () => {
    navigate('/RootCanal');
  };

  const handleTMJDisordersClick = () => {
    navigate('/TMJDisorders');
  };

  const handleHypoplasiaClick = () => {
    navigate('/Hypoplasia');
  };

  const handlePaymentScreenClick = () => {
    navigate('/PaymentScreen ');
  };
  const handleDentalFormClick = () => {
    navigate('/DentalForm');
  };

  const handleDentistConsultationPageClick = () => {
    navigate('/DentistConsultationPage');
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className={`app ${darkMode ? "dark-mode" : ""}`}>
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">HealthCare+</div>
        <ul className="nav-links">
          <li className="nav-item" onClick={scrollToHowCanWeHelp}>About Us</li>
          <li className="nav-item" onClick={scrollToKeyServices}>Services</li>
          {isAuthenticated ? (
            <>
              <li className="nav-item" onClick={() => navigate('/dashboard')}>My Dashboard</li>
              <li className="nav-item" onClick={handleLogout}>Logout</li>
            </>
          ) : (
            <li className="nav-item" onClick={() => navigate('/Login')}>Login</li>
          )}
        </ul>
        <button className="dark-mode-toggle" onClick={toggleDarkMode}>
          {darkMode ? "⚪🌞" : "⚫🌙"}
        </button>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Your Health, Our Priority</h1>
          <p>Find the best doctors, book appointments, and consult online.</p>
          <button className="cta-button" onClick={handleBookConsultationClick}>
            Book an Appointment
          </button>
        </div>
        <div className="hero-image"></div>
        {/*   <img src="path_to_image" alt="Doctor and Patient" /> 
         <div className="floating-stethoscope" aria-label="Floating stethoscope icon">🩺</div>
*/}

      </section>

      {/* Why Choose Us Section */}
      <section className="why-choose-us">
        <h2>Why Choose Us?</h2>
        <div className="testimonials-carousel">
          <div className="testimonial">
            <p>"Amazing service! Highly recommended."</p>
            {/*   <span>- John Doe</span>*/}
          </div>
          <div className="testimonial">
            <p>"The doctors are very professional and caring."</p>
            {/*  <span>- Jane Smith</span>*/}
          </div>
        </div>
        <div className="trust-badges">
          <span>🏥 ISO Certified</span>
          <span>🔒 HIPAA Compliant</span>
          <span>💻 Secure Data Encryption</span>
        </div>
      </section>

      {/* Key Services Section */}
      <section id="key-services" className="key-services">
        <h2>Common Dental Issues</h2>
        <div className="services-grid">
          <div className="service-card" style={{ backgroundColor: 'orange', padding: '10px', borderRadius: '5px' }}>
            <h3>Cavities (Dental Caries)</h3>
            <button onClick={handleCavitiesClick}>Go to Cavities Page</button>
          </div>
          <div className="service-card" style={{ backgroundColor: 'orange', padding: '10px', borderRadius: '5px' }}>
            <h3>Toothache</h3>
            <button onClick={handleToothacheClick}>Go to Toothache Page</button>
          </div>
          <div className="service-card" style={{ backgroundColor: 'orange', padding: '10px', borderRadius: '5px' }}>
            <h3>Tooth Sensitivity</h3>
            <button onClick={handleToothSensitivityClick}>Go to Tooth Sensitivity Page</button>
          </div>
          <div className="service-card" style={{ backgroundColor: 'orange', padding: '10px', borderRadius: '5px' }}>
            <h3>Gum Disease (Periodontal Disease)</h3>
            <button onClick={handleGumClick}>Go to Gum Disease Page</button>
          </div>
          <div className="service-card" style={{ backgroundColor: 'orange', padding: '10px', borderRadius: '5px' }}>
            <h3>Tooth Abscess</h3>
            <button onClick={handleAbscessClick}>Go to Tooth Abscess Page</button>
          </div>
          <div className="service-card" style={{ backgroundColor: 'orange', padding: '10px', borderRadius: '5px' }}>
            <h3>Tooth Fractures (Cracked Tooth)</h3>
            <button onClick={handleFracturesClick}>Go to Tooth Fractures Page</button>
          </div>
          <div className="service-card" style={{ backgroundColor: 'orange', padding: '10px', borderRadius: '5px' }}>
            <h3>Tooth Erosion</h3>
            <button onClick={handleErosionClick}>Go to Tooth Erosion Page</button>
          </div>
          <div className="service-card" style={{ backgroundColor: 'orange', padding: '10px', borderRadius: '5px' }}>
            <h3>Teeth Grinding (Bruxism)</h3>
            <button onClick={handleGrindingClick}>Go to Bruxism Page</button>
          </div>
          <div className="service-card" style={{ backgroundColor: 'orange', padding: '10px', borderRadius: '5px' }}>
            <h3>Impacted Wisdom Teeth</h3>
            <button onClick={handleImpactedWisdomClick}>Go to Impacted Wisdom Page</button>
          </div>
          <div className="service-card" style={{ backgroundColor: 'orange', padding: '10px', borderRadius: '5px' }}>
            <h3>Malocclusion (Misaligned Teeth)</h3>
            <button onClick={handleMalocclusionClick}>Go to Malocclusion Page</button>
          </div>
          <div className="service-card" style={{ backgroundColor: 'orange', padding: '10px', borderRadius: '5px' }}>
            <h3>Chipped or Broken Teeth</h3>
            <button onClick={handleBrokenTeethClick}>Go to Broken Teeth Page</button>
          </div>
          <div className="service-card" style={{ backgroundColor: 'orange', padding: '10px', borderRadius: '5px' }}>
            <h3>Oral Ulcers or Sores</h3>
            <button onClick={handleUlcersClick}>Go to Sores Page</button>
          </div>
          <div className="service-card" style={{ backgroundColor: 'orange', padding: '10px', borderRadius: '5px' }}>
            <h3>Stained or Discolored Teeth</h3>
            <button onClick={handleStainedClick}>Go to Discolored Teeth Page</button>
          </div>
          <div className="service-card" style={{ backgroundColor: 'orange', padding: '10px', borderRadius: '5px' }}>
            <h3>Dry Mouth (Xerostomia)</h3>
            <button onClick={handleXerostomiaClick}>Go to Xerostomia Page</button>
          </div>
          <div className="service-card" style={{ backgroundColor: 'orange', padding: '10px', borderRadius: '5px' }}>
            <h3>Tooth Infection</h3>
            <button onClick={handleInfectionClick}>Go to Tooth Infection Page</button>
          </div>
          <div className="service-card" style={{ backgroundColor: 'orange', padding: '10px', borderRadius: '5px' }}>
            <h3>Loose Teeth</h3>
            <button onClick={handleLooseTeethClick}>Go to Loose Teeth Page</button>
          </div>
          <div className="service-card" style={{ backgroundColor: 'orange', padding: '10px', borderRadius: '5px' }}>
            <h3>Dental Trauma</h3>
            <button onClick={handleDentalTraumaClick}>Go to Dental Trauma Page</button>
          </div>
          <div className="service-card" style={{ backgroundColor: 'orange', padding: '10px', borderRadius: '5px' }}>
            <h3>Root Canal Infections</h3>
            <button onClick={handleRootCanalClick}>Go to Root Canal Page</button>
          </div>
          <div className="service-card" style={{ backgroundColor: 'orange', padding: '10px', borderRadius: '5px' }}>
            <h3>TMJ Disorders</h3>
            <button onClick={handleTMJDisordersClick}>Go to TMJ Disorders Page</button>
          </div>
          <div className="service-card" style={{ backgroundColor: 'orange', padding: '10px', borderRadius: '5px' }}>
            <h3>Enamel Hypoplasia</h3>
            <button onClick={handleHypoplasiaClick}>Go to Enamel Hypoplasia Page</button>
          </div>
        </div>
      </section>

      <section id="how-can-we-help" className="how-can-we-help">

        <h1 style={{ fontSize: '3rem' }}>How Can We Help?</h1>
        <p>Our dentists can offer feedback on a range of dental queries, from dental issues to cosmetic dentistry enquiries. Whether you’re worried about a particular issue, or you’re considering ways to improve your smile, our dentists can review pictures of your teeth and offer personalised advice.
        </p>

        <h1>Why Book an Online Dental Consultation?
        </h1>
        <p>Our online consultations can help you gain a clearer idea of what your dental issue is, and which treatments may be right for you. Here are some of the reasons you should consider booking an online consultation:</p>

        <h2>Quick and Easy Process</h2>
        <p>Booking an online dental consultation is a fast process that can take as little as a few minutes. All you need to do is complete the below form and submit a few photos of your teeth. Our dentists will use these to analyse your case and give you the information and advice you need.</p>

        <h2>Feedback from Qualified Dentists</h2>
        <p>Once you’ve submitted your form and photos, you’ll hear back from one of our fully qualified and experienced dentists. They can offer professional and personalised advice to help you better understand your dental health and potential treatment options. Any advice or quotes given should not be considered as definite and are subject to an in-house dental examination or follow up consultation.</p>

        <h2>Dental Advice from the Convenience of Your Home</h2>
        <p>Our online dental consultations give you the chance to ask a dentist your questions, or raise your dental health concerns, without having to spend time booking and attending an appointment.</p>

        <h1>The Online Dental Consultation Process</h1>
        <p>Booking an online dental consultation is a simple process that doesn’t have to take more than a few minutes. Here’s what you need to do and what you can expect from the feedback.</p>


        <h3>Step One: Take Photos of Your teeth</h3>
        <p>With photos of your teeth and closeups of the area in question, our dentists can offer more accurate advice. We’ll need at least two pictures from you, but ideally three from the following angles:
          <ul>
            <li>Front, closeup view of your smile</li>
            <li>Side view of your smile</li>
            <li>Closeup of the area of concern</li>
          </ul>
          If you can send us clear pictures from these angles, it will help us offer you high-quality, personalised information.
        </p>

        <h3>Step Two: Complete the Online Form</h3>
        <p>You’ll find the online dental consultation form below — this gives you the chance to explain your issue or questions. The more detail you can provide, the easier it is for us to give you the best advice.</p>

        <h3>Step Three: Receive a Response from a Dentist</h3>
        <p>Once our dentists have reviewed your form and pictures, they’ll get back to you, either by phone or email to offer advice, answer your questions and suggest any necessary treatments.</p>

      </section>
      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">

          <button className="sticky-cta" onClick={handleBookConsultationClick}>Book an Appointment </button>


          <div className="contact-info">
            <p>📞 +1-800-HEALTH</p>
            <p>✉️ support@healthcareplus.com</p>
          </div>
          <div className="social-proof">
            <p>👨‍⚕️ 10,000+ Patients Helped</p>
            <p>✅ 99% Satisfaction Rate<br /></p>
            <p><b>Opening Hours</b><br />
              Mon-Sat:10 am- 5:00pm<br />
              Sun: CLOSED </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Front;