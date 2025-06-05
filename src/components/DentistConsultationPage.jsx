// src/pages/DentistConsultationPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./DentistConsultationPage.css";

const DentistConsultationPage = () => {
  const navigate = useNavigate();

  const [dentists] = useState([
    {
      id: 1,
      name: "Dr. John Doe",
      designation: "Senior Dentist",
      qualifications: "BDS, MDS",
      yearsOfExperience: 10,
    },
    {
      id: 2,
      name: "Dr. Jane Smith",
      designation: "Orthodontist",
      qualifications: "BDS, MDS, PhD",
      yearsOfExperience: 15,
    },
    {
      id: 3,
      name: "Dr. Michael Johnson",
      designation: "Periodontist",
      qualifications: "BDS, MDS",
      yearsOfExperience: 12,
    },
    {
      id: 4,
      name: "Dr. Sarah Williams",
      designation: "Endodontist",
      qualifications: "BDS, MDS, Cert. Endo",
      yearsOfExperience: 8,
    },
    {
      id: 5,
      name: "Dr. Robert Brown",
      designation: "Oral Surgeon",
      qualifications: "BDS, MDS, FDSRCS",
      yearsOfExperience: 18,
    },
  ]);

  const handleConsultClick = (dentist) => {
    // Pass the selected dentist data via state or params
    navigate("/PaymentScreen", { state: { dentist } });
  };

  const handleChatClick = (dentistId) => {
    alert("Please complete the consultation payment first.");
  };

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
              <h3>{dentist.name}</h3>
              <p><strong>{dentist.designation}</strong></p>
              <p>{dentist.qualifications}</p>
              <p>Experience: {dentist.yearsOfExperience} years</p>
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
