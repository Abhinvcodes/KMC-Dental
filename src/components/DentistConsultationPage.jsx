// src/pages/DentistConsultationPage.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./DentistConsultationPage.css";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

const DentistConsultationPage = () => {
  const navigate = useNavigate();
  const [dentists, setDentists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDentists = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");

        if (!token) {
          navigate("/login");
          return;
        }

        // Fetch dentists from backend
        const response = await axios.get(`${API_URL}/api/users/dentists`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        setDentists(response.data);
        setError(null);
      } catch (err) {
        console.error("Error fetching dentists:", err);
        setError("Failed to load dentists. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchDentists();
  }, [navigate]);

  const handleConsultClick = (dentist) => {
    // Pass the selected dentist data via state
    navigate("/PaymentScreen", { state: { dentist } });
  };

  const handleChatClick = (dentistId) => {
    // Check if user has active consultation with this dentist
    // This would typically involve another API call
    const token = localStorage.getItem("token");

    axios.get(`${API_URL}/api/consultations/check/${dentistId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        if (response.data.hasActiveConsultation) {
          // Navigate to chat if they have active consultation
          navigate("/chat", { state: { dentistId } });
        } else {
          alert("Please complete a consultation payment first.");
        }
      })
      .catch(error => {
        console.error("Error checking consultation status:", error);
        alert("Please complete a consultation payment first.");
      });
  };

  if (loading) return <div className="loading-container">Loading dentists...</div>;
  if (error) return <div className="error-container">{error}</div>;
  if (dentists.length === 0) return <div className="no-data-container">No dentists available at the moment.</div>;

  return (
    <div className="dentist-consultation-page">
      <div className="container">
        <div className="header">
          <h1>Meet Our Expert Dentists</h1>
          <p>Consult with our highly qualified dental professionals from the comfort of your home.</p>
        </div>

        <div className="grid">
          {dentists.map((dentist) => (
            <div className="dentist-card" key={dentist.id}>
              <h3>Dr. {dentist.name}</h3>
              <p><strong>{dentist.specialization || "General Dentist"}</strong></p>
              <p>{dentist.qualification || "BDS"}</p>
              <p>Experience: {dentist.experience || "N/A"}</p>
              <div className="card-buttons">
                <button
                  onClick={() => handleConsultClick(dentist)}
                  className="consult-button"
                >
                  Consult Now
                </button>
                <button
                  onClick={() => handleChatClick(dentist.id)}
                  className="chat-button"
                >
                  Chat
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DentistConsultationPage;
