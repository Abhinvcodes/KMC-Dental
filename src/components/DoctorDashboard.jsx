import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./DoctorDashboard.css";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

const DoctorDashboard = () => {
  const navigate = useNavigate();
  const [doctorInfo, setDoctorInfo] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDoctorData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");

        if (!token) {
          navigate("/login");
          return;
        }

        // Fetch doctor profile
        const profileResponse = await axios.get(`${API_URL}/api/users/profile`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        setDoctorInfo(profileResponse.data);

        // Fetch doctor's appointments
        const appointmentsResponse = await axios.get(`${API_URL}/api/appointments/dentist`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        setAppointments(appointmentsResponse.data);
        setError(null);
      } catch (err) {
        console.error("Error fetching doctor data:", err);
        setError("Failed to load dashboard data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchDoctorData();
  }, [navigate]);

  const handleStartChat = (patientId, patientName) => {
    navigate(`/chat/${patientId}`, {
      state: {
        patientName,
        doctorName: doctorInfo?.name || "Doctor"
      }
    });
  };

  if (loading) return <div className="loading-spinner">Loading dashboard...</div>;
  if (error) return <div className="error-message">{error}</div>;
  if (!doctorInfo) return <div className="error-message">Unable to load doctor information</div>;

  return (
    <div className="doctor-dashboard">
      {/* Doctor Profile Section */}
      <div className="doctor-profile">
        <h2>Welcome, Dr. {doctorInfo.name}</h2>
        <div className="doctor-details">
          <p><strong>Specialization:</strong> {doctorInfo.specialization || "General Dentistry"}</p>
          <p><strong>Email:</strong> {doctorInfo.email}</p>
          <p><strong>Phone:</strong> {doctorInfo.phoneNumber}</p>
        </div>
        <button className="logout-btn" onClick={() => {
          localStorage.removeItem("token");
          navigate("/login");
        }}>Logout</button>
      </div>

      {/* Appointments Section */}
      <div className="appointments-section">
        <h3>Your Appointments</h3>
        {appointments.length === 0 ? (
          <p className="no-appointments">You have no appointments scheduled.</p>
        ) : (
          <div className="appointments-list">
            {appointments.map((appointment) => (
              <div key={appointment.id} className="appointment-card">
                <div className="patient-info">
                  <h4>{appointment.User?.name || "Patient"}</h4>
                  <p><strong>Email:</strong> {appointment.User?.email || "N/A"}</p>
                  <p><strong>Phone:</strong> {appointment.User?.phoneNumber || "N/A"}</p>
                  <p><strong>Reason:</strong> {appointment.reason}</p>
                </div>
                <div className="appointment-time">
                  <p><strong>Scheduled:</strong></p>
                  <p>{new Date(appointment.appointmentDate).toLocaleDateString()} at {new Date(appointment.appointmentDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                  <p><strong>Status:</strong> <span className={`status-${appointment.status.toLowerCase()}`}>{appointment.status}</span></p>
                </div>
                <div className="appointment-actions">
                  <button
                    className="chat-button"
                    onClick={() => handleStartChat(appointment.userId, appointment.User?.name || "Patient")}
                  >
                    Chat with Patient
                  </button>
                  <button
                    className="update-status"
                    onClick={async () => {
                      try {
                        const token = localStorage.getItem("token");
                        await axios.put(`${API_URL}/api/appointments/${appointment.id}`,
                          { status: "completed" },
                          { headers: { Authorization: `Bearer ${token}` } }
                        );
                        // Refresh appointments after update
                        const response = await axios.get(`${API_URL}/api/appointments/dentist`, {
                          headers: { Authorization: `Bearer ${token}` }
                        });
                        setAppointments(response.data);
                      } catch (err) {
                        console.error("Error updating appointment:", err);
                        alert("Failed to update appointment status");
                      }
                    }}
                  >
                    Mark as Completed
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorDashboard;