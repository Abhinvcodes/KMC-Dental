import React from "react";
import { useNavigate } from "react-router-dom";
import "./DoctorDashboard.css";

const doctorInfo = {
  name: "Dr. Sarah Johnson",
  specialization: "Cardiologist",
  experience: "12 years",
  contact: "sarah.johnson@hospital.org"
};

const appointments = [
  { 
    id: 1, 
    patientId: "pat123",
    patientName: "John Doe", 
    age: 45,
    gender: "Male",
    time: "10:00 AM", 
    condition: "Hypertension",
    lastVisit: "3 months ago",
    chatAvailable: true 
  },
  { 
    id: 2, 
    patientId: "pat456",
    patientName: "Jane Smith", 
    age: 32,
    gender: "Female",
    time: "12:00 PM", 
    condition: "Arrhythmia",
    lastVisit: "First visit",
    chatAvailable: false 
  },
  { 
    id: 3, 
    patientId: "pat789",
    patientName: "Michael Jack", 
    age: 58,
    gender: "Male",
    time: "2:30 PM", 
    condition: "Coronary Artery Disease",
    lastVisit: "1 month ago",
    chatAvailable: true 
  }
];

const DoctorDashboard = () => {
  const navigate = useNavigate();

  const handleStartChat = (patientId, patientName) => {
    // Navigate to chat window with patient ID and name as state
    navigate(`/chat/${patientId}`, { 
      state: { 
        patientName,
        doctorName: doctorInfo.name 
      } 
    });
  };

  return (
    <div className="doctor-dashboard">
      {/* Doctor Profile Section */}
      <div className="doctor-profile">
        <h2>Welcome, {doctorInfo.name}</h2>
        <div className="doctor-details">
          <p><strong>Specialization:</strong> {doctorInfo.specialization}</p>
          <p><strong>Experience:</strong> {doctorInfo.experience}</p>
          <p><strong>Contact:</strong> {doctorInfo.contact}</p>
        </div>
      </div>

      {/* Appointments Section */}
      <div className="appointments-section">
        <h3>Today's Appointments</h3>
        <div className="appointments-list">
          {appointments.map((appointment) => (
            <div key={appointment.id} className="appointment-card">
              <div className="patient-info">
                <h4>{appointment.patientName}</h4>
                <p><strong>Age:</strong> {appointment.age} | <strong>Gender:</strong> {appointment.gender}</p>
                <p><strong>Condition:</strong> {appointment.condition}</p>
                <p><strong>Last Visit:</strong> {appointment.lastVisit}</p>
              </div>
              <div className="appointment-time">
                <p><strong>Scheduled Time:</strong></p>
                <p>{appointment.time}</p>
              </div>
              <div className="appointment-actions">
                {appointment.chatAvailable ? (
                  <button 
                    className="chat-button"
                    onClick={() => handleStartChat(appointment.patientId, appointment.patientName)}
                  >
                    Start Chat
                  </button>
                ) : (
                  <p className="no-chat">Consultation not available yet</p>
                )}
                <button className="view-records">View Medical Records</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;