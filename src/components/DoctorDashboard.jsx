import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./DoctorDashboard.css";
import { dentistAPI, appointmentAPI } from '../services/api';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5173';

const DoctorDashboard = () => {
  const navigate = useNavigate();
  const [doctorInfo, setDoctorInfo] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDentistData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");

        if (!token) {
          navigate("/login");
          return;
        }

        // Get doctor profile information
        const doctorResponse = await axios.get(`${API_URL}/api/users/profile`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setDoctorInfo(doctorResponse.data);

        // Get appointments for this dentist
        const appointmentsResponse = await appointmentAPI.getDentistAppointments();
        console.log('Appointments data:', appointmentsResponse);
        // Make sure we always set an array
        setAppointments(Array.isArray(appointmentsResponse) ? appointmentsResponse : []);

        // Get patients for this dentist
        const patientsResponse = await dentistAPI.getDentistPatients();
        setPatients(patientsResponse);

        setError(null);
      } catch (err) {
        console.error("Error fetching dentist data:", err);
        setError("Failed to load dentist dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchDentistData();
  }, [navigate]);

  const handleStartChat = (patientId, patientName) => {
    navigate(`/chat/${patientId}`, {
      state: {
        patientName,
        doctorName: doctorInfo?.name || "Doctor"
      }
    });
  };

  const viewPatientHistory = (patientId) => {
    navigate(`/patient-history/${patientId}`);
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
        {Array.isArray(appointments) && appointments.length > 0 ? (
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
        ) : (
          <p className="no-appointments">You have no appointments scheduled.</p>
        )}
      </div>

      {/* Patients Section */}
      <div className="patients-section">
        <h2>My Patients</h2>
        {loading ? (
          <p>Loading patients...</p>
        ) : error ? (
          <p className="error">{error}</p>
        ) : patients.length === 0 ? (
          <p>You have no patients assigned yet.</p>
        ) : (
          <div className="patients-list">
            {patients.map(patient => (
              <div key={patient.id} className="patient-card">
                <h3>{patient.name}</h3>
                <p><strong>Email:</strong> {patient.email}</p>
                <p><strong>Phone:</strong> {patient.phoneNumber}</p>
                <p><strong>Gender:</strong> {patient.gender}</p>
                <button onClick={() => viewPatientHistory(patient.id)}>
                  View History
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorDashboard;