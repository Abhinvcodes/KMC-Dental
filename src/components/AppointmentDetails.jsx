import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AppointmentDetails.css";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const getStatusClass = (status) => {
  switch (status.toLowerCase()) {
    case "confirmed":
    case "scheduled":
      return "status-confirmed";
    case "pending":
      return "status-pending";
    case "cancelled":
      return "status-cancelled";
    default:
      return "";
  }
};

const AppointmentDetails = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        setLoading(true);

        // Get token from localStorage
        const token = localStorage.getItem("token");

        // Make authenticated request to appointments endpoint
        const response = await axios.get(`${API_URL}/api/appointments`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setAppointments(response.data);
        setError(null);
      } catch (err) {
        console.error("Error fetching appointments:", err);
        setError("Failed to load appointments. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  if (loading) return <div className="loading">Loading appointments...</div>;
  if (error) return <div className="error-message">{error}</div>;
  if (appointments.length === 0) return <div className="no-appointments">No appointments found.</div>;

  return (
    <div className="appointments-list-container">
      <h2 className="appointments-list-header">My Appointments</h2>
      {appointments.map((appt) => (
        <div key={appt.id} className="appointment-details-container">
          <h3 className="appointment-id">Appointment #{appt.id}</h3>
          <div className="details-row">
            <div className="details-label">Doctor:</div>
            <div className="details-value">{appt.Dentist?.name || "Unassigned"}</div>
          </div>

          <div className="details-row">
            <div className="details-label">Date:</div>
            <div className="details-value">
              {new Date(appt.appointmentDate).toLocaleDateString()}
            </div>
          </div>

          <div className="details-row">
            <div className="details-label">Time:</div>
            <div className="details-value">
              {new Date(appt.appointmentDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
          </div>

          <div className="details-row">
            <div className="details-label">Reason:</div>
            <div className="details-value">{appt.reason}</div>
          </div>

          <div className="details-row">
            <div className="details-label">Status:</div>
            <div className="details-value">
              <span className={`status ${getStatusClass(appt.status)}`}>
                {appt.status.charAt(0).toUpperCase() + appt.status.slice(1)}
              </span>
            </div>
          </div>

          <div className="button-container">
            {/* Add reschedule button logic here if needed */}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AppointmentDetails;
